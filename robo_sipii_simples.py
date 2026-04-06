"""
============================================================
ROBÔ SIPII — VERSÃO FINAL PARA GITHUB PAGES
============================================================
Captura a URL REAL de cada fundo abrindo o popup.
Gera 'dados_atuais.csv' para o index.html e histórico em Excel.
============================================================
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.common.keys import Keys
import pandas as pd
import time
from datetime import datetime
import unicodedata, re
import csv

URL = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

CATEGORIAS = [
    "RENDA FIXA SIMPLES", "RENDA FIXA", "RENDA FIXA REFERENCIADO",
    "RENDA FIXA CURTO PRAZO", "MULTIMERCADO", "CAMBIAL",
    "ACOES", "FUNDO DE INDICE", "FUNDOS MUTUOS DE PRIVATIZACAO",
]

COLUNAS_DADOS = [
    "Fundo", "Data Inicio", "Aplic. Inicial (R$)",
    "Cota (R$)","Variacao Dia (%)", "Acum. Mes (%)",
    "Acum. Ano (%)", "Acum. 12M (%)",
    "PL (milhoes R$)", "PL Medio (milhoes R$)"
]

def rm_accent(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def configurar_driver(headless=True):
    opt = webdriver.ChromeOptions()
    if headless:
        opt.add_argument("--headless=new")
    opt.add_argument("--no-sandbox")
    opt.add_argument("--disable-dev-shm-usage")
    opt.add_argument("--window-size=1400,1080")
    opt.add_argument("--disable-gpu")
    return webdriver.Chrome(options=opt)

def extrair():
    driver = configurar_driver(headless=True) # Mude para False se quiser ver o robo trabalhando
    wait = WebDriverWait(driver, 10)
    todos_resultados = []

    print(f"🚀 Iniciando extração em {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    for cat in CATEGORIAS:
        print(f"📂 Categoria: {cat}")
        try:
            driver.get(URL)
            
            # 1. Clica na aba TODOS
            aba_todos = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[contains(text(),'TODOS')]")))
            aba_todos.click()
            time.sleep(1.5)

            # 2. Clica na categoria específica
            link_cat = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, cat)))
            link_cat.click()
            
            # 3. Garante que a tabela carregou
            wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.zebra tbody tr")))
            time.sleep(1)

            # 4. Processa as linhas
            linhas = driver.find_elements(By.CSS_SELECTOR, "table.zebra tbody tr")
            fundos_na_cat = 0

            for tr in linhas:
                # Verifica se a linha tem o link do fundo (evita lixo e linhas de '0,01')
                try:
                    link_fundo = tr.find_element(By.CSS_SELECTOR, "td:first-child a")
                    nome_fundo = link_fundo.text.strip().replace("\n", " ")
                except NoSuchElementException:
                    continue 

                if not nome_fundo: continue

                # Coleta dados da linha
                celulas = [td.text.strip() for td in tr.find_elements(By.TAG_NAME, "td")]
                
                # --- CAPTURA DA URL REAL NO POPUP ---
                url_real = ""
                try:
                    driver.execute_script("arguments[0].click();", link_fundo)
                    
                    # Espera o container do popup aparecer
                    popup = wait.until(EC.visibility_of_element_located((
                        By.XPATH, "//*[contains(@class,'rich-mpnl-content') or contains(@id,'param')]")))
                    
                    # Busca o link específico dentro do popup
                    link_final_el = popup.find_element(By.XPATH, ".//a[contains(@href, 'caixa.gov.br/fundos-investimento')]")
                    url_real = link_final_el.get_attribute("href")

                    # Fecha o popup (X ou ESC)
                    try:
                        btn_fechar = driver.find_element(By.XPATH, "//*[contains(@id,'close') or text()='X' or contains(@onclick,'hide')]")
                        driver.execute_script("arguments[0].click();", btn_fechar)
                    except:
                        driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
                    
                    time.sleep(0.8) # Respiro para o site
                except Exception:
                    url_real = "" # Fallback se falhar

                # Monta o dicionário do fundo
                registro = {"Categoria": cat}
                for i, col in enumerate(COLUNAS_DADOS):
                    registro[col] = celulas[i] if i < len(celulas) else ""
                
                registro["URL"] = url_real
                todos_resultados.append(registro)
                fundos_na_cat += 1

            print(f"   ✅ {fundos_na_cat} fundos extraídos.")

        except Exception as e:
            print(f"   ❌ Erro na categoria {cat}: {str(e)[:50]}")

    driver.quit()
    return todos_resultados

def salvar_dados(dados):
    if not dados:
        print("FALHA: Nenhum dado para salvar.")
        return

    df = pd.DataFrame(dados)
    ts = datetime.now().strftime("%Y%m%d")
    
    # Salva CSV principal para o Site
    df.to_csv("dados_atuais.csv", index=False, encoding="utf-8-sig")
    
    # Salva Histórico CSV e Excel
    csv_hist = f"sipii_caixa_{ts}.csv"
    xlsx_hist = f"sipii_caixa_{ts}.xlsx"
    
    df.to_csv(csv_hist, index=False, encoding="utf-8-sig")
    
    with pd.ExcelWriter(xlsx_hist, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Todos", index=False)
        for categoria in df["Categoria"].unique():
            df[df["Categoria"] == categoria].to_excel(writer, sheet_name=categoria[:31], index=False)

    print("\n" + "="*30)
    print("DADOS ATUALIZADOS COM SUCESSO!")
    print(f"Total: {len(df)} fundos")
    print(f"Arquivos: dados_atuais.csv, {csv_hist}, {xlsx_hist}")
    print("="*30)

if __name__ == "__main__":
    dados_extraidos = extrair()
    salvar_dados(dados_extraidos)
