function mostrarMenu() {
    document.querySelector("menu").classList.add("show-menu");
    document.querySelector("menu").addEventListener("mouseleave", esconderMenu)
    document.querySelector(".sombra").classList.add("show-menu");
    console.log("apareceu")
}

function esconderMenu() {    
    document.querySelector("menu").classList.remove("show-menu");
    document.querySelector(".sombra").classList.remove("show-menu");
    console.log("sumiu")
}

function entrar () {
    document.querySelector(".login").classList.add("esconder");
}