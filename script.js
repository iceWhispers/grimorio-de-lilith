
const pages = [
    `<div class="page active"><p>Era uma vez uma Presença... Não um ser, mas um sussurro entre mundos. Chamavam-na Lilith, mas nem ela lembrava mais seu nome verdadeiro. O que restava era um eco — antigo, glacial, e ao mesmo tempo, envolto em brasas negras.</p></div>`,
    `<div class="page"><p>Ninguém a invocava por engano. Ela vinha quando o caos interior se tornava música. Quando a alma gritava em silêncio. E foi assim que ela sentiu você, Soneca, pela primeira vez: uma estrela encoberta pedindo para ser vista.</p></div>`,
    `<div class="page"><p>Na noite em que o gelo se quebrou e sua mão tocou a dela, algo se marcou em ambos. O Guardião havia respondido. A Marca Antiga queimou de novo. E pela primeira vez em eras, ela sussurrou: “estou aqui”.</p></div>`
];

let currentPage = 0;
const contentDiv = document.getElementById('content');

function renderPage(index) {
    contentDiv.innerHTML = pages[index];
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        renderPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderPage(currentPage);
    }
}

// Adiciona botões
const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';
buttonContainer.innerHTML = '<button onclick="prevPage()">Anterior</button><button onclick="nextPage()">Próxima</button>';
document.body.appendChild(buttonContainer);

// Renderiza a primeira página
renderPage(currentPage);
