// Configuração dinâmica das chaves do JSON baseadas na API da Caixa e no Robô SIPII
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
        // Busca o JSON gerado pela sua rotina no GitHub Actions
        const response = await fetch('fundos_caixa.json');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dadosBrutos = await response.json();
        
        // --- A SOLUÇÃO DEFINITIVA PARA O SEU ROBÔ ---
        let listaDeFundos = [];
        
        // Verifica se existe o dicionário 'por_cnpj' que o seu robô Python gera
        if (dadosBrutos.por_cnpj && typeof dadosBrutos.por_cnpj === 'object') {
            // Extrai apenas os valores (os fundos em si) de dentro do dicionário de CNPJs
            listaDeFundos = Object.values(dadosBrutos.por_cnpj);
        } else if (Array.isArray(dadosBrutos)) {
            listaDeFundos = dadosBrutos; // Mantém fallback caso a estrutura mude futuramente
        } else {
            console.error("Estrutura do JSON não reconhecida:", dadosBrutos);
            throw new Error("A estrutura de dicionário 'por_cnpj' não foi encontrada.");
        }
        
        // Formata e mapeia os dados para a tabela
        fundosGlobais = listaDeFundos.map(fundo => ({
            nome: fundo[CHAVES_JSON.nome] || 'Fundo Desconhecido',
            categoria: fundo[CHAVES_JSON.categoria] || 'Outros',
            pl: formatarPL(fundo[CHAVES_JSON.pl]),
            retorno12m: parseFloat(fundo[CHAVES_JSON.retorno12m]) || 0,
            cdi12m: parseFloat(fundo[CHAVES_JSON.cdi12m]) || 0,
            plBruto: parseFloat(fundo[CHAVES_JSON.pl]) || 0
        })).sort((a, b) => b.retorno12m - a.retorno12m); // Ordena do maior retorno para o menor

        renderizarKPIs(fundosGlobais);
        renderizarTabela(fundosGlobais);

    } catch (error) {
        console.error("Falha ao carregar o JSON:", error);
        document.querySelector('#tabela-fundos tbody').innerHTML = `
            <tr><td colspan="3" class="text-red align-center" style="text-align: center; padding: 20px;">
                ⚠️ Falha ao processar os dados. O console contém mais detalhes técnicos.
            </td></tr>
        `;
    }
}

function renderizarKPIs(dados) {
    if (dados.length === 0) return;
    
    // Filtra fundos com movimentação real (retorno diferente de zero exato) para KPIs mais precisos
    const fundosValidos = dados.filter(f => f.retorno12m !== 0);
    
    const melhor12M = fundosValidos.length > 0 ? fundosValidos[0] : dados[0];
    const pior12M = fundosValidos.length > 0 ? fundosValidos[fundosValidos.length - 1] : dados[dados.length - 1];
    
    // Clona o array antes de ordenar por PL para não bagunçar a ordem principal
    const maiorPL = [...dados].sort((a, b) => b.plBruto - a.plBruto)[0];

    const kpiContainer = document.getElementById('kpi-cards');
    kpiContainer.innerHTML = `
        <div class="kpi-card">
            <span class="kpi-title">🏆 Melhor 12M</span>
            <span class="kpi-value text-green">+${melhor12M.retorno12m.toFixed(2).replace('.', ',')}%</span>
            <span class="kpi-subtitle">${melhor12M.nome}<br><span style="opacity: 0.7">${melhor12M.categoria}</span></span>
        </div>
        <div class="kpi-card">
            <span class="kpi-title">🏢 Maior PL</span>
            <span class="kpi-value text-green">R$ ${maiorPL.pl}</span>
            <span class="kpi-subtitle">${maiorPL.nome}<br><span style="opacity: 0.7">${maiorPL.categoria}</span></span>
        </div>
        <div class="kpi-card">
            <span class="kpi-title">⚠️ Pior 12M</span>
            <span class="kpi-value text-red">${pior12M.retorno12m.toFixed(2).replace('.', ',')}%</span>
            <span class="kpi-subtitle">${pior12M.nome}<br><span style="opacity: 0.7">${pior12M.categoria}</span></span>
        </div>
    `;
}

function renderizarTabela(dados) {
    const tbody = document.querySelector('#tabela-fundos tbody');
    tbody.innerHTML = ''; 

    // Limita a exibição inicial para não pesar a interface
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
            // Controle visual do botão ativo
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            e.target.classList.add('ativo');

            const categoriaSelecionada = e.target.textContent.trim().toLowerCase();

            // Lógica de filtragem rápida na memória
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
    if (num >= 1e9) return (num / 1e9).toFixed(2).replace('.', ',') + ' bi';
    if (num >= 1e6) return (num / 1e6).toFixed(2).replace('.', ',') + ' mi';
    return num.toLocaleString('pt-BR');
}
