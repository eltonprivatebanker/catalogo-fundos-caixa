"""
============================================================
ROBÔ SIPII — VERSÃO CORRIGIDA PARA GITHUB PAGES
============================================================
Coleta dados da tabela SEM abrir popups (evita perda de
referência DOM que corrompía os dados numéricos).
As URLs são extraídas do atributo onclick/href ou deixadas
em branco para o gerarSlug() do index.html construir.
============================================================
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import pandas as pd
import time
from datetime import datetime
import unicodedata

URL = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

CATEGORIAS = [
    "RENDA FIXA SIMPLES", "RENDA FIXA", "RENDA FIXA REFERENCIADO",
    "RENDA FIXA CURTO PRAZO", "MULTIMERCADO", "CAMBIAL",
    "ACOES", "FUNDO DE INDICE", "FUNDOS MUTUOS DE PRIVATIZACAO",
]

COLUNAS_DADOS = [
    "Fundo", "Data Inicio", "Aplic. Inicial (R$)",
    "Cota (R$)", "Variacao Dia (%)", "Acum. Mes (%)",
    "Acum. Ano (%)", "Acum. 12M (%)",
    "PL (milhoes R$)", "PL Medio (milhoes R$)"
]

def configurar_driver(headless=True):
    opt = webdriver.ChromeOptions()
    if headless:
        opt.add_argument("--headless=new")
    opt.add_argument("--no-sandbox")
    opt.add_argument("--disable-dev-shm-usage")
    opt.add_argument("--window-size=1400,1080")
    opt.add_argument("--disable-gpu")
    return webdriver.Chrome(options=opt)

def extrair_url_sem_popup(link_el):
    """
    Tenta extrair a URL real do atributo href ou onclick
    SEM clicar no link (evita abrir o popup e corromper o DOM).
    Retorna string vazia se não encontrar — o gerarSlug() do
    index.html vai construir a URL automaticamente.
    """
    try:
        href = link_el.get_attribute("href") or ""
        if href.startswith("http") and "caixa.gov.br" in href:
            return href
    except Exception:
        pass

    try:
        onclick = link_el.get_attribute("onclick") or ""
        # Padrão comum: window.open('https://...', ...)
        import re
        match = re.search(r"https?://[^\s'\"]+caixa\.gov\.br[^\s'\"]+", onclick)
        if match:
            return match.group(0)
    except Exception:
        pass

    return ""

def extrair():
    driver = configurar_driver(headless=True)
    wait = WebDriverWait(driver, 10)
    todos_resultados = []

    print(f"🚀 Iniciando extração em {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    for cat in CATEGORIAS:
        print(f"📂 Categoria: {cat}")
        try:
            driver.get(URL)

            # 1. Clica na aba TODOS
            aba_todos = wait.until(EC.element_to_be_clickable(
                (By.XPATH, "//a[contains(text(),'TODOS')]")))
            aba_todos.click()
            time.sleep(1.5)

            # 2. Clica na categoria específica
            link_cat = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, cat)))
            link_cat.click()

            # 3. Aguarda a tabela carregar
            wait.until(EC.presence_of_element_located(
                (By.CSS_SELECTOR, "table.zebra tbody tr")))
            time.sleep(1)

            # 4. Coleta TODOS os dados da tabela DE UMA VEZ, sem clicar em nada
            #    Isso é fundamental: qualquer clique durante a iteração
            #    invalida as referências WebElement e corrompe os dados.
            linhas = driver.find_elements(By.CSS_SELECTOR, "table.zebra tbody tr")

            dados_brutos = []
            for tr in linhas:
                try:
                    link_fundo = tr.find_element(By.CSS_SELECTOR, "td:first-child a")
                    nome_fundo = link_fundo.text.strip().replace("\n", " ")
                except NoSuchElementException:
                    continue

                if not nome_fundo:
                    continue

                # Coleta células e URL SEM abrir popup
                celulas = [td.text.strip()
                           for td in tr.find_elements(By.TAG_NAME, "td")]
                url_real = extrair_url_sem_popup(link_fundo)

                dados_brutos.append((celulas, url_real))

            # 5. Monta os registros após sair do loop de DOM
            fundos_na_cat = 0
            for celulas, url_real in dados_brutos:
                registro = {"Categoria": cat}
                for i, col in enumerate(COLUNAS_DADOS):
                    registro[col] = celulas[i] if i < len(celulas) else ""
                registro["URL"] = url_real
                todos_resultados.append(registro)
                fundos_na_cat += 1

            print(f"   ✅ {fundos_na_cat} fundos extraídos.")

        except Exception as e:
            print(f"   ❌ Erro na categoria {cat}: {str(e)[:80]}")

    driver.quit()
    return todos_resultados

def salvar_dados(dados):
    if not dados:
        print("FALHA: Nenhum dado para salvar.")
        return

    df = pd.DataFrame(dados)

    # Remove linhas que claramente vieram de popup (ex: "Página do fundo:")
    # Segurança extra caso algum popup vaze
    lixo = df["Fundo"].str.contains(
        r"^(Página do fundo|Calcular|consulte aqui)$",
        case=False, na=False, regex=True
    )
    removidos = lixo.sum()
    if removidos:
        print(f"⚠️  {removidos} linhas de lixo removidas.")
    df = df[~lixo].reset_index(drop=True)

    ts = datetime.now().strftime("%Y%m%d")

    # Salva CSV principal para o site
    df.to_csv("dados_atuais.csv", index=False, encoding="utf-8-sig")

    # Salva histórico CSV e Excel
    csv_hist  = f"sipii_caixa_{ts}.csv"
    xlsx_hist = f"sipii_caixa_{ts}.xlsx"

    df.to_csv(csv_hist, index=False, encoding="utf-8-sig")

    with pd.ExcelWriter(xlsx_hist, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Todos", index=False)
        for categoria in df["Categoria"].unique():
            df[df["Categoria"] == categoria].to_excel(
                writer, sheet_name=categoria[:31], index=False)

    print("\n" + "=" * 40)
    print("✅ DADOS ATUALIZADOS COM SUCESSO!")
    print(f"   Total: {len(df)} fundos")
    print(f"   Arquivos: dados_atuais.csv | {csv_hist} | {xlsx_hist}")
    print("=" * 40)

if __name__ == "__main__":
    dados_extraidos = extrair()
    salvar_dados(dados_extraidos)
