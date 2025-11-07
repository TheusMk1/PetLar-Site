// /js/encontrei-pet.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('encontrei-pet-form');
    if (!form) return; // Se não for a página correta, não faz nada

    const steps = Array.from(form.querySelectorAll('.form-step'));
    const nextButtons = form.querySelectorAll('.btn-next');
    const prevButtons = form.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.progress-step');
    const successMessage = document.getElementById('form-success-message');

    let currentStep = 1;

    // --- Função para mostrar o passo correto ---
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
        
        // Atualiza a barra de progresso (agora com 5 passos)
        progressSteps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        currentStep = stepNumber;
        window.scrollTo(0, 0); // Rola para o topo a cada passo
    }

    // --- Função para mostrar erro ---
    function showError(field, message) {
         const errorEl = form.querySelector(`.error-message[data-field="${field}"]`);
         if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
         }
    }
    
    // --- Função para limpar erros ---
    function clearErrors() {
        form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    // --- Validação ---
    function validateStep(stepNumber) {
        clearErrors();
        let isValid = true;

        if (stepNumber === 1) {
            const situacao = document.getElementById('pet-situacao').value;
            const especie = document.getElementById('pet-especie').value;
            const genero = document.getElementById('pet-genero').value;

            if (situacao === "") {
                showError('pet-situacao', "Por favor, selecione a situação.");
                isValid = false;
            }
            if (especie === "") {
                showError('pet-especie', "Por favor, selecione a espécie.");
                isValid = false;
            }
            if (genero === "") {
                showError('pet-genero', "Por favor, selecione o gênero.");
                isValid = false;
            }
        }

        if (stepNumber === 2) {
            const fotoInput = document.getElementById('pet-foto');
            if (fotoInput.files.length === 0) {
                showError('pet-foto', "Por favor, envie ao menos uma foto.");
                isValid = false;
            }
        }
        
        // Passo 3 e 4 são opcionais, não precisam de validação
        if (stepNumber === 3) {
            isValid = true;
        }
        if (stepNumber === 4) {
            isValid = true;
        }
        
        if (stepNumber === 5) {
             const nome = document.getElementById('doador-nome').value.trim();
             const email = document.getElementById('doador-email').value.trim();
             const tel = document.getElementById('doador-telefone').value.trim();
             
             if(nome === "") {
                showError('doador-nome', "O nome é obrigatório.");
                isValid = false;
             }
             if(tel === "") {
                showError('doador-telefone', "O telefone é obrigatório.");
                isValid = false;
             }
             
             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             if(email === "") {
                showError('doador-email', "O e-mail é obrigatório.");
                isValid = false;
             } else if (!emailRegex.test(email)) { 
                showError('doador-email', "Por favor, insira um e-mail válido.");
                isValid = false;
             }
        }

        return isValid;
    }

    // --- Listeners dos Botões Próximo ---
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    // --- Listeners dos Botões Voltar ---
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });

    // --- Listener de Envio (Finalizar) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real
        if (validateStep(5)) {
            // Simulação de envio
            console.log("Formulário 'Encontrei um Pet' enviado!");
            
            // Esconde o formulário e mostra a mensagem de sucesso
            form.style.display = 'none';
            document.querySelector('.progress-bar').style.display = 'none';
            document.querySelector('.form-container h1').style.display = 'none';
            document.querySelector('.form-container p').style.display = 'none';
            
            successMessage.style.display = 'block';
            window.scrollTo(0, 0); // Rola para o topo
        }
    });

    // --- Listener da Pré-visualização da Imagem ---
    const fotoInput = document.getElementById('pet-foto');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImage = previewContainer.querySelector('.image-preview-img');
    const previewText = previewContainer.querySelector('.image-preview-text');

    if (fotoInput) {
        fotoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                previewText.style.display = 'none';
                previewImage.style.display = 'block';
                
                reader.onload = function(e) {
                    previewImage.setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(file);
                
                clearErrors(); // Limpa o erro da foto
            }
        });
    }

    // Inicia no passo 1
    showStep(1);
});