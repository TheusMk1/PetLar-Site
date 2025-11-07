// Espera o HTML ser totalmente carregado para rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // A sua função de acessibilidade
    function initializeAppAccessibility() {
        const body = document.body;
        // IDs atualizados para bater com o JS
        const acessibilidadeBtn = document.getElementById('acessibilidade-btn');
        const acessibilidadeMenu = document.getElementById('acessibilidade-menu');
        const themeToggle = document.getElementById('checkbox');
        const daltonicToggle = document.getElementById('daltonic-toggle');
        const contrasteToggle = document.getElementById('contraste-toggle');

        if (!acessibilidadeBtn || !acessibilidadeMenu || !themeToggle || !daltonicToggle || !contrasteToggle) {
            console.warn("Elementos de acessibilidade não encontrados no header.");
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
        // Nomes das classes atualizados para 'dark-theme', 'daltonic-mode', 'contraste-mode'
        const savedTheme = localStorage.getItem(themeKey) === 'true';
        themeToggle.checked = savedTheme;
        setClassAndStorage(body, 'dark-theme', themeKey, savedTheme);

        const savedDaltonic = localStorage.getItem(daltonicKey) === 'true';
        daltonicToggle.checked = savedDaltonic;
        setClassAndStorage(body, 'daltonic-mode', daltonicKey, savedDaltonic);
        
        const savedContraste = localStorage.getItem(contrasteKey) === 'true';
        
        // ========== LINHA CORRIGIDA (de savedContaste para savedContraste) ==========
        contrasteToggle.checked = savedContraste; 
        // =========================================================================

        setClassAndStorage(body, 'contraste-mode', contrasteKey, savedContraste);

        // Listeners
        acessibilidadeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            // Usa a classe 'show' (definida no CSS novo)
            acessibilidadeMenu.classList.toggle('show');
        });

        // Nomes das classes atualizados
        themeToggle.addEventListener('change', () => setClassAndStorage(body, 'dark-theme', themeKey, themeToggle.checked));
        daltonicToggle.addEventListener('change', () => setClassAndStorage(body, 'daltonic-mode', daltonicKey, daltonicToggle.checked));
        contrasteToggle.addEventListener('change', () => setClassAndStorage(body, 'contraste-mode', contrasteKey, contrasteToggle.checked));

        // Fecha o menu se clicar fora
        window.addEventListener('click', (e) => {
            if (acessibilidadeMenu.classList.contains('show') && !acessibilidadeMenu.contains(e.target)) {
                acessibilidadeMenu.classList.remove('show');
            }
        });
        
        // Impede que o menu feche ao clicar dentro dele
        acessibilidadeMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    // Chama a função principal da acessibilidade
    initializeAppAccessibility();


    // ========== FUNÇÃO DE LEITOR DE TELA (com a correção anterior) ==========
    function initializeTextToSpeech() {
        const btnLeitor = document.getElementById('btn-leitor');
        const mainContent = document.querySelector('.page-container');

        if (!btnLeitor || !mainContent) {
            console.warn('Botão de leitor ou conteúdo principal não encontrado.');
            return;
        }

        // Verifica se o navegador suporta a API
        if (!('speechSynthesis' in window)) {
            console.warn('Navegador não suporta a API de Leitura (SpeechSynthesis).');
            btnLeitor.style.display = 'none'; // Esconde o botão se não for suportado
            return;
        }

        let utterance = null; // Para manter a referência da fala

        btnLeitor.addEventListener('click', () => {
            if (speechSynthesis.speaking) {
                // Se está falando, cancela
                speechSynthesis.cancel();
                
                // Reseta o ícone manualmente ao cancelar
                btnLeitor.innerHTML = '🔊<span class="tooltip-text">Ler a página</span>';

            } else {
                // Se não está falando, começa a ler
                
                // 1. Pega todos os elementos de texto legíveis do conteúdo principal
                const elementsToRead = mainContent.querySelectorAll('h2, h3, p');
                let textToRead = "";
                
                // 2. Constrói a string de leitura
                elementsToRead.forEach(el => {
                    // Adiciona um ponto final para pausas naturais entre elementos
                    textToRead += el.textContent.trim() + ". "; 
                });

                // 3. Cria o objeto de fala
                utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil
                utterance.rate = 1.0;     // Velocidade normal
                utterance.pitch = 1.0;    // Tom normal

                // 4. Quando a fala terminar naturalmente, reseta o botão
                utterance.onend = () => {
                    btnLeitor.innerHTML = '🔊<span class="tooltip-text">Ler a página</span>';
                };
                
                // 5. Inicia a fala
                speechSynthesis.speak(utterance);
                
                // 6. Atualiza o botão para o ícone de "Parar"
                btnLeitor.innerHTML = '⏹️<span class="tooltip-text">Parar leitura</span>';
            }
        });

        // Limpa a fala (impede que continue falando) se o usuário sair da página
        window.addEventListener('beforeunload', () => {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        });
    }

    // Chama a nova função de leitor de tela
    initializeTextToSpeech();
    // ===================================================

});