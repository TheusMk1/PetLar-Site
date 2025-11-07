// --- acessibilidade.js ---
// Leitura automática do site inteiro (modo acessibilidade total)

let leituraAtiva = false;
let pausado = false;
let utterance = null;

function ativarLeitura() {
  // Se ainda não ativou, inicia
  if (!leituraAtiva) {
    leituraAtiva = true;
    pausado = false;
    alert("🔊 Leitura ativada — o site será lido em voz alta.");
    iniciarLeitura();
  } else {
    // Se já estava lendo, alterna pausa/retomar
    if (pausado) {
      window.speechSynthesis.resume();
      pausado = false;
      alert("▶️ Leitura retomada");
    } else {
      window.speechSynthesis.pause();
      pausado = true;
      alert("⏸️ Leitura pausada");
    }
  }
}

function iniciarLeitura() {
  // Cancela qualquer leitura anterior
  window.speechSynthesis.cancel();

  // Pega todo o texto visível da página
  const texto = extrairTexto(document.body);

  if (!texto.trim()) {
    alert("Nenhum texto encontrado na página para leitura.");
    return;
  }

  utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Quando terminar, redefine
  utterance.onend = () => {
    leituraAtiva = false;
    pausado = false;
    alert("✅ Leitura concluída!");
  };

  // Fala o texto
  window.speechSynthesis.speak(utterance);
}

// Função que extrai texto visível do site
function extrairTexto(elemento) {
  // Ignora tags não visíveis
  const tagsIgnoradas = ["SCRIPT", "STYLE", "NOSCRIPT"];
  if (tagsIgnoradas.includes(elemento.tagName)) return "";

  let texto = "";
  for (let node of elemento.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      texto += node.textContent + " ";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Ignora elementos invisíveis
      const estilo = window.getComputedStyle(node);
      if (estilo.display !== "none" && estilo.visibility !== "hidden") {
        texto += extrairTexto(node);
      }
    }
  }
  return texto;
}
