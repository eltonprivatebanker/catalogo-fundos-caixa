# Catálogo de Fundos CAIXA

Projeto autoral de consulta e comparação de fundos, com indicadores de mercado, rankings, gráficos e informações obtidas por rotinas automáticas. Este repositório é uma iniciativa independente e não substitui documentos oficiais, aconselhamento ou a confirmação dos dados nas fontes de origem.

## Páginas mantidas

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Página principal do catálogo |
| `index-ouro-teste-v873.html` | Experimento mais recente do módulo Ouro |
| `index-ipca15-teste.html` | Experimento de IPCA-15 |
| `index-mobile-v2-teste.html` | Experimento de layout mobile |

Os arquivos `*.css` e `*.js` presentes na árvore de saneamento foram conferidos contra as referências diretas dessas quatro páginas. **Não apagar arquivos ativos apenas por terem números antigos no nome.**

## Atualização de dados

- `robo_sipii_simples.py`: consulta fundos e dados de mercado.
- `robo_ipca15.py`: atualiza dados do IPCA-15.
- `.github/workflows/main.yml`: workflow da atualização diária dos dados.
- `.github/workflows/ipca15.yml`: workflow da atualização do IPCA-15.
- `requirements.txt`: dependências do robô principal.
- Arquivos como `dados_atuais.csv`, `fundos_caixa.json`, `mercado_atual.json`, `kpis_dashboard.json` e `ipca15.json` são entradas/saídas de dados; não excluir sem auditar o código.

Na configuração examinada, os workflows fazem checkout da branch `Testes-da-versão-01` e enviam atualizações para ela. A branch padrão é `main`; agendamentos do GitHub Actions dependem da configuração na branch padrão. Confirme a publicação em **Settings > Pages** — a origem do GitHub Pages não foi verificada nesta auditoria.

## Organização das branches

- `main`: branch padrão do repositório.
- `Testes-da-versão-01`: branch utilizada nos workflows examinados e fonte do saneamento.
- `backup-pre-saneamento-2026-10-31`: referência de recuperação criada antes das exclusões.
- `saneamento-html-2026-10-31`: proposta isolada de limpeza, disponível para revisão na [PR #2](https://github.com/eltonprivatebanker/catalogo-fundos-caixa/pull/2).

**Não mescle a PR antes de revisar seus arquivos e realizar testes funcionais.**

## Como testar localmente

1. Baixe o ZIP da branch que deseja testar e extraia os arquivos.
2. Na pasta extraída, execute `py -m http.server 8000` (Windows com Python) ou `python3 -m http.server 8000`.
3. Abra `http://localhost:8000/index.html` e os demais HTMLs da tabela.
4. Valide fundos, filtros, rankings, comparador, gráficos, Focus, Selic, IPCA-15, ouro e layout em desktop/mobile.
5. Em **F12 > Console e Network**, confira erros e requisições HTTP. Algumas funcionalidades dependem de bibliotecas/serviços externos e podem exigir conexão.
6. Confirme os workflows no GitHub Actions separadamente; abrir a página **não testa a execução do robô**.

## Manutenção e histórico

- Preserve `PADRAO-TECNICO.md`: contém regras de regressão e critérios técnicos do projeto.
- Preserve `LEIA-ME.txt` e `LEIA-ME-V864.txt` como registros recentes de mudanças.
- As instruções e versões antigas retiradas da árvore atual continuam disponíveis no histórico Git e na branch de backup.
- Faça mudanças em uma branch separada e use Pull Request antes de alterar a branch usada pelo robô.
- Nunca publique senhas, tokens ou dados privados no repositório público.
