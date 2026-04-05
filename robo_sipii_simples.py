"""
============================================================
ROBÔ ATUALIZADO — SIPII PARA EXCEL & DASHBOARD ONLINE
============================================================
1. Abre o site fundos.caixa.gov.br
2. Clica em cada categoria e extrai os dados
3. Salva histórico com DATA (Ex: sipii_caixa_20260405.csv)
4. Salva arquivo FIXO para o SITE (dados_atuais.csv)
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
    print("🤖 Robô SIPII — Iniciando extração inteligente...\n")

    # Configurações para rodar no servidor do GitHub
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
        print(f"  📂 Processando: {cat}...", end=" ", flush=True)
        try:
            driver.get(URL)
            time.sleep(3)

            # Localiza a aba "TODOS"
            for aba in driver.find_elements(By.CSS_SELECTOR, "ul.nav-tabs li a"):
                if "TODOS" in aba.text.upper():
                    aba.click()
                    time.sleep(2)
                    break

            # Localiza e clica na categoria
            clicou = False
            for link in driver.find_elements(By.CSS_SELECTOR, "a"):
                if cat.upper() == link.text.strip().upper():
                    link.click()
                    time.sleep(2)
                    clicou = True
                    break
            
            if not clicou:
                print("⚠ não encontrada")
                continue

            # Aguarda a tabela
            try:
                WebDriverWait(driver, 15).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "table.zebra tbody tr")))
                time.sleep(1.5)
            except TimeoutException:
                print("⚠ tabela não carregou")
                continue

            # Selecionar "Todos" registros
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

            # Extração das linhas
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
            print(f"❌ Erro: {str(e)[:50]}")

    driver.quit()

    if not todos:
        print("⚠ Nenhum dado extraído.")
        return

    # Processamento final com Pandas
    df = pd.DataFrame(todos)
    cols = ["Categoria"] + COLUNAS
    df = df[[c for c in cols if c in df.columns]]

    ts = datetime.now().strftime("%Y%m%d")

    # --- SALVAMENTO INTELIGENTE ---

    # 1. Salva histórico com DATA (Excel e CSV)
    xlsx_path = f"sipii_caixa_{ts}.xlsx"
    csv_path = f"sipii_caixa_{ts}.csv"
    
    # Salva Excel com abas
    with pd.ExcelWriter(xlsx_path, engine="openpyxl") as w:
        df.to_excel(w, sheet_name="Todos", index=False)
        for cat in df["Categoria"].unique():
            df[df["Categoria"] == cat].to_excel(w, sheet_name=cat[:31], index=False)
    
    # Salva CSV histórico
    df.to_csv(csv_path, index=False, encoding="utf-8-sig", sep=",")

    # 2. Salva arquivo FIXO para o SITE ler (Sempre o mais atualizado)
    # Importante: Usar vírgula como separador para o index.html ler corretamente
    df.to_csv("dados_atuais.csv", index=False, encoding="utf-8-sig", sep=",")

    print(f"\n✅ SUCESSO!")
    print(f"📁 Histórico: {csv_path}")
    print(f"🌐 Arquivo do Site: dados_atuais.csv")

if __name__ == "__main__":
    rodar(headless=True)
