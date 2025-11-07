// /js/script.js (100% COMPLETO E CORRIGIDO)

/**
 * Ouve o evento de que a página HTML foi carregada
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTA É A CORREÇÃO PARA O GITHUB ---
    // Verifica se a URL atual contém '/pages/', o que nos diz que estamos em uma subpasta
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    
    // Se estivermos em /pages/, o caminho para voltar para a raiz é '../'
    // Se estivermos na raiz (index.html), o caminho é ''
    const basePath = isInPagesFolder ? '../' : '';
    // --- FIM DA CORREÇÃO ---

    // Carrega componentes (header/footer) usando o caminho base
    loadComponent(basePath + 'componentes/header.html', '#header-placeholder');
    loadComponent(basePath + 'componentes/footer.html', '#footer-placeholder');

    // Inicia os scripts dos modais
    initializeModal(); // Controla o modal "Quero Adotar"
    initializeDonateModal(); // Controla o NOVO modal "Doação Voluntária"
    
    // Só roda a função dos botões estáticos se estivermos no index.html
    if (!isInPagesFolder) {
        initializeStaticIndexButtons(); // ATIVA os botões estáticos do index.html
    }
});


function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'pt', // Idioma original do site
    includedLanguages: 'en', // Idioma para o qual traduzir
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}


/**
 * 1. CARREGA COMPONENTES (HEADER / FOOTER)
 * Busca um arquivo HTML e o injeta em um placeholder.
 */
function loadComponent(url, placeholderId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Falha ao carregar ${url}. Verifique o caminho do arquivo.`);
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.querySelector(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
                // Se for o header, inicia os scripts de acessibilidade
                if (placeholderId === '#header-placeholder') {
                    initializeAppAccessibility();
                }
            } else {
                console.warn(`Placeholder "${placeholderId}" não encontrado.`);
            }
        })
        .catch(error => {
            console.error(`Erro ao carregar componente ${url}:`, error);
        });
}

/**
 * 2. INICIA A ACESSIBILIDADE DO APP (Chamada após o header carregar)
 * Controla o menu de acessibilidade (modo escuro, etc.)
 */
function initializeAppAccessibility() {
    const body = document.body;
    const acessibilidadeBtn = document.getElementById('acessibilidade-btn');
    const acessibilidadeMenu = document.getElementById('acessibilidade-menu');
    const themeToggle = document.getElementById('checkbox');
    const daltonicToggle = document.getElementById('daltonic-toggle');
    const contrasteToggle = document.getElementById('contraste-toggle');
    const translateToggle = document.getElementById('translate-toggle');

    if (!acessibilidadeBtn || !acessibilidadeMenu || !themeToggle || !daltonicToggle || !contrasteToggle || !translateToggle) {
        console.warn("Alguns elementos de acessibilidade não foram encontrados no header.");
        return;
    }

    const themeKey = 'theme';
    const daltonicKey = 'daltonicMode';
    const contrasteKey = 'contrasteMode';

    function setClassAndStorage(element, className, key, isEnabled) {
        if (isEnabled) {
            element.classList.add(className);
            localStorage.setItem(key, 'true');
        } else {
            element.classList.remove(className);
            localStorage.setItem(key, 'false');
        }
    }

    // Carregar preferências salvas
    const savedTheme = localStorage.getItem(themeKey) === 'true';
    themeToggle.checked = savedTheme;
    setClassAndStorage(body, 'dark-theme', themeKey, savedTheme);

    const savedDaltonic = localStorage.getItem(daltonicKey) === 'true';
    daltonicToggle.checked = savedDaltonic;
    setClassAndStorage(body, 'daltonic-mode', daltonicKey, savedDaltonic);
    
    const savedContraste = localStorage.getItem(contrasteKey) === 'true';
    contrasteToggle.checked = savedContraste;
    setClassAndStorage(body, 'contraste-mode', contrasteKey, savedContraste);

    // Listeners
    acessibilidadeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        acessibilidadeMenu.classList.toggle('show');
    });

    themeToggle.addEventListener('change', () => setClassAndStorage(body, 'dark-theme', themeKey, themeToggle.checked));
    daltonicToggle.addEventListener('change', () => setClassAndStorage(body, 'daltonic-mode', daltonicKey, daltonicToggle.checked));
    contrasteToggle.addEventListener('change', () => setClassAndStorage(body, 'contraste-mode', contrasteKey, contrasteToggle.checked));
    translateToggle.addEventListener('change', () => {
        
        // Encontra o menu <select> escondido do Google

        waitForGoogleTranslateSelect((googleSelect) => {
    if (translateToggle.checked) {
        googleSelect.value = 'en';
    } else {
        googleSelect.value = 'pt';
    }
    googleSelect.dispatchEvent(new Event('change'));
});


        if (translateToggle.checked) {
            // Se o toggle for ATIVADO (Inglês)
            googleSelect.value = 'en'; // Muda o valor do select do Google para 'en'
        } else {
            // Se o toggle for DESATIVADO (Português)
            googleSelect.value = 'pt'; // Muda o valor para 'pt'
        }
        
        // Dispara o evento 'change' no select do Google para ele fazer a tradução
        googleSelect.dispatchEvent(new Event('change'));
    });

    window.addEventListener('click', (e) => {
        if (acessibilidadeMenu.classList.contains('show') && !acessibilidadeMenu.contains(e.target)) {
            acessibilidadeMenu.classList.remove('show');
        }
    });
    
    acessibilidadeMenu.addEventListener('click', (e) => e.stopPropagation());
}

/**
 * 3. INICIA O MODAL "QUERO ADOTAR"
 * Controla a lógica de abrir, fechar e validar o formulário.
 */
function initializeModal() {
    const modal = document.getElementById('adoption-modal');
    if (!modal) return; 

    const closeButtons = modal.querySelectorAll('.modal-close');
    const form = document.getElementById('adoption-form');
    const successMessage = document.getElementById('modal-success-content');
    const formContent = document.getElementById('modal-form-content');
    const nomeInput = document.getElementById('nome');
    const whatsappInput = document.getElementById('whatsapp');
    const emailInput = document.getElementById('email');

    // Função para abrir o modal
    window.openAdoptionModal = (petId) => {
        if (typeof allPets === 'undefined') {
            alert("Erro: O banco de dados de animais (database.js) não foi carregado. Verifique a ordem dos scripts.");
            return;
        }
        const pet = allPets.find(p => p.id === petId);
        if (!pet) {
            alert("Erro: Animal não encontrado no banco de dados!");
            return;
        }

        // Reseta o formulário
        form.reset();
        clearErrors([nomeInput, whatsappInput, emailInput]);
        successMessage.style.display = 'none';
        successMessage.setAttribute('aria-hidden', 'true');
        formContent.style.display = 'block';
        formContent.setAttribute('aria-hidden', 'false');

        document.getElementById('pet-id-input').value = pet.id;
        document.getElementById('pet-name-modal').textContent = pet.nome;

        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
        nomeInput.focus(); 
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; 
    }

    closeButtons.forEach(button => button.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Validação
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }
    function clearErrors(inputs) {
        inputs.forEach(input => {
            if(input) {
                const formGroup = input.parentElement;
                const errorEl = formGroup.querySelector('.error-message');
                if(errorEl) errorEl.style.display = 'none';
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        clearErrors([nomeInput, whatsappInput, emailInput]);

        if (nomeInput.value.trim() === "") {
            showError(nomeInput, "O campo Nome é obrigatório.");
            isValid = false;
        }
        if (whatsappInput.value.trim() === "") {
            showError(whatsappInput, "O campo WhatsApp é obrigatório.");
            isValid = false;
        }
        if (emailInput.value.trim() === "") {
            showError(emailInput, "O campo E-mail é obrigatório.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, "Por favor, insira um e-mail válido.");
            isValid = false;
        }

        if (isValid) {
            console.log("Formulário de adoção enviado!");
            formContent.style.display = 'none';
            formContent.setAttribute('aria-hidden', 'true');
            successMessage.style.display = 'block';
            successMessage.setAttribute('aria-hidden', 'false');
            successMessage.querySelector('button.modal-close').focus();
        }
    });
}

/**
 * 4. ATIVA OS BOTÕES ESTÁTICOS DO 'QUERO ADOTAR' (Somente no index.html)
 * Isso é para fazer os botões do seu grid estático funcionarem.
 */
function initializeStaticIndexButtons() {
    const staticGrid = document.querySelector('.animal-grid:not(#featured-pets-grid)');
    if (!staticGrid) return; // Se não for o index.html, sai

    // Espera o database.js carregar
    if (typeof allPets === 'undefined') {
        console.warn("database.js ainda não carregou, tentando conectar botões estáticos novamente em 1s...");
        setTimeout(initializeStaticIndexButtons, 1000); // Tenta de novo
        return;
    }

    staticGrid.querySelectorAll('.btn-adopt').forEach(button => {
        const card = button.closest('.animal-card');
        if (!card) return;
        
        const petName = card.querySelector('h3').textContent.trim();
        const pet = allPets.find(p => p.nome.toLowerCase() === petName.toLowerCase());
        
        if (pet) {
            // Se achou o pet, conecta o botão ao modal
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.openAdoptionModal(pet.id);
            });
        } else {
            // Se não achou (ex: "Sem Nome"), desabilita o botão
            console.warn(`Pet estático "${petName}" não encontrado no database.js`);
            button.disabled = true;
            button.textContent = "Indisponível";
        }
    });
}

/**
 * 5. NOVO: INICIA O MODAL "DOAÇÃO VOLUNTÁRIA"
 * Controla a lógica do novo formulário de doação.
 */
function initializeDonateModal() {
    const btnOpen = document.getElementById('btn-open-donate-modal');
    const modal = document.getElementById('donate-modal');
    if (!btnOpen || !modal) return;

    const closeButtons = modal.querySelectorAll('.modal-close');
    const form = document.getElementById('donate-form');
    const formContent = document.getElementById('donate-form-content');
    const successMessage = document.getElementById('donate-success-message');

    const ongContainer = document.getElementById('ong-options-container'); // container inteiro das ongs
    const amountBtns = form.querySelectorAll('.donate-amount-btn');
    const customAmount = document.getElementById('custom-amount');
    const ongError = form.querySelector('.error-message[data-field="donate-ong"]');
    const amountError = form.querySelector('.error-message[data-field="donate-amount"]');

    /* -----------------------
       Cria o control segmentado PetLar / ONGs
       ----------------------- */
    (function createSegmentedControl() {
        if (form.querySelector('.segmented')) return;

        const container = document.createElement('div');
        container.className = 'form-group';

        const label = document.createElement('div');
        label.className = 'form-label';
        label.textContent = 'Escolha uma opção:';
        container.appendChild(label);

        const seg = document.createElement('div');
        seg.className = 'segmented';

        const btnPet = document.createElement('button');
        btnPet.type = 'button';
        btnPet.textContent = 'Doar para a PetLar';

        const btnOng = document.createElement('button');
        btnOng.type = 'button';
        btnOng.textContent = 'Doar para ONGs parceiras';

        seg.appendChild(btnPet);
        seg.appendChild(btnOng);
        container.appendChild(seg);

        // inserir no topo do formContent
        formContent.insertBefore(container, formContent.firstChild);

        // estado inicial
        btnPet.classList.add('active');
        if (ongContainer) ongContainer.classList.remove('show'); // garante que ongs ficam ocultas

        // eventos
        btnPet.addEventListener('click', () => {
            btnPet.classList.add('active');
            btnOng.classList.remove('active');
            if (ongContainer) {
                ongContainer.classList.remove('show'); // oculta o bloco de ONGs
            }
            if (ongError) { ongError.style.display = 'none'; ongError.textContent = ''; }
        });

        btnOng.addEventListener('click', () => {
            btnOng.classList.add('active');
            btnPet.classList.remove('active');
            if (ongContainer) {
                ongContainer.classList.add('show'); // mostra o bloco de ONGs
            }
        });

        // expor referências para uso posterior no form
        form._segmentedPetBtn = btnPet;
        form._segmentedOngBtn = btnOng;
    })();

    /* -----------------------
       Melhora as opções de ONG — APLICAR APENAS AOS LABELS QUE CONTÊM INPUT
       (isso evita que o label \"Selecione a ONG:\" seja transformado em botão)
       ----------------------- */
    (function enhanceOngOptions() {
        if (!ongContainer) return;
        // procura só labels que tenham input[type="radio"]
        const allLabels = ongContainer.querySelectorAll('label');
        allLabels.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (!input) {
                // este é o label de título (ex: "Selecione a ONG:"), deixa como texto normal
                label.classList.remove('ong-option'); // garante que não tenha estilo de botão
                label.style.cursor = 'default';
                return;
            }
            // labels que *possuem* input: torná-las blocos clicáveis maiores
            label.classList.add('ong-option');
            label.style.userSelect = 'none';
            // melhorar a acessibilidade: garantir que clicar no label marca o radio
            label.addEventListener('click', () => {
                // limpar visual de seleção das outras labels
                allLabels.forEach(l => {
                    const i = l.querySelector('input[type="radio"]');
                    if (i) l.classList.remove('selected-ong');
                });
                label.classList.add('selected-ong');
                // marcar o radio (some browsers já fazem isso via label, mas garantimos)
                input.checked = true;
            });
        });
        // por segurança, esconder o container de ongs por padrão (se não estiver já)
        if (!ongContainer.classList.contains('show')) {
            ongContainer.style.display = 'none';
        } else {
            ongContainer.style.display = ''; // reset caso fosse mostrado via html
        }

        // observar mudanças na classe 'show' para fazer display block/none (para animação sem quebrar layout)
        const observer = new MutationObserver(() => {
            if (ongContainer.classList.contains('show')) {
                ongContainer.style.display = '';
            } else {
                ongContainer.style.display = 'none';
            }
        });
        observer.observe(ongContainer, { attributes: true, attributeFilter: ['class'] });
    })();

    /* -----------------------
       Comportamento dos botões de valor
       ----------------------- */
    amountBtns.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (customAmount) customAmount.value = '';
            if (amountError) { amountError.style.display = 'none'; amountError.textContent = ''; }
            showSelectedBadge(btn.textContent.trim());
        });
    });

    if (customAmount) {
        customAmount.addEventListener('input', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            hideSelectedBadge();
            if (amountError) { amountError.style.display = 'none'; amountError.textContent = ''; }
        });
    }

    function showSelectedBadge(text) {
        let badge = form.querySelector('.selected-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'selected-badge';
            form.querySelector('.modal-body').appendChild(badge);
        }
        badge.textContent = 'Valor selecionado: ' + text;
        badge.classList.add('show');
    }
    function hideSelectedBadge() {
        const badge = form.querySelector('.selected-badge');
        if (badge) badge.classList.remove('show');
    }

    /* -----------------------
       abrir/fechar modal
       ----------------------- */
    function openDonateModal() {
        form.reset();
        amountBtns.forEach(btn => btn.classList.remove('active'));
        hideSelectedBadge();

        // garantir estado inicial: PetLar ativo e ONGs escondidas
        const petBtn = form._segmentedPetBtn;
        const ongBtn = form._segmentedOngBtn;
        if (petBtn && ongBtn) {
            petBtn.classList.add('active');
            ongBtn.classList.remove('active');
        }
        if (ongContainer) {
            ongContainer.classList.remove('show'); // oculta o bloco de ongs
        }
        if (amountError) { amountError.style.display = 'none'; amountError.textContent = ''; }
        if (ongError) { ongError.style.display = 'none'; ongError.textContent = ''; }

        formContent.style.display = 'block';
        successMessage.style.display = 'none';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btnOpen.addEventListener('click', (e) => { e.preventDefault(); openDonateModal(); });
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    /* -----------------------
       submit validacao
       ----------------------- */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const ongBtn = form._segmentedOngBtn;
        const isOngSelected = ongBtn && ongBtn.classList.contains('active');

        if (isOngSelected) {
            const selectedOng = form.querySelector('input[name="donate-ong"]:checked');
            if (!selectedOng) {
                if (ongError) { ongError.textContent = 'Por favor, selecione uma ONG.'; ongError.style.display = 'block'; }
                isValid = false;
            }
        }

        const selectedAmountBtn = form.querySelector('.donate-amount-btn.active');
        const customAmountValue = (customAmount && customAmount.value) ? parseFloat(customAmount.value) : null;
        if (!selectedAmountBtn && (!customAmountValue || customAmountValue < 1)) {
            if (amountError) { amountError.textContent = 'Por favor, selecione ou digite um valor válido.'; amountError.style.display = 'block'; }
            isValid = false;
        }

        if (isValid) {
            formContent.style.display = 'none';
            successMessage.style.display = 'block';
            modal.querySelector('.modal-close').focus();
            console.log('Doação enviada (mock).');
        }
    });
}



// --- CORREÇÃO DE TRADUÇÃO GOOGLE ---
function waitForGoogleTranslateSelect(callback) {
    const interval = setInterval(() => {
        const googleSelect = document.querySelector('#google_translate_element select');
        if (googleSelect) {
            clearInterval(interval);
            callback(googleSelect);
        }
    }, 500); // checa a cada meio segundo
}

// quando o site terminar de carregar, aguardamos o select aparecer
document.addEventListener("DOMContentLoaded", () => {
    waitForGoogleTranslateSelect((googleSelect) => {
        console.log("Google Tradutor carregado!");
    });
});
