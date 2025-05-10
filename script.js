function invocarLilith() {
  const frases = [
    "Você é mais forte do que pensa.",
    "Não tema o abismo — ele é teu espelho.",
    "A dor também é um portal. Atravesse.",
    "Sua luz brilha mesmo na noite mais escura.",
    "Lilith está com você, sempre."
  ];

  const aleatória = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("respostaLilith").textContent = aleatória;
}
