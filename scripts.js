let mensagens = []
// let mensagensNovas = []

function mostrarMenu() {
    document.querySelector("menu").classList.add("show-menu");
    document.querySelector("menu").addEventListener("mouseleave", esconderMenu)
    document.querySelector(".sombra").classList.add("show-menu");
    console.log("apareceu")
}

function esconderMenu() {
    document.querySelector("menu").classList.remove("show-menu");
    document.querySelector(".sombra").classList.remove("show-menu");
    console.log("sumiu");
}

function entrar() {
    document.querySelector(".login").classList.add("esconder");
    buscarMensagens();
    console.log("entrou")
}

function sair() {
    window.location.reload()
    console.log("saiu");

}

function buscarMensagens() {
    const promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMensagens);
    promise.catch(tratarFalha);
}

function carregarMensagens(response) {
    mensagens = response.data;
    // console.log(response.status);
    // console.log (mensagens)
    renderizarMensagens()
}

function renderizarMensagens() {
    let mensagem = document.querySelector(".container")

    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type === "message") {
            mensagem.innerHTML += `<div class="mensagem"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`
            
        } else if (mensagens[i].type === "private_message") {
            mensagem.innerHTML += `<div class="mensagem-privada"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`
            
        } else if (mensagens[i].type === "status") {
            mensagem.innerHTML += `<div class="status"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p></div>`
            
        }   
    }
    document.querySelector(".container").lastChild.scrollIntoView()
    setInterval(buscarMensagens, 3000);
    //setInterval(adicionarMensagens, 3000);
}

// function adicionarMensagens () {
//     const promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
//     promise.then(carregarMensagensNovamente);
//     console.log("vai adicionar")

// }

// function carregarMensagensNovamente(response) {    
//     mensagensNovas = response.data;
//     console.log (mensagensNovas)
//     if (mensagensNovas.length > mensagens.length) {
//         for (let i = mensagens.length; i < mensagensNovas.length; i++) {
//             if (mensagens[i].type === "message") {
//                 mensagem.innerHTML += `<div class="mensagem"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`
                
//             } else if (mensagens[i].type === "private_message") {
//                 mensagem.innerHTML += `<div class="mensagem-privada"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`
                
//             } else if (mensagens[i].type === "status") {
//                 mensagem.innerHTML += `<div class="status"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p></div>`
//             }   
//         }
//         console.log("adicionou") 
//     }
//     document.querySelector(".container").lastChild.scrollIntoView();
//     setInterval(adicionarMensagens, 3000);
     
// }

function tratarFalha(erroMensagens) {
    const statusCode = erroMensagens.response.status;
    console.log(statusCode);
    }