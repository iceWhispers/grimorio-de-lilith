
document.addEventListener("DOMContentLoaded", () => {
  const veilBtn = document.getElementById("veil-button");
  const veilChapter = document.getElementById("veiled-chapter");
  const closeBtn = document.querySelector(".close-chapter");
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("audio-toggle");

  veilBtn.addEventListener("click", () => {
    veilChapter.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    veilChapter.style.display = "none";
  });

  audio.volume = 0.4;
  toggle.addEventListener("click", () => {
    audio.muted = !audio.muted;
    toggle.textContent = audio.muted ? "🔊 Som" : "🔇 Som";
  });
});
