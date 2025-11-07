// /js/encontrados.js

document.addEventListener('DOMContentLoaded', () => {
    
    let currentPage = 1;
    const itemsPerPage = 8;
    
    // Verifica se o banco de dados 'foundPets' foi carregado corretamente
    if (typeof foundPets === 'undefined') {
        console.error("ERRO: database-encontrados.js não foi carregado antes de encontrados.js");
        alert("Erro ao carregar banco de dados!");
        return;
    }

    // Usa o banco de dados 'foundPets'
    let currentFilteredPets = [...foundPets];

    // Captura dos elementos da interface
    const grid = document.getElementById('found-grid'); 
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const filterToggles = document.querySelectorAll('.filter-toggle');
    const filterSelects = document.querySelectorAll('.filter-select');

    // Estrutura dos filtros
    const filters = {
        tipo: 'todos',
        sexo: 'todos',
        porte: 'todos',
        idade: 'todos'
    };
    
    // Função para renderizar os cards dos pets encontrados
    function renderPets(petsToRender, container) {
        if (!container) return; 
        container.innerHTML = ""; 

        if (petsToRender.length === 0) {
            container.innerHTML = "<p class='no-pets-found'>Nenhum animal encontrado com esses filtros.</p>";
            return;
        }

        petsToRender.forEach(pet => {
            const cardLink = document.createElement('a');
            
            // Link apontando para a página de detalhes
            cardLink.href = `pet-detalhe-encontrado.html?id=${pet.id}`; 
            cardLink.className = 'animal-card-link';
            cardLink.setAttribute('aria-label', `Ver detalhes de ${pet.nome}`);
            
            // Montagem do conteúdo do card
            cardLink.innerHTML = `
                <div class="animal-card">
                    <img src="${pet.img}" alt="${pet.nome}">
                    <div class="card-info">
                        <h3>${pet.nome}</h3>
                        <p>${pet.porte} | ${pet.sexo} | ${pet.idadeTexto}</p>
                        <p style="font-weight: 600; color: var(--heading-color);">${pet.localizacao}</p>
                        <p class="description">${pet.descricaoCurta.substring(0, 80)}...</p>
                    </div>
                </div>
            `;
            
            container.appendChild(cardLink);
        });
    }

    // Funções de paginação
    function updatePagination() {
        const totalPages = Math.ceil(currentFilteredPets.length / itemsPerPage);
        if (pageInfo) pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
        if (btnPrev) btnPrev.disabled = currentPage === 1;
        if (btnNext) btnNext.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    function paginateAndRender() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const petsForThisPage = currentFilteredPets.slice(startIndex, endIndex);
        renderPets(petsForThisPage, grid);
        updatePagination();
    }

    // Lógica de filtros
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const filterType = toggle.dataset.filter;
            const filterValue = toggle.dataset.value;
            filters[filterType] = filterValue;
            
            // Atualiza visualmente os botões ativos
            document.querySelectorAll(`.filter-toggle[data-filter="${filterType}"]`).forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
        });
    });

    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            filters[select.dataset.filter] = select.value;
        });
    });

    // Botão de filtrar
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', () => {
            currentFilteredPets = foundPets.filter(pet => { 
                return (filters.tipo === 'todos' || pet.tipo === filters.tipo) &&
                       (filters.sexo === 'todos' || pet.sexo === filters.sexo) &&
                       (filters.porte === 'todos' || pet.porte === filters.porte) &&
                       (filters.idade === 'todos' || pet.idade === filters.idade);
            });
            currentPage = 1;
            paginateAndRender();
        });
    }

    // Botões de navegação da paginação
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                paginateAndRender();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const totalPages = Math.ceil(currentFilteredPets.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                paginateAndRender();
            }
        });
    }

    // Renderização inicial da página
    paginateAndRender();
});
