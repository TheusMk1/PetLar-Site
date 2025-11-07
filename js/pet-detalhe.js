// /JS/pet-detalhe.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Encontrar o ID do pet na URL
    const params = new URLSearchParams(window.location.search);
    const petId = parseInt(params.get('id'));

    // 2. Encontrar o pet no "banco de dados"
    const pet = allPets.find(p => p.id === petId);

    // 3. Se o pet não for encontrado, mostrar erro
    if (!pet) {
        document.querySelector('.main-detalhe').innerHTML = "<h1>Pet não encontrado!</h1><p>O animal que você está procurando não existe ou foi removido.</p>";
        return;
    }

    // 4. Preencher a página com os dados do pet
    
    // Título da Página
    document.title = `${pet.nome} - PetLar`;

    // Breadcrumbs
    document.getElementById('breadcrumb-tipo').textContent = pet.tipo === 'cachorro' ? 'Cachorros' : 'Gatos';
    document.getElementById('breadcrumb-nome').textContent = pet.nome;

    // Coluna de Informações (Direita)
    document.getElementById('pet-name-title').textContent = `${pet.tipo === 'cachorro' ? 'Cachorro' : 'Gato'} ${pet.nome} para doação`;
    const headerTags = document.getElementById('header-tags-container');
    headerTags.innerHTML = `
        <span>${pet.sexo}</span> |
        <span>${pet.porte}</span> |
        <span>${pet.idadeTexto}</span>
    `;
    document.getElementById('pet-raca').textContent = pet.raca;
    document.getElementById('pet-localizacao').textContent = pet.localizacao;
    document.getElementById('pet-sexo').textContent = pet.sexo;
    document.getElementById('pet-codigo').textContent = pet.codigo;

    // Botão "Quero Adotar" (conecta ao modal global)
    document.getElementById('btn-quero-adotar-detalhe').addEventListener('click', () => {
        if (window.openAdoptionModal) {
            window.openAdoptionModal(pet.id);
        }
    });

    // Botões de Compartilhar
    const pageUrl = window.location.href;
    const shareText = `Olha esse pet para adoção: ${pet.nome}! ${pageUrl}`;
    document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    document.getElementById('share-link').addEventListener('click', () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    });

    // Seção de História e Características
    document.getElementById('pet-historia').textContent = pet.historia;

    // Função para criar tags de características
    function createTags(containerId, tagsArray) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Limpa
        if (tagsArray.length === 0) {
            container.innerHTML = "<span class='char-tag-none'>Não informado</span>";
        }
        tagsArray.forEach(tag => {
            container.innerHTML += `<span class="char-tag">${tag}</span>`;
        });
    }

    createTags('tags-cuidados', pet.cuidados);
    createTags('tags-temperamento', pet.temperamento);
    createTags('tags-viveBemCom', pet.viveBemCom);
    createTags('tags-sociavelCom', pet.sociavelCom);

    // Seção de Contato
    document.getElementById('doador-nome').textContent = pet.doador.nome;
    document.getElementById('doador-email').textContent = pet.doador.email;
    document.getElementById('doador-telefone').textContent = pet.doador.telefone;
    document.getElementById('pet-descricao-curta').textContent = pet.descricaoCurta;

    // Botão Denunciar (Placeholder)
    document.querySelector('.btn-denunciar').addEventListener('click', () => {
        alert('Obrigado! Sua denúncia sobre este anúncio será analisada.');
    });

    // --- LÓGICA DA GALERIA DE FOTOS ---
    const mainImage = document.getElementById('main-pet-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const galleryCounter = document.getElementById('gallery-counter');
    const btnPrev = document.getElementById('gallery-prev');
    const btnNext = document.getElementById('gallery-next');
    
    let currentImageIndex = 0;
    const galleryImages = pet.gallery;

    function updateGallery() {
        // Atualiza imagem principal
        mainImage.src = galleryImages[currentImageIndex];
        
        // Atualiza contador
        galleryCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        
        // Atualiza botões
        btnPrev.style.display = currentImageIndex === 0 ? 'none' : 'block';
        btnNext.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'block';

        // Atualiza classe 'active' das miniaturas
        thumbnailContainer.querySelectorAll('.thumbnail-img').forEach((img, index) => {
            if (index === currentImageIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    // Criar miniaturas
    galleryImages.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${pet.nome} - foto ${index + 1}`;
        thumb.className = 'thumbnail-img';
        thumb.dataset.index = index;
        
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateGallery();
        });
        
        thumbnailContainer.appendChild(thumb);
    });
    
    // Listeners dos botões Próximo/Anterior
    btnPrev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateGallery();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentImageIndex < galleryImages.length - 1) {
            currentImageIndex++;
            updateGallery();
        }
    });

    // Carga inicial da galeria
    updateGallery();
});