# Atualização v232 — CDI acumulado diário

## O que foi corrigido

- `robo_sipii_simples.py` calcula o CDI do mês pela série diária SGS 12.
- O valor é acumulado por capitalização composta desde o primeiro dia útil do mês.
- `parcial_ate` passa a representar a última observação diária disponível.
- A série SGS 4391 continua como fallback para fechamentos e acumulados.
- `app.js` usa a mesma fonte para a visão executiva e a tabela analítica.
- A página verifica uma nova versão de `mercado_atual.json` a cada 30 minutos.
- O workflow executa duas vezes por dia útil.

## Onde enviar cada arquivo

### Na branch `Testes-da-versão-01`

Substitua na raiz do repositório:

1. `index.html`
2. `style.css`
3. `app.js`
4. `robo_sipii_simples.py`

### Na branch padrão `main`

Crie ou substitua:

```text
.github/workflows/main.yml
```

O agendamento do GitHub Actions usa o workflow existente na branch padrão. O arquivo fornecido roda em `main`, mas baixa, atualiza e envia os dados para `Testes-da-versão-01`.

## Passo a passo no GitHub

1. Abra o repositório `eltonprivatebanker/catalogo-fundos-caixa`.
2. Selecione a branch `Testes-da-versão-01`.
3. Use **Add file → Upload files**.
4. Envie `index.html`, `style.css`, `app.js` e `robo_sipii_simples.py`.
5. Confirme em **Commit changes**.
6. Troque para a branch `main`.
7. Abra a pasta `.github/workflows`.
8. Substitua `main.yml` pelo arquivo deste pacote. Caso a pasta não exista, crie o arquivo pelo caminho completo `.github/workflows/main.yml`.
9. Confirme o commit na `main`.
10. Abra a aba **Actions**.
11. Selecione **Atualização diária CAIXA**.
12. Clique em **Run workflow** e execute pela branch `main`.

## Como conferir o resultado

Ao concluir o workflow, abra `mercado_atual.json` na branch `Testes-da-versão-01` e procure:

```json
"parcial_mes_atual": 0.64,
"parcial_ate": "18/06/2026",
"parcial_data_iso": "2026-06-18",
"parcial_origem": "bcb_sgs_12_diario",
"parcial_dias_uteis": 12
```

Os números do exemplo variam conforme a data. O importante é:

- `parcial_mes_atual` possuir um número;
- `parcial_ate` mostrar a última data disponível;
- `parcial_origem` mostrar `bcb_sgs_12_diario` quando a série diária responder.

## Horários automáticos

O workflow foi configurado para dias úteis, aproximadamente às:

- 11h30 de Brasília;
- 18h30 de Brasília.

A segunda execução serve como nova tentativa caso o BCB ainda não tenha publicado o valor na primeira.

## Depois de publicar

Faça uma atualização forçada da página:

- Windows: `Ctrl + F5`;
- Android/Chrome: feche a aba, abra novamente e, se necessário, limpe os dados em cache do site.

## Observação

A página não cria um novo CDI por conta própria. Ela consulta `mercado_atual.json`. Quem atualiza o arquivo é o robô executado pelo GitHub Actions.
