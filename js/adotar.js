// Espera o DOM estar pronto para rodar o script específico da página
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variáveis de Estado ---
    let currentPage = 1;
    const itemsPerPage = 8; // 4 colunas, 2 fileiras = 8. Mude aqui se quiser.
    
    // Certifica que 'allPets' existe (vem do database.js)
    if (typeof allPets === 'undefined') {
        console.error("ERRO: database.js não foi carregado antes de adotar.js");
        return;
    }
    let currentFilteredPets = [...allPets]; // Começa com todos os pets
    
    // --- Seletores de Elementos (Página Adotar) ---
    const grid = document.getElementById('adoption-grid');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageInfo = document.getElementById('page-info');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const filterToggles = document.querySelectorAll('.filter-toggle');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    // --- Seletores de Elementos (Página Home) ---
    const featuredGrid = document.getElementById('featured-pets-grid');

    // --- Objeto de Filtros ---
    const filters = {
        tipo: 'todos',
        sexo: 'todos',
        porte: 'todos',
        idade: 'todos'
    };
    
    // --- FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO (ATUALIZADA) ---
    // Esta função desenha os cards dos animais na tela
    function renderPets(petsToRender, container) {
        if (!container) return; // Sai se o container não existir
        
        container.innerHTML = ""; // Limpa o grid

        if (petsToRender.length === 0) {
            container.innerHTML = "<p class='no-pets-found'>Nenhum animal encontrado com esses filtros.</p>";
            return;
        }

        petsToRender.forEach(pet => {
            // Cria o card do animal
            const cardLink = document.createElement('a');
            
            // CORREÇÃO 1: O link agora aponta para a página de detalhes com o ID
            cardLink.href = `pet-detalhe.html?id=${pet.id}`; 
            
            cardLink.className = 'animal-card-link';
            cardLink.setAttribute('aria-label', `Ver detalhes de ${pet.nome}`);
            
            // Preenche o HTML interno do card
            cardLink.innerHTML = `
                <div class="animal-card">
                    <img src="${pet.img}" alt="${pet.nome}">
                    <div class="card-info">
                        <h3>${pet.nome}</h3>
                        
                                                <p>${pet.porte} | ${pet.sexo} | ${pet.idadeTexto}</p> 
                        
                        <p class="description">${pet.descricaoCurta.substring(0, 100)}...</p>
                        
                        <button class="btn-adopt" data-pet-id="${pet.id}" tabindex="-1">Quero Adotar</button>
                    </div>
                </div>
            `;
            
            // Adiciona o card ao container (grid)
            container.appendChild(cardLink);
        });

        // IMPORTANTE: Adiciona os listeners aos botões DEPOIS de criá-los
        addAdoptButtonListeners(container);
    }
    
    // --- FUNÇÃO PARA ADICIONAR LISTENERS AOS BOTÕES "QUERO ADOTAR" ---
    function addAdoptButtonListeners(container) {
        if (!container) return; // Checagem de segurança
        container.querySelectorAll('.btn-adopt').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Impede o link <a> de ser seguido
                e.stopPropagation(); // Impede o clique de "borbulhar" para o card-link
                
                const petId = parseInt(button.dataset.petId, 10);
                
                // Chama a função GLOBAL do script.js
                if (window.openAdoptionModal) {
                    window.openAdoptionModal(petId);
                } else {
                    console.error("Função openAdoptionModal não encontrada!");
                }
            });
        });
    }

    // --- LÓGICA DE FILTRAGEM E PAGINAÇÃO (Só para a página Adotar) ---

    if (grid) { // Só executa se estivermos na página 'adotar.html'
        
        // --- Paginação ---
        function updatePagination() {
            const totalPages = Math.ceil(currentFilteredPets.length / itemsPerPage);
            if (pageInfo) pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
            if (btnPrev) btnPrev.disabled = currentPage === 1;
            if (btnNext) btnNext.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        // --- Renderização com Paginação ---
        function paginateAndRender() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const petsForThisPage = currentFilteredPets.slice(startIndex, endIndex);
            
            renderPets(petsForThisPage, grid);
            updatePagination();
        }

        // --- Event Listeners dos Filtros ---
        
        // Toggles (Cão/Gato, Macho/Fêmea)
        filterToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const filterType = toggle.dataset.filter;
                const filterValue = toggle.dataset.value;
                
                // Atualiza o objeto de filtros
                filters[filterType] = filterValue;
                
                // Atualiza o visual (classe 'active')
                document.querySelectorAll(`.filter-toggle[data-filter="${filterType}"]`).forEach(t => t.classList.remove('active'));
                toggle.classList.add('active');
            });
        });

        // Selects (Porte, Idade)
        filterSelects.forEach(select => {
            select.addEventListener('change', () => {
                filters[select.dataset.filter] = select.value;
            });
        });

        // Botão "Filtrar"
        if (btnFiltrar) {
            btnFiltrar.addEventListener('click', () => {
                // Filtra o banco de dados
                currentFilteredPets = allPets.filter(pet => {
                    return (filters.tipo === 'todos' || pet.tipo === filters.tipo) &&
                           (filters.sexo === 'todos' || pet.sexo === filters.sexo) &&
                           (filters.porte === 'todos' || pet.porte === filters.porte) &&
                           (filters.idade === 'todos' || pet.idade === filters.idade);
                });
                
                currentPage = 1; // Reseta para a primeira página
                paginateAndRender();
            });
        }

        // Botões de Paginação
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

        // --- Carga Inicial ---
        paginateAndRender();
    }
    
    // --- LÓGICA DA PÁGINA INICIAL (Home) ---
    if (featuredGrid) { // Só executa se estivermos na 'index.html'
        // Pega os 3 primeiros pets como "destaque"
        const featuredPets = allPets.slice(0, 3);
        renderPets(featuredPets, featuredGrid);
        
        // CORREÇÃO: Removi o código que você tinha colado aqui por engano.
    }

});