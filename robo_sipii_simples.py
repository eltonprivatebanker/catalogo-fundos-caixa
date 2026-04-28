"""
ROBÔ SIPII CAIXA — v6 (Edição GitHub Repository)
Novidades v6:
  - Coleta das colunas de rentabilidade: Variação Dia, Acum. Mês, Acum. Ano, Acum. 12M
  - Exportação automática para Excel (.xlsx) com formatação
  - Recuperação automática de sessão Chrome travada (InvalidSessionIdException)
  - Modo DEBUG: imprime todos os textos da linha para confirmar índices das colunas
"""

from pathlib import Path
from datetime import datetime
import time
import unicodedata
import traceback
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    TimeoutException,
    NoSuchElementException,
    InvalidSessionIdException,
    WebDriverException,
)

# ---------------------------------------------------------------------------
# Configurações Globais
# ---------------------------------------------------------------------------

URL = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

PERFIS = [
    {"segmento": "PESSOA FÍSICA",   "sigla": "PF"},
    {"segmento": "PESSOA JURÍDICA", "sigla": "PJ"},
    {"segmento": "GOVERNO",         "sigla": "GOV"},
    {"segmento": "RPPS",            "sigla": "RPPS"},
    {"segmento": "TODOS",           "sigla": "TODOS"},
]

CATEGORIAS_FIXAS = [
    {"csv": "RENDA FIXA SIMPLES",           "texto_tela": "RENDA FIXA SIMPLES"},
    {"csv": "RENDA FIXA",                   "texto_tela": "RENDA FIXA"},
    {"csv": "RENDA FIXA REFERENCIADO",      "texto_tela": "RENDA FIXA REFERENCIADO"},
    {"csv": "RENDA FIXA CURTO PRAZO",       "texto_tela": "RENDA FIXA CURTO PRAZO"},
    {"csv": "MULTIMERCADO",                 "texto_tela": "MULTIMERCADO"},
    {"csv": "CAMBIAL",                      "texto_tela": "CAMBIAL"},
    {"csv": "ACOES",                        "texto_tela": "AÇÕES"},
    {"csv": "FUNDO DE INDICE",              "texto_tela": "FUNDO DE ÍNDICE"},
    {"csv": "FUNDOS MUTUOS DE PRIVATIZACAO","texto_tela": "FUNDOS MÚTUOS DE PRIVATIZAÇÃO"},
]

# ---------------------------------------------------------------------------
# Modo DEBUG — ative para verificar os índices das colunas da tabela SIPII.
# Quando True, o robô imprime os textos de todas as colunas da 1ª linha
# e para sem salvar arquivos. Use para validar antes de rodar completo.
# ---------------------------------------------------------------------------
DEBUG_COLUNAS = False

# ---------------------------------------------------------------------------
# Infraestrutura e Utilidades
# ---------------------------------------------------------------------------

def normalizar(txt: str) -> str:
    txt = txt or ""
    txt = unicodedata.normalize("NFKD", txt)
    txt = "".join(c for c in txt if not unicodedata.combining(c))
    return " ".join(txt.upper().split())

TEXTO_PARA_CSV = {normalizar(c["texto_tela"]): c["csv"] for c in CATEGORIAS_FIXAS}

BASE_DIR = Path.cwd()
LOG_PATH = BASE_DIR / "execucao.log"

def log(msg: str):
    linha = f"[{datetime.now().strftime('%H:%M:%S')}] {msg}"
    print(linha)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(linha + "\n")

def configurar_driver(headless=True):
    opt = webdriver.ChromeOptions()
    if headless:
        opt.add_argument("--headless=new")
    opt.add_argument("--start-maximized")
    opt.add_argument("--window-size=1600,1200")
    opt.add_argument("--no-sandbox")
    opt.add_argument("--disable-dev-shm-usage")
    opt.add_argument("--disable-gpu")
    opt.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "Chrome/123.0.0.0 Safari/537.36"
    )
    return webdriver.Chrome(options=opt)

def esperar_ajax(driver, timeout=20):
    try:
        WebDriverWait(driver, timeout).until(
            lambda d: d.execute_script(
                "return (window.jQuery ? jQuery.active === 0 : true);"
            )
        )
    except Exception:
        time.sleep(2)

def encerrar_driver(driver):
    """Encerra o driver ignorando qualquer erro."""
    try:
        if driver:
            driver.quit()
    except Exception:
        pass

# ---------------------------------------------------------------------------
# Lógica de Navegação
# ---------------------------------------------------------------------------

def clicar_elemento(driver, elemento):
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", elemento)
    time.sleep(0.5)
    try:
        elemento.click()
    except Exception:
        driver.execute_script("arguments[0].click();", elemento)

def clicar_por_texto(driver, texto_alvo):
    alvo = normalizar(texto_alvo)
    for a in driver.find_elements(By.TAG_NAME, "a"):
        if a.is_displayed() and normalizar(a.text.strip()) == alvo:
            clicar_elemento(driver, a)
            return
    raise NoSuchElementException(f"Link não encontrado: {texto_alvo}")

def abrir_site_e_preparar(driver, sigla, segmento):
    log(f"[{sigla}] Abrindo site...")
    driver.get(URL)
    time.sleep(3)
    clicar_por_texto(driver, segmento)
    esperar_ajax(driver)
    wait = WebDriverWait(driver, 20)
    consultar = wait.until(EC.presence_of_element_located((By.ID, "btn-consultar")))
    clicar_elemento(driver, consultar)
    esperar_ajax(driver)
    time.sleep(3)

def descobrir_categorias(driver):
    categorias = []
    abas = driver.find_elements(By.CSS_SELECTOR, "ul.ui-tabs-nav li a")
    for aba in abas:
        texto = aba.text.strip()
        if texto:
            norm = normalizar(texto)
            categorias.append({
                "texto_tela": texto,
                "csv": TEXTO_PARA_CSV.get(norm) or norm.replace(" ", "_")[:31],
            })
    return categorias

def localizar_tabela_ativa(driver):
    paineis = driver.find_elements(By.CSS_SELECTOR, "div.ui-tabs-panel")
    for p in paineis:
        if p.is_displayed():
            return p.find_element(By.CSS_SELECTOR, "table")
    raise Exception("Tabela ativa não encontrada")

# ---------------------------------------------------------------------------
# Extração de dados — índices das colunas SIPII:
#   [0] Nome do fundo
#   [1] Data início
#   [2] (ignorado)
#   [3] Cota (R$)
#   [4] Variação Dia (%)
#   [5] Acum. Mês (%)
#   [6] Acum. Ano (%)
#   [7] Acum. 12M (%)
#   [8] PL (milhões R$)
#   [9] PL Médio (milhões R$)
# ---------------------------------------------------------------------------

def extrair_dados_tabela(driver, nome_csv, sigla):
    tabela = localizar_tabela_ativa(driver)
    linhas = tabela.find_elements(By.CSS_SELECTOR, "tbody tr")
    dados  = []

    for i, tr in enumerate(linhas):
        tds = tr.find_elements(By.XPATH, "./td")

        # ── MODO DEBUG ────────────────────────────────────────────────────
        if DEBUG_COLUNAS and i == 0:
            print("\n" + "=" * 60)
            print(f"DEBUG — Colunas da tabela [{nome_csv}]:")
            for idx, td in enumerate(tds):
                print(f"  [{idx}] → '{td.text.strip()}'")
            print("=" * 60 + "\n")
            return []   # não coleta dados em modo debug
        # ─────────────────────────────────────────────────────────────────

        if len(tds) >= 10:
            nome_fundo = tds[0].text.strip()
            if nome_fundo:
                dados.append({
                    "Categoria":        nome_csv,
                    "Fundo":            nome_fundo,
                    "Fundo_norm":       normalizar(nome_fundo),
                    "Data Inicio":      tds[1].text.strip(),
                    "Cota (R$)":        tds[3].text.strip(),
                    "Variacao Dia (%)": tds[4].text.strip(),
                    "Acum. Mes (%)":    tds[5].text.strip(),
                    "Acum. Ano (%)":    tds[6].text.strip(),
                    "Acum. 12M (%)":    tds[7].text.strip(),
                    "PL (milhoes R$)":  tds[8].text.strip(),
                    "Perfil":           sigla,
                })
    return dados

# ---------------------------------------------------------------------------
# Processamento por perfil — com recuperação automática de sessão travada
# ---------------------------------------------------------------------------

def coletar_aba(driver, sigla, segmento, cat, dados_acumulados):
    """Tenta coletar uma aba. Retorna o driver (pode ser novo se houve crash)."""
    try:
        clicar_por_texto(driver, cat["texto_tela"])
        esperar_ajax(driver)
        time.sleep(1.5)
        res = extrair_dados_tabela(driver, cat["csv"], sigla)
        dados_acumulados.extend(res)
        log(f"  [{sigla}] {cat['csv']}: {len(res)} fundos.")

    except (InvalidSessionIdException, WebDriverException) as e:
        # Sessão Chrome morreu — reinicia e retoma esta aba
        log(f"  [{sigla}] Sessão perdida em '{cat['csv']}'. Reiniciando driver...")
        encerrar_driver(driver)
        driver = configurar_driver(headless=True)
        try:
            abrir_site_e_preparar(driver, sigla, segmento)
            clicar_por_texto(driver, cat["texto_tela"])
            esperar_ajax(driver)
            time.sleep(1.5)
            res = extrair_dados_tabela(driver, cat["csv"], sigla)
            dados_acumulados.extend(res)
            log(f"  [{sigla}] {cat['csv']} (recuperado): {len(res)} fundos.")
        except Exception as e2:
            log(f"  [{sigla}] Falha ao recuperar '{cat['csv']}': {e2}")

    except Exception as e:
        log(f"  [{sigla}] Erro na aba '{cat['csv']}': {e}")

    return driver

def processar_perfil(perfil, headless=True):
    sigla    = perfil["sigla"]
    segmento = perfil["segmento"]
    driver   = None
    dados_acumulados = []

    try:
        driver = configurar_driver(headless=headless)
        abrir_site_e_preparar(driver, sigla, segmento)
        categorias = descobrir_categorias(driver)

        for cat in categorias:
            driver = coletar_aba(driver, sigla, segmento, cat, dados_acumulados)

    except Exception as e:
        log(f"[{sigla}] Erro geral: {e}")
        traceback.print_exc()
    finally:
        encerrar_driver(driver)

    return dados_acumulados

# ---------------------------------------------------------------------------
# Consolidação — deduplicação inteligente por fundo + categoria
# ---------------------------------------------------------------------------

def consolidar(todos_dados):
    if not todos_dados:
        return pd.DataFrame()
    df = pd.DataFrame(todos_dados)

    consolidado = []
    for (fundo_norm, categoria), grupo in df.groupby(
        ["Fundo_norm", "Categoria"], sort=False
    ):
        perfis   = " | ".join(sorted(grupo["Perfil"].unique()))
        registro = grupo.iloc[0].to_dict()
        registro["Perfis"] = perfis
        consolidado.append(registro)

    return pd.DataFrame(consolidado)

# ---------------------------------------------------------------------------
# Exportação Excel com formatação
# ---------------------------------------------------------------------------

def salvar_excel(df: pd.DataFrame, caminho: Path):
    try:
        import openpyxl
        from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
        from openpyxl.utils import get_column_letter

        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Fundos CAIXA"

        # ── Cabeçalho ────────────────────────────────────────────────────
        header_fill   = PatternFill("solid", fgColor="0A1628")
        header_font   = Font(bold=True, color="C9A84C", size=10)
        header_align  = Alignment(horizontal="center", vertical="center", wrap_text=True)
        header_border = Border(bottom=Side(style="medium", color="C9A84C"))

        cols = [c for c in df.columns if c != "Fundo_norm"]
        ws.append(cols)
        for col_idx, col_name in enumerate(cols, 1):
            cell            = ws.cell(row=1, column=col_idx)
            cell.fill       = header_fill
            cell.font       = header_font
            cell.alignment  = header_align
            cell.border     = header_border

        # ── Dados ─────────────────────────────────────────────────────────
        green_font  = Font(color="2EC27E", size=9)
        red_font    = Font(color="E05555", size=9)
        normal_font = Font(size=9)
        alt_fill    = PatternFill("solid", fgColor="0F2040")
        main_fill   = PatternFill("solid", fgColor="0A1628")

        pct_cols = {"Variacao Dia (%)", "Acum. Mes (%)", "Acum. Ano (%)", "Acum. 12M (%)"}

        for row_idx, row in enumerate(df[cols].itertuples(index=False), 2):
            fill = alt_fill if row_idx % 2 == 0 else main_fill
            for col_idx, (col_name, val) in enumerate(zip(cols, row), 1):
                val_str = str(val) if val is not None else ""
                cell = ws.cell(row=row_idx, column=col_idx, value=val_str)
                cell.fill      = fill
                cell.alignment = Alignment(vertical="center")

                if col_name in pct_cols and val_str not in ("-", "—", ""):
                    try:
                        n = float(
                            val_str.replace("%", "")
                                   .replace(" ", "")
                                   .replace(".", "")
                                   .replace(",", ".")
                        )
                        cell.font = green_font if n > 0 else (
                            red_font if n < 0 else normal_font
                        )
                    except Exception:
                        cell.font = normal_font
                else:
                    cell.font = normal_font

        # ── Larguras ──────────────────────────────────────────────────────
        col_widths = {
            "Categoria": 22, "Fundo": 55, "Data Inicio": 13,
            "Cota (R$)": 16,
            "Variacao Dia (%)": 14, "Acum. Mes (%)": 13,
            "Acum. Ano (%)": 13,    "Acum. 12M (%)": 13,
            "PL (milhoes R$)": 18,  "Perfil": 8, "Perfis": 30,
        }
        for col_idx, col_name in enumerate(cols, 1):
            ws.column_dimensions[get_column_letter(col_idx)].width = (
                col_widths.get(col_name, 15)
            )

        ws.row_dimensions[1].height = 30
        ws.freeze_panes = "A2"

        wb.save(caminho)
        log(f"Excel salvo: {caminho}")

    except ImportError:
        log("AVISO: openpyxl não instalado. Execute: pip install openpyxl")
    except Exception as e:
        log(f"Erro ao salvar Excel: {e}")
        traceback.print_exc()

# ---------------------------------------------------------------------------
# Ponto de entrada
# ---------------------------------------------------------------------------

def executar():
    log("INICIANDO ROBÔ SIPII v6 - GITHUB EDITION")

    # ── Modo DEBUG ────────────────────────────────────────────────────────
    if DEBUG_COLUNAS:
        log(">>> MODO DEBUG ATIVO — verificando índices das colunas <<<")
        driver = configurar_driver(headless=False)
        try:
            abrir_site_e_preparar(driver, "PF", "PESSOA FÍSICA")
            cats = descobrir_categorias(driver)
            if cats:
                clicar_por_texto(driver, cats[0]["texto_tela"])
                esperar_ajax(driver)
                time.sleep(1.5)
                extrair_dados_tabela(driver, cats[0]["csv"], "PF")
        finally:
            encerrar_driver(driver)
        log("DEBUG concluído. Ajuste os índices se necessário e defina DEBUG_COLUNAS=False.")
        return
    # ─────────────────────────────────────────────────────────────────────

    todos_os_registros = []
    for p in PERFIS:
        registros = processar_perfil(p, headless=True)
        todos_os_registros.extend(registros)

    df_final = consolidar(todos_os_registros)

    if not df_final.empty:
        data_str = datetime.now().strftime("%Y%m%d")

        # CSV fixo — lido pelo GitHub Pages
        caminho_csv = BASE_DIR / "dados_atuais.csv"
        df_final.to_csv(caminho_csv, index=False, encoding="utf-8-sig")
        log(f"CSV salvo: {caminho_csv}")

        # CSV com data — histórico
        df_final.to_csv(
            BASE_DIR / f"sipii_caixa_{data_str}.csv",
            index=False, encoding="utf-8-sig"
        )

        # Excel com data
        salvar_excel(df_final, BASE_DIR / f"sipii_caixa_{data_str}.xlsx")

        log(f"SUCESSO: {len(df_final)} fundos consolidados salvos.")
    else:
        log("ATENÇÃO: Nenhum dado coletado. Verifique conexão e o site SIPII.")


if __name__ == "__main__":
    executar()
