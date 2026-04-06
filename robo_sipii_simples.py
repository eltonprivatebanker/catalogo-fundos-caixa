"""
============================================================
ROBÔ SIPII — COM CAPTURA DE URL DE CADA FUNDO
============================================================
Novidade: captura o link real de cada fundo na tabela SIPII
para permitir links clicáveis no dashboard.
============================================================
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import pandas as pd
import time
from datetime import datetime
import unicodedata, re

URL = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

CATEGORIAS = [
    "RENDA FIXA SIMPLES", "RENDA FIXA", "RENDA FIXA REFERENCIADO",
    "RENDA FIXA CURTO PRAZO", "MULTIMERCADO", "CAMBIAL",
    "ACOES", "FUNDO DE INDICE", "FUNDOS MUTUOS DE PRIVATIZACAO",
]

COLUNAS = [
    "Fundo", "Data Inicio", "Aplic. Inicial (R$)",
    "Cota (R$)", "Variacao Dia (%)", "Acum. Mes (%)",
    "Acum. Ano (%)", "Acum. 12M (%)",
    "PL (milhoes R$)", "PL Medio (milhoes R$)"
]

CAT_URL = {
    "RENDA FIXA SIMPLES":            "renda-fixa-simples",
    "RENDA FIXA":                    "renda-fixa",
    "RENDA FIXA REFERENCIADO":       "renda-fixa-referenciado",
    "RENDA FIXA CURTO PRAZO":        "renda-fixa-curto-prazo",
    "MULTIMERCADO":                  "multimercado",
    "CAMBIAL":                       "cambial",
    "ACOES":                         "acoes",
    "FUNDO DE INDICE":               "fundo-de-indice",
    "FUNDOS MUTUOS DE PRIVATIZACAO": "fundos-mutuos-de-privatizacao",
}

def rm_accent(s):
    return ''.join(
        c for c in unicodedata.normalize('NFD', s)
        if unicodedata.category(c) != 'Mn'
    )

def gerar_slug(nome, categoria):
    slug = nome.upper()

    # Remove apenas sufixos jurídicos — NÃO remove termos de prazo
    for rem in ["RESP LTDA", "- RESP LTDA", "- RL", "(1)", "(2)", "(3)", "IE"]:
        slug = slug.replace(rem, " ")

    # "LP" isolado vira "LONGO PRAZO" (abreviação usada nos nomes dos fundos)
    slug = re.sub(r'\bLP\b', 'LONGO PRAZO', slug)

    slug = re.sub(r'^CAIXA\s+', '', slug.strip())
    slug = re.sub(r'\bFIF\b', '', slug)
    slug = rm_accent(slug.strip())
    slug = re.sub(r'[^A-Z0-9 ]', '', slug)
    slug = re.sub(r'\s+', '-', slug.strip()).lower()
    slug = re.sub(r'-+', '-', slug).strip('-')

    cat_seg = CAT_URL.get(categoria, "renda-fixa")
    return f"https://www.caixa.gov.br/fundos-investimento/{cat_seg}/{slug}/Paginas/default.aspx"


def rodar(headless=True):
    print("Robo SIPII iniciando extracao com URLs...\n")

    opt = webdriver.ChromeOptions()
    if headless:
        opt.add_argument("--headless=new")
    opt.add_argument("--no-sandbox")
    opt.add_argument("--disable-dev-shm-usage")
    opt.add_argument("--window-size=1920,1080")
    opt.add_argument("--disable-gpu")
    opt.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
    )

    driver = webdriver.Chrome(options=opt)
    todos = []

    for cat in CATEGORIAS:
        print(f"  Processando: {cat}...", end=" ", flush=True)
        try:
            driver.get(URL)
            time.sleep(3)

            for aba in driver.find_elements(By.CSS_SELECTOR, "ul.nav-tabs li a"):
                if "TODOS" in aba.text.upper():
                    aba.click()
                    time.sleep(2)
                    break

            clicou = False
            for link in driver.find_elements(By.CSS_SELECTOR, "a"):
                if rm_accent(cat.upper()) == rm_accent(link.text.strip().upper()):
                    link.click()
                    time.sleep(2)
                    clicou = True
                    break

            if not clicou:
                print("nao encontrada")
                continue

            try:
                WebDriverWait(driver, 15).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "table.zebra tbody tr")))
                time.sleep(1.5)
            except TimeoutException:
                print("tabela nao carregou")
                continue

            for sel in driver.find_elements(By.TAG_NAME, "select"):
                try:
                    s = Select(sel)
                    for op in ["Todos", "All", "100", "50"]:
                        if op in [o.text for o in s.options]:
                            s.select_by_visible_text(op)
                            time.sleep(2)
                            break
                    break
                except Exception:
                    continue

            linhas = driver.find_elements(By.CSS_SELECTOR, "table.zebra tbody tr")
            regs = []
            for tr in linhas:
                celulas = [td.text.strip().replace("\n", " ")
                           for td in tr.find_elements(By.TAG_NAME, "td")]
                celulas = [c for c in celulas if c]
                if not celulas or len(celulas) < 5:
                    continue

                r = {"Categoria": cat}
                for i, col in enumerate(COLUNAS):
                    r[col] = celulas[i] if i < len(celulas) else ""

                # Sempre gera o slug próprio (URL do SIPII vem truncada/errada)
                url_real = gerar_slug(r.get("Fundo", ""), cat)

                r["URL"] = url_real
                regs.append(r)

            todos.extend(regs)
            print(f"OK {len(regs)} fundos")

        except Exception as e:
            print(f"ERRO: {str(e)[:60]}")

    driver.quit()

    if not todos:
        print("Nenhum dado extraido.")
        return

    df = pd.DataFrame(todos)
    cols = ["Categoria"] + COLUNAS + ["URL"]
    df = df[[c for c in cols if c in df.columns]]

    ts = datetime.now().strftime("%Y%m%d")
    xlsx_path = f"sipii_caixa_{ts}.xlsx"
    csv_path  = f"sipii_caixa_{ts}.csv"

    with pd.ExcelWriter(xlsx_path, engine="openpyxl") as w:
        df.to_excel(w, sheet_name="Todos", index=False)
        for cat in df["Categoria"].unique():
            df[df["Categoria"] == cat].to_excel(w, sheet_name=cat[:31], index=False)

    df.to_csv(csv_path,           index=False, encoding="utf-8-sig")
    df.to_csv("dados_atuais.csv", index=False, encoding="utf-8-sig")

    print(f"\nSUCESSO!")
    print(f"Historico : {csv_path}")
    print(f"Site      : dados_atuais.csv")


if __name__ == "__main__":
    rodar(headless=True)
