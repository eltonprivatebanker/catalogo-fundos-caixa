# Diagnóstico e correção — recuo duplo da navegação (V884–V885)

**Status:** solução do Comparador confirmada pelo usuário em 06/11/2026.  
**Ambiente:** página de testes GitHub Pages, branch `Testes-da-versão-01`. **Não alterar `main` ou `index.html` sem validação.**

## Causa raiz

Depois da navegação por módulos (V875/V877), os módulos passaram a ser filhos de `#v877-stage`, que já ocupa a coluna de conteúdo e reserva **208px** para a barra lateral no desktop. Parte do código legado (identificada pelo atributo `data-side-nav-fix-v588="1"`) continua aplicando ao **módulo filho**:

```css
margin-left: 208px !important;
width: calc(100% - 208px) !important;
max-width: calc(100% - 208px) !important;
```

Isso desloca a seção pela segunda vez, deixando margens diferentes em cada tela e reduzindo a largura útil. **Não é erro de gráfico ou de dados.**

## Solução comprovada

Corrigir *somente o elemento raiz do módulo ativo* (já dentro do stage) com:
```js
[
 ['margin-left','0px'],['margin-right','0px'],
 ['margin-inline-start','0px'],['margin-inline-end','0px'],
 ['width','100%'],['max-width','100%'],['min-width','0px'],
 ['left','auto'],['right','auto'],['transform','none']
].forEach(([prop,value])=>root.style.setProperty(prop,value,'important'));
```

Aplicar com `matchMedia('(min-width:1180px)')` apenas no desktop; ao entrar em viewport menor, desfazer apenas as propriedades que esta solução colocou. Reaplicar na navegação, no resize e quando o motor legado escrever o atributo `style`; checar valores antes de gravar, para evitar loops de `MutationObserver`.

Em V884 a correção foi aplicada em `#sec-fundos` (`v884NormalizeCatalog`). Em V885, **confirmada visualmente**, em `#comparWorkspaceV723` (`v885NormalizeComparator`). Arquivos de testes ficam preservados e cada avanço ganha novo HTML.

## Outras ocorrências detectadas

O usuário forneceu o HTML do Inspetor (06/11/2026), com a mesma assinatura `data-side-nav-fix-v588="1"` e os três valores de estilo acima nos módulos `#sec-dolar` (Dólar PTAX) e `#sec-focus` (Boletim Focus). Há também suspeita visual em `#sec-graficos` (Inflação e juros), a confirmar no Inspector antes de tratar como mesma origem.

**Atenção:** o `#sec-focus` fornecido estava `display:none` porque a aba de mercado exibida era outra; não confundir elemento oculto com falha de layout.

## Verificação no Firefox

No console, na V885, selecionar Comparador e executar `window.__v885Diagnostico()`. A coluna `esquerda` do Comparador deve coincidir com a do `stage`, resultando em `recuo: 0`.

Para qualquer outra seção visível:
```js
(() => {
 const stage=document.getElementById('v877-stage');
 const ids=['sec-fundos','comparWorkspaceV723','rankingsSection','sec-mercado','sec-dolar','sec-focus','sec-graficos'];
 const left=stage?.getBoundingClientRect().left ?? 0;
 console.table(ids.map(id=>{
   const e=document.getElementById(id);
   if(!e||!e.getClientRects().length)return null;
   const r=e.getBoundingClientRect();
   return {id,esquerda:Math.round(r.left),recuo:Math.round(r.left-left),largura:Math.round(r.width),inlineMargin:e.style.marginLeft,fixV588:e.dataset.sideNavFixV588||''};
 }).filter(Boolean));
})();
```

## Regras de segurança

- Manter a `V885` intacta como versão confirmada.
- Para novos testes, criar `V886` ou posterior na branch de testes.
- Não usar uma regra global que imponha `width:100%` em filhos aninhados ou que altere componentes internos; atuar somente nos **módulos diretos** de `#v877-stage`.
- Preservar dados, filtros, navegação, gráficos e renderização.
- Após mudar a seção, medir imediatamente e após estabilização (ex.: 500ms) para detectar scripts legados que reaplicam a margem.
- Validar 1463px e uma largura menor para garantir que a correção desktop não prejudique responsividade.


- **V887 (teste, ainda pendente de validação visual):** confirmado no HTML do Inspetor o mesmo `margin-left: 208px` em `#sec-graficos` dentro do `#v877-stage`. A normalização do módulo ativo foi estendida para `mercado/juros`, preservando as correções de Dólar e Focus. Diagnóstico: `window.__v887Diagnostico()`. A V886 não foi alterada.

## Versões de referência

- V884: Catálogo sem recuo duplicado.
- V885: Comparador sem recuo duplicado (confirmado em 06/11/2026).
- V886 (teste, **ainda sem validação visual pelo usuário**): a mesma normalização agora foi aplicada exclusivamente aos módulos ativos `#sec-dolar` e `#sec-focus`, com comando `window.__v886Diagnostico()` para inspecionar o recuo. Preserva V885. `#sec-graficos` segue pendente de confirmação.


