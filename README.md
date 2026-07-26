# Catálogo de Fundos CAIXA

Dashboard estático para consulta de fundos, rankings e indicadores de mercado, com atualização automática por GitHub Actions.

## Arquivos principais

- `index.html`, `app.js`, `style.css` e `tokens-caixa.css`: aplicação publicada no GitHub Pages.
- `robo_sipii_simples.py`: coleta e consolidação de fundos e indicadores.
- `requirements.txt`: dependências do robô.
- arquivos JSON/CSV/XLSX na raiz: base corrente consumida diretamente pelo site.
- `.github/workflows/main.yml`: atualização automatizada.

## Pastas

- `data/historico/sipii/`: cinco snapshots diários mantidos pelo robô.
- `docs/`: instruções operacionais e histórico das versões.
- `archive/legacy/`: arquivos antigos preservados apenas para consulta.

## Atualização manual

```bash
pip install -r requirements.txt
python robo_sipii_simples.py --modo full
```

Modos disponíveis: `full`, `indicadores`, `fundos`, `metadados` e `debug-selic`.

## Publicação

O site ainda consome os arquivos correntes diretamente da raiz. Essa decisão preserva compatibilidade com o JavaScript e o robô atuais. Os arquivos históricos e documentais foram organizados sem alterar esses caminhos públicos.
