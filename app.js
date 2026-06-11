// Configuração dinâmica das chaves do JSON baseadas na API da Caixa
const CHAVES_JSON = {
    nome: "no_fundo",
    categoria: "no_classificacao_cvm",
    pl: "vr_pl",
    retorno12m: "pc_rentabilidade_12m_anterior",
    cdi12m: "pc_rentabilidade_cdi_12m"
};

let fundosGlobais = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    configurarFiltros();
});

async function carregarDados() {
    try {
        const response = await fetch('fundos_caixa.json');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dadosBrutos = await response.json();
        
        fundosGlobais = dadosBrutos.map(fundo => ({
            nome: fundo[CHAVES_JSON.nome] || 'Fundo Desconhecido',
            categoria: fundo[CHAVES_JSON.categoria] || 'Outros',
            pl: formatarPL(fundo[CHAVES_JSON.pl]),
            retorno12m: parseFloat(fundo[CHAVES_JSON.retorno12m]) || 0,
            cdi12m: parseFloat(fundo[CHAVES_JSON.cdi12m]) || 0,
            plBruto: parseFloat(fundo[CHAVES_JSON.pl]) || 0
        })).sort((a, b) => b.retorno12m - a.retorno12m); // Ordena por maior rentabilidade

        renderizarKPIs(fundosGlobais);
        renderizarTabela(fundosGlobais);

    } catch (error) {
        console.error("Falha ao carregar o JSON:", error);
        document.querySelector('#tabela-fundos tbody').innerHTML = `
            <tr><td colspan="3" class="text-red align-center" style="text-align: center; padding: 20px;">
                ⚠️ Não foi possível carregar os dados. Verifique se o arquivo fundos_caixa.json está na mesma pasta.
            </td></tr>
        `;
    }
}

function renderizarKPIs(dados) {
    if (dados.length === 0) return;
    
    // Filtra fundos válidos
    const fundosValidos = dados.filter(f => f.retorno12m !== 0);
    
    const melhor12M = fundosValidos.length > 0 ? fundosValidos[0] : dados[0];
    const pior12M = fundosValidos.length > 0 ? fundosValidos[fundosValidos.length - 1] : dados[dados.length - 1];
    const maiorPL = [...dados].sort((a, b) => b.plBruto - a.plBruto)[0];

    const kpiContainer = document.getElementById('kpi-cards');
    kpiContainer.innerHTML = `
        <div class="kpi-card">
            <span class="kpi-title">🏆 Melhor 12M</span>
            <span class="kpi-value text-green">+${melhor12M.retorno12m.toFixed(2).replace('.', ',')}%</span>
            <span class="kpi-subtitle">${melhor12M.nome}<br>${melhor12M.categoria}</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-title">🏢 Maior PL</span>
            <span class="kpi-value text-green">R$ ${maiorPL.pl}</span>
            <span class="kpi-subtitle">${maiorPL.nome}<br>${maiorPL.categoria}</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-title">⚠️ Pior 12M</span>
            <span class="kpi-value text-red">${pior12M.retorno12m.toFixed(2).replace('.', ',')}%</span>
            <span class="kpi-subtitle">${pior12M.nome}<br>${pior12M.categoria}</span>
        </div>
    `;
}

function renderizarTabela(dados) {
    const tbody = document.querySelector('#tabela-fundos tbody');
    tbody.innerHTML = ''; 

    const fundosParaExibir = dados.slice(0, 30);

    fundosParaExibir.forEach(fundo => {
        const classeRetorno = fundo.retorno12m >= 0 ? 'text-green' : 'text-red';
        const sinalRetorno = fundo.retorno12m > 0 ? '+' : '';

        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>
                <strong class="fw-bold">${fundo.nome}</strong><br>
                <span class="text-secondary">${fundo.categoria} • PL R$ ${fundo.pl}</span>
            </td>
            <td class="${classeRetorno} align-right fw-bold">
                ${sinalRetorno}${fundo.retorno12m.toFixed(2).replace('.', ',')}%
            </td>
            <td class="align-right text-secondary">
                ${fundo.cdi12m.toFixed(0)}%
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function configurarFiltros() {
    const botoesFiltro = document.querySelectorAll('.btn-filtro');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (e) => {
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            e.target.classList.add('ativo');

            const categoriaSelecionada = e.target.textContent.trim().toLowerCase();

            if (categoriaSelecionada === 'todos') {
                renderizarTabela(fundosGlobais);
            } else {
                const dadosFiltrados = fundosGlobais.filter(fundo => 
                    fundo.categoria.toLowerCase().includes(categoriaSelecionada)
                );
                renderizarTabela(dadosFiltrados);
            }
        });
    });
}

function formatarPL(valor) {
    if (!valor) return "0";
    const num = Number(valor);
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace('.', ',') + ' bi';
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace('.', ',') + ' mi';
    return num.toLocaleString('pt-BR');
}
