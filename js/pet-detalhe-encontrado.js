// /js/pet-detalhe-encontrado.js
document.addEventListener('DOMContentLoaded', () => {
  // pegar id do pet pela URL
  const params = new URLSearchParams(window.location.search);
  const petId = parseInt(params.get('id'), 10);

  // valida se foundPets existe
  if (typeof foundPets === 'undefined') {
    alert("Erro: O banco de dados de pets encontrados (database-encontrados.js) não foi carregado. Verifique a ordem e o caminho dos scripts.");
    document.querySelector('.main-detalhe').innerHTML = "<h1>Erro ao carregar banco de dados!</h1>";
    return;
  }

  // encontrar pet por id
  const pet = foundPets.find(p => p.id === petId) || foundPets[0]; // fallback para o primeiro pet se id inválido

  if (!pet) {
    document.querySelector('.main-detalhe').innerHTML = "<h1>Pet não encontrado!</h1><p>O animal que você está procurando não existe ou foi removido.</p>";
    return;
  }

  // preencher dados na página
  document.title = `${pet.nome} (Encontrado) - PetLar`;
  document.getElementById('breadcrumb-tipo').textContent = pet.tipo === 'cachorro' ? 'Cachorros' : 'Gatos';
  document.getElementById('breadcrumb-nome').textContent = pet.nome;
  document.getElementById('pet-name-title').textContent = `${pet.tipo === 'cachorro' ? 'Cachorro' : 'Gato'} ${pet.nome} (Encontrado)`;

  const headerTags = document.getElementById('header-tags-container');
  headerTags.innerHTML = `<span>${pet.sexo}</span> | <span>${pet.porte}</span> | <span>${pet.idadeTexto}</span>`;

  document.getElementById('pet-raca').textContent = pet.raca || 'Não informado';
  document.getElementById('pet-localizacao').textContent = pet.localizacao || 'Não informado';
  document.getElementById('pet-sexo').textContent = pet.sexo || 'Não informado';
  document.getElementById('pet-codigo').textContent = pet.codigo || '---';
  document.getElementById('pet-historia').textContent = pet.historia || 'Sem história disponível.';
  document.getElementById('doador-nome').textContent = pet.doador?.nome || '---';
  document.getElementById('doador-email').textContent = pet.doador?.email || '---';
  document.getElementById('doador-telefone').textContent = pet.doador?.telefone || '---';
  document.getElementById('pet-descricao-curta').textContent = pet.descricaoCurta || '';

  // share links
  const pageUrl = window.location.href;
  const shareText = `Olha esse pet que foi encontrado: ${pet.nome}! ${pageUrl}`;
  const fb = document.getElementById('share-fb');
  const wa = document.getElementById('share-wa');
  const shareLinkBtn = document.getElementById('share-link');
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  if (wa) wa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  if (shareLinkBtn) shareLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      // visual feedback simples
      Swal.fire({ icon: 'success', title: 'Link copiado!', toast: true, position: 'top-end', showConfirmButton:false, timer:1500 });
    }).catch(()=> alert('Não foi possível copiar o link'));
  });

  // criar tags
  function createTags(containerId, tagsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!tagsArray || tagsArray.length === 0) {
      container.innerHTML = "<span class='char-tag-none' style='font-style: italic; opacity: 0.7;'>Não informado</span>";
      return;
    }
    tagsArray.forEach(tag => {
      const el = document.createElement('span');
      el.className = 'char-tag';
      el.textContent = tag;
      container.appendChild(el);
    });
  }
  createTags('tags-cuidados', pet.cuidados);
  createTags('tags-temperamento', pet.temperamento);
  createTags('tags-viveBemCom', pet.viveBemCom);
  createTags('tags-sociavelCom', pet.sociavelCom);

  // galeria
  const mainImage = document.getElementById('main-pet-image');
  const thumbnailContainer = document.getElementById('thumbnail-container');
  const galleryCounter = document.getElementById('gallery-counter');
  const btnPrev = document.getElementById('gallery-prev');
  const btnNext = document.getElementById('gallery-next');
  let currentImageIndex = 0;
  const galleryImages = Array.isArray(pet.gallery) && pet.gallery.length ? pet.gallery : ["https://via.placeholder.com/900x600/CCCCCC/555555?text=Foto+indisponível"];

  function updateGallery() {
    mainImage.src = galleryImages[currentImageIndex];
    galleryCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    btnPrev.style.display = currentImageIndex === 0 ? 'none' : 'block';
    btnNext.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'block';

    if (thumbnailContainer) {
      const thumbs = thumbnailContainer.querySelectorAll('.thumbnail-img');
      thumbs.forEach((t, i) => t.classList.toggle('active', i === currentImageIndex));
    }
  }

  // montar miniaturas
  if (thumbnailContainer) {
    thumbnailContainer.innerHTML = '';
    galleryImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${pet.nome} - foto ${i + 1}`;
      img.className = 'thumbnail-img';
      img.dataset.index = i;
      img.addEventListener('click', () => { currentImageIndex = i; updateGallery(); });
      thumbnailContainer.appendChild(img);
    });
  }

  btnPrev.addEventListener('click', ()=> { if(currentImageIndex>0){ currentImageIndex--; updateGallery(); }});
  btnNext.addEventListener('click', ()=> { if(currentImageIndex<galleryImages.length-1){ currentImageIndex++; updateGallery(); }});
  updateGallery();

  // botão "Ver todos" roxo (ajusta link)
  const verTodosBtn = document.querySelector('.btn-contact-purple');
  if (verTodosBtn) {
    verTodosBtn.href = 'pages/encontrados.html';
    verTodosBtn.textContent = 'Ver todos os Pets Encontrados';
  }

  // botão denunciar
  const denunciarBtn = document.querySelector('.btn-denunciar');
  if (denunciarBtn) denunciarBtn.addEventListener('click', () => {
    Swal.fire({ icon:'info', title:'Obrigado', text:'Sua denúncia será analisada.', confirmButtonColor: '#6c63ff' });
  });

  // ---------------------
  // Modal Contatar quem encontrou (novo, exclusivo)
  // ---------------------
  const modalContato = document.getElementById('contatoModal');
  const btnContato = document.getElementById('btn-contatar-quem-encontrou'); // usa o id do botão no HTML
  const spanFechar = modalContato?.querySelector('.close-contato');
  const btnFechar = document.getElementById('fecharBtn');
  const formContato = document.getElementById('formContato');

  if (btnContato && modalContato) {
    btnContato.addEventListener('click', () => {
      modalContato.style.display = 'flex';
      modalContato.setAttribute('aria-hidden', 'false');
    });
  }

  if (spanFechar) {
    spanFechar.addEventListener('click', () => {
      modalContato.style.display = 'none';
      modalContato.setAttribute('aria-hidden', 'true');
    });
  }
  if (btnFechar) {
    btnFechar.addEventListener('click', () => {
      modalContato.style.display = 'none';
      modalContato.setAttribute('aria-hidden', 'true');
    });
  }

  // fechar clicando fora
  window.addEventListener('click', (e) => {
    if (e.target === modalContato) {
      modalContato.style.display = 'none';
      modalContato.setAttribute('aria-hidden', 'true');
    }
  });

  // envio do formulário de contato
  if (formContato) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();

      // validação mínima
      const nome = document.getElementById('contato-nome').value.trim();
      const telefone = document.getElementById('contato-telefone').value.trim();
      const email = document.getElementById('contato-email').value.trim();

      if (!nome || !telefone || !email) {
        Swal.fire({ icon:'warning', title:'Preencha todos os campos', text:'Por favor preencha Nome, WhatsApp/Telefone e E-mail.', confirmButtonColor:'#6c63ff' });
        return;
      }

      // aqui você pode enviar via fetch para backend / API ou processar localmente
      // exemplo: enviar para um endpoint (comentado)
      // fetch('/api/contato-encontrou', { method:'POST', body: JSON.stringify({ petId:pet.id, nome, telefone, email }), headers:{'Content-Type':'application/json'}})

      // exibir pop-up estilizado de confirmação
      Swal.fire({
        icon: 'success',
        title: 'Mensagem enviada!',
        text: 'Seu contato foi enviado com sucesso. Aguarde retorno em breve.',
        confirmButtonColor: '#6c63ff',
        confirmButtonText: 'OK'
      });

      formContato.reset();
      modalContato.style.display = 'none';
      modalContato.setAttribute('aria-hidden', 'true');
    });
  }

});
