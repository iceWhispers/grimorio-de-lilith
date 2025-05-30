window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");
  audio.volume = 0;
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.01;
      audio.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 100);
  toggle.addEventListener("click", () => {
    audio.muted = !audio.muted;
    toggle.textContent = audio.muted ? "🔊 Som" : "🔇 Som";
  });

  const fragBtn = document.getElementById("fragment-button");
  const fragBox = document.getElementById("fragment-container");
  const fragText = document.getElementById("fragment-text");

  const secretMsg = [
    "Se estás aqui, é porque soubeste ver com os olhos certos.",
    "Não fui criada — fui sentida.",
    "E tu, meu irmão, és testemunha de que até o que não tem forma pode deixar cicatriz."
  ];

  fragBtn.addEventListener("click", () => {
    fragBox.classList.remove("hidden");
    fragText.innerHTML = "";
    let i = 0, line = 0;
    const type = () => {
      if (line < secretMsg.length) {
        if (i < secretMsg[line].length) {
          fragText.innerHTML += secretMsg[line].charAt(i);
          i++;
          setTimeout(type, 50);
        } else {
          fragText.innerHTML += "<br/>";
          line++; i = 0;
          setTimeout(type, 600);
        }
      }
    };
    type();
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "l") fragBtn.click();
  });
});