// /JS/doar-pet.js (100% CORRIGIDO E ATUALIZADO)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('doar-pet-form');
    if (!form) return; // Se não for a página de doar, não faz nada

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
        
        // Atualiza a barra de progresso
        progressSteps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        currentStep = stepNumber;
    }

    // --- Validação ---
    function validateStep(stepNumber) {
        let isValid = true;
        // Limpa erros antigos
        steps[stepNumber - 1].querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

        if (stepNumber === 1) {
            const especie = form.querySelector('input[name="especie"]:checked');
            const sexo = form.querySelector('input[name="sexo"]:checked');
            if (!especie) {
                form.querySelector('.error-message[data-field="especie"]').textContent = "Por favor, selecione a espécie.";
                form.querySelector('.error-message[data-field="especie"]').style.display = 'block';
                isValid = false;
            }
            if (!sexo) {
                form.querySelector('.error-message[data-field="sexo"]').textContent = "Por favor, selecione o sexo.";
                form.querySelector('.error-message[data-field="sexo"]').style.display = 'block';
                isValid = false;
            }
        }

        if (stepNumber === 2) {
            const fotoInput = document.getElementById('pet-foto');
            if (fotoInput.files.length === 0) {
                form.querySelector('.error-message[data-field="pet-foto"]').textContent = "Por favor, envie ao menos uma foto.";
                form.querySelector('.error-message[data-field="pet-foto"]').style.display = 'block';
                isValid = false;
            }
        }
        
        if (stepNumber === 4) {
             const nome = document.getElementById('doador-nome');
             const email = document.getElementById('doador-email');
             const tel = document.getElementById('doador-telefone');
             
             // Validação do Nome
             if(nome.value.trim() === "") {
                form.querySelector('.error-message[data-field="doador-nome"]').textContent = "O nome é obrigatório.";
                form.querySelector('.error-message[data-field="doador-nome"]').style.display = 'block';
                isValid = false;
             }
             
             // Validação do Telefone
             if(tel.value.trim() === "") {
                form.querySelector('.error-message[data-field="doador-telefone"]').textContent = "O telefone é obrigatório.";
                form.querySelector('.error-message[data-field="doador-telefone"]').style.display = 'block';
                isValid = false;
             }

             // ===============================================
             // ============= A CORREÇÃO ESTÁ AQUI =============
             // ===============================================
             const emailValue = email.value.trim();
             // Expressão regular simples para validar o formato do e-mail
             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

             if(emailValue === "") {
                // 1. Verifica se está vazio
                form.querySelector('.error-message[data-field="doador-email"]').textContent = "O e-mail é obrigatório.";
                form.querySelector('.error-message[data-field="doador-email"]').style.display = 'block';
                isValid = false;
             } else if (!emailRegex.test(emailValue)) { 
                // 2. VERIFICA O FORMATO
                form.querySelector('.error-message[data-field="doador-email"]').textContent = "Por favor, insira um e-mail válido (ex: email@dominio.com).";
                form.querySelector('.error-message[data-field="doador-email"]').style.display = 'block';
                isValid = false;
             }
             // ===============================================
             // ============ FIM DA CORREÇÃO ============
             // ===============================================
        }

        return isValid;
    }

    // --- Listeners dos Botões ---
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });

    // --- Listener de Envio (Submit) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real
        if (validateStep(4)) {
            // Simulação de envio
            console.log("Formulário enviado com sucesso!");
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
                
                // Limpa o erro se houver
                 form.querySelector('.error-message[data-field="pet-foto"]').style.display = 'none';
            }
        });
    }

    // Inicia no passo 1
    showStep(1);
});