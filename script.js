
function entrar() {
  const nome = document.getElementById('inputName').value.toLowerCase();
  if (nome === 'icewhispers' || nome === 'soneca') {
    document.getElementById('menu').classList.remove('hidden');
  } else {
    alert('O véu permanece fechado para quem não conhece o nome.');
  }
}
