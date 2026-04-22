"""
ROBÔ SIPII CAIXA — v5 (Edição GitHub Repository)
Estratégia: Coleta multi-perfil, consolidação inteligente e salvamento em diretório fixo.
"""

from pathlib import Path
from datetime import datetime
import time
import unicodedata
import traceback
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import TimeoutException, NoSuchElementException

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
    {"csv": "RENDA FIXA SIMPLES",          "texto_tela": "RENDA FIXA SIMPLES"},
    {"csv": "RENDA FIXA",                  "texto_tela": "RENDA FIXA"},
    {"csv": "RENDA FIXA REFERENCIADO",     "texto_tela": "RENDA FIXA REFERENCIADO"},
    {"csv": "RENDA FIXA CURTO PRAZO",      "texto_tela": "RENDA FIXA CURTO PRAZO"},
    {"csv": "MULTIMERCADO",                "texto_tela": "MULTIMERCADO"},
    {"csv": "CAMBIAL",                     "texto_tela": "CAMBIAL"},
    {"csv": "ACOES",                       "texto_tela": "AÇÕES"},
    {"csv": "FUNDO DE INDICE",             "texto_tela": "FUNDO DE ÍNDICE"},
    {"csv": "FUNDOS MUTUOS DE PRIVATIZACAO","texto_tela": "FUNDOS MÚTUOS DE PRIVATIZAÇÃO"},
]

# ---------------------------------------------------------------------------
# Infraestrutura e Utilidades
# ---------------------------------------------------------------------------

def normalizar(txt: str) -> str:
    txt = txt or ""
    txt = unicodedata.normalize("NFKD", txt)
    txt = "".join(c for c in txt if not unicodedata.combining(c))
    return " ".join(txt.upper().split())

# Mapa criado APÓS a função ser definida para evitar NameError
TEXTO_PARA_CSV = {normalizar(c["texto_tela"]): c["csv"] for c in CATEGORIAS_FIXAS}

# No GitHub, salvamos na raiz do repositório para facilitar o 'git commit'
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
    opt.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/123.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(options=opt)
    return driver

def esperar_ajax(driver, timeout=20):
    try:
        WebDriverWait(driver, timeout).until(
            lambda d: d.execute_script("return (window.jQuery ? jQuery.active === 0 : true);")
        )
    except:
        time.sleep(2)

# ---------------------------------------------------------------------------
# Lógica de Navegação e Extração
# ---------------------------------------------------------------------------

def clicar_elemento(driver, elemento):
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", elemento)
    time.sleep(0.5)
    try:
        elemento.click()
    except:
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
                "elemento": aba
            })
    return categorias

def localizar_tabela_ativa(driver):
    paineis = driver.find_elements(By.CSS_SELECTOR, "div.ui-tabs-panel")
    for p in paineis:
        if p.is_displayed():
            return p.find_element(By.CSS_SELECTOR, "table")
    raise Exception("Tabela não encontrada")

def extrair_dados_tabela(driver, nome_csv, sigla):
    tabela = localizar_tabela_ativa(driver)
    linhas = tabela.find_elements(By.CSS_SELECTOR, "tbody tr")
    dados = []
    for tr in linhas:
        tds = tr.find_elements(By.XPATH, "./td")
        if len(tds) >= 10:
            nome_fundo = tds[0].text.strip()
            if nome_fundo:
                dados.append({
                    "Categoria": nome_csv,
                    "Fundo": nome_fundo,
                    "Fundo_norm": normalizar(nome_fundo),
                    "Data Inicio": tds[1].text.strip(),
                    "Cota (R$)": tds[3].text.strip(),
                    "PL (milhoes R$)": tds[8].text.strip(),
                    "Perfil": sigla
                })
    return dados

# ---------------------------------------------------------------------------
# Execução e Consolidação
# ---------------------------------------------------------------------------

def processar_perfil(perfil, headless=True):
    sigla = perfil["sigla"]
    segmento = perfil["segmento"]
    driver = None
    dados_acumulados = []

    try:
        driver = configurar_driver(headless=headless)
        abrir_site_e_preparar(driver, sigla, segmento)
        categorias = descobrir_categorias(driver)

        for cat in categorias:
            try:
                clicar_por_texto(driver, cat["texto_tela"])
                esperar_ajax(driver)
                time.sleep(1.5)
                res = extrair_dados_tabela(driver, cat["csv"], sigla)
                dados_acumulados.extend(res)
                log(f"  [{sigla}] {cat['csv']}: {len(res)} fundos.")
            except Exception as e:
                log(f"  [{sigla}] Erro na aba {cat['csv']}")
    finally:
        if driver: driver.quit()
    return dados_acumulados

def consolidar(todos_dados):
    if not todos_dados: return pd.DataFrame()
    df = pd.DataFrame(todos_dados)
    
    # Lógica de Deduplicação
    consolidado = []
    for (fundo_norm, categoria), grupo in df.groupby(["Fundo_norm", "Categoria"], sort=False):
        perfis = " | ".join(sorted(grupo["Perfil"].unique()))
        registro = grupo.iloc[0].to_dict()
        registro["Perfis"] = perfis
        consolidado.append(registro)
    
    return pd.DataFrame(consolidado)

def executar():
    log("INICIANDO ROBÔ SIPII v5 - GITHUB EDITION")
    todos_os_registros = []
    
    for p in PERFIS:
        registros = processar_perfil(p, headless=True)
        todos_os_registros.extend(registros)
    
    df_final = consolidar(todos_os_registros)
    
    if not df_final.empty:
        # Salva com nome fixo para o GitHub sempre atualizar o mesmo arquivo
        caminho_csv = BASE_DIR / "dados_atuais.csv"
        df_final.to_csv(caminho_csv, index=False, encoding="utf-8-sig")
        
        # Opcional: Salvar também com a data para histórico
        data_str = datetime.now().strftime("%Y%m%d")
        df_final.to_csv(BASE_DIR / f"sipii_caixa_{data_str}.csv", index=False, encoding="utf-8-sig")
        
        log(f"SUCESSO: {len(df_final)} fundos consolidados salvos.")

if __name__ == "__main__":
    executar()
