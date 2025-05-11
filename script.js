
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute("href").substring(1);
        fetch(`trechos/${sectionId}.txt`)
            .then(res => res.text())
            .then(text => {
                document.getElementById("dynamic-content").innerText = text;
            });
    });
});
