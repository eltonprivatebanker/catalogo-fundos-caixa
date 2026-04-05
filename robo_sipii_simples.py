"""
============================================================
ROBÔ SIMPLES — Copia tabela do SIPII para Excel
============================================================
Faz exatamente o que faria manualmente:
  1. Abre o site fundos.caixa.gov.br
  2. Clica em cada categoria
  3. Copia a tabela inteira
  4. Cola num Excel com uma aba por categoria

Requisitos: pip install selenium pandas openpyxl
Tempo médio: ~2 minutos
============================================================
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import pandas as pd
import time, os
from datetime import datetime


URL = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

CATEGORIAS = [
    "RENDA FIXA SIMPLES", "RENDA FIXA", "RENDA FIXA REFERENCIADO",
    "RENDA FIXA CURTO PRAZO", "MULTIMERCADO", "CAMBIAL",
    "AÇÕES", "FUNDO DE ÍNDICE", "FUNDOS MÚTUOS DE PRIVATIZAÇÃO",
]

COLUNAS = [
    "Fundo", "Data Início", "Aplic. Inicial (R$)",
    "Cota (R$)", "Variação Dia (%)", "Acum. Mês (%)",
    "Acum. Ano (%)", "Acum. 12M (%)",
    "PL (milhões R$)", "PL Médio (milhões R$)"
]


def rodar(headless=True):
    print("🤖 Robô SIPII — Copiando tabelas...\n")

    # Abrir navegador
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
        print(f"  📂 {cat}...", end=" ", flush=True)
        try:
            # Recarrega a página a cada categoria (evita bugs JSF)
            driver.get(URL)
            time.sleep(3)

            # Clicar na aba "TODOS" (mostra fundos de todos os perfis)
            for aba in driver.find_elements(By.CSS_SELECTOR, "ul.nav-tabs li a"):
                if "TODOS" in aba.text.upper():
                    aba.click()
                    time.sleep(2)
                    break

            # Clicar na categoria
            clicou = False
            for link in driver.find_elements(By.CSS_SELECTOR, "a"):
                if cat.upper() == link.text.strip().upper():
                    link.click()
                    time.sleep(2)
                    clicou = True
                    break
            if not clicou:
                for link in driver.find_elements(By.CSS_SELECTOR, "a"):
                    if cat.upper() in link.text.strip().upper():
                        link.click()
                        time.sleep(2)
                        clicou = True
                        break
            if not clicou:
                print("⚠ não encontrada")
                continue

            # Esperar a tabela carregar
            try:
                WebDriverWait(driver, 15).until(
                    EC.presence_of_element_located(
                        (By.CSS_SELECTOR, "table.zebra tbody tr")))
                time.sleep(1.5)
            except TimeoutException:
                print("⚠ tabela não carregou")
                continue

            # Clicar em "Todos" no seletor de registros por página
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
            time.sleep(1)

            # COPIAR: ler cada linha da tabela
            linhas = driver.find_elements(By.CSS_SELECTOR, "table.zebra tbody tr")
            regs = []
            for tr in linhas:
                celulas = [td.text.strip().replace("\n", " ")
                           for td in tr.find_elements(By.TAG_NAME, "td")]
                celulas = [c for c in celulas if c]
                if celulas and len(celulas) >= 5:
                    r = {"Categoria": cat}
                    for i, col in enumerate(COLUNAS):
                        r[col] = celulas[i] if i < len(celulas) else ""
                    regs.append(r)

            todos.extend(regs)
            print(f"✅ {len(regs)} fundos")

        except Exception as e:
            print(f"❌ {str(e)[:50]}")

    driver.quit()
    print(f"\n🔒 Navegador fechado. Total: {len(todos)} fundos\n")

    if not todos:
        print("⚠ Nenhum dado extraído.")
        return

    # COLAR: salvar no Excel
    df = pd.DataFrame(todos)
    cols = ["Categoria"] + COLUNAS
    df = df[[c for c in cols if c in df.columns]]

    pasta = os.path.dirname(os.path.abspath(__file__))
    ts = datetime.now().strftime("%Y%m%d")

    # Excel com abas por categoria
    xlsx = os.path.join(pasta, f"sipii_caixa_{ts}.xlsx")
    with pd.ExcelWriter(xlsx, engine="openpyxl") as w:
        df.to_excel(w, sheet_name="Todos", index=False)
        for cat in df["Categoria"].unique():
            nome_aba = cat[:31]  # Excel limita 31 chars
            df[df["Categoria"] == cat].to_excel(
                w, sheet_name=nome_aba, index=False)
    print(f"📁 Excel: {xlsx}")

    # CSV
    csv_path = os.path.join(pasta, f"sipii_caixa_{ts}.csv")
    df.to_csv(csv_path, index=False, encoding="utf-8-sig", sep=";")
    print(f"📁 CSV:   {csv_path}")

    print(f"\n✅ Pronto! {len(df)} fundos em {len(df['Categoria'].unique())} categorias")


if __name__ == "__main__":
    rodar(headless=True)
