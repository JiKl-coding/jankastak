/* ------------------------------------- EVENT LISTENERS ------------------------------------- */ 
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".load-bio").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/bio.html");
    });
});
/* ---------------------------------------- FUNCTIONS ---------------------------------------- */ 
function loadContent(page) {
    let content = document.getElementById("content");
    content.style.opacity = 0; 

    fetch(page)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            setTimeout(() => content.style.opacity = 1, 100);
        })
        .catch(error => console.error("Chyba při načítání obsahu:", error));
}
