let mensagens = []
let nome;
let para = "Todos"
let texto;
let tipo = "message"
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

function login() {
    // let promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
    // promise.then(entrar);
    // promise.catch(tratarFalha)
    nome = document.querySelector(".usuario").value
    console.log(nome)
    let novoAcesso = {
        name: nome
    };
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoAcesso);
    promise.then(buscarMensagens)
    promise.catch(tratarFalha)
}

// function criarUsuario(resposta) {
//     let status = resposta.status;
//     console.log(resposta.status);
//     if (status === 400) {

//     } else {
//         buscarMensagens()
//     }           
// }

function outroNome() {
    alert("Digite outro nome")
    console.log("Digite outro nome")
    document.querySelector("input").value = ""
    document.querySelector("input").placeholder = "Digite outro nome..."

}

function sair() {
    window.location.reload()
    console.log("saiu");
}

function buscarMensagens() {
    let promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMensagens);
    promise.catch(tratarFalha);
}

function carregarMensagens(response) {
    mensagens = response.data;
    //console.log(response.status);
    // console.log (mensagens)
    renderizarMensagens()
}

function renderizarMensagens() {
    document.querySelector(".login").classList.add("esconder");
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
    setInterval(buscarMensagens, 10000);
    // LEMBRAR DE MUDAR O TEMPO DE RELOAD!!!!!
    //setInterval(adicionarMensagens, 3000); 
}

setInterval(manterConexao, 5000)

function manterConexao() {
    console.log(nome)
    let manterAcesso = {
        name: nome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", manterAcesso);
    promise.then(console.log("Acesso Mantido"));

}

function enviarMensagem() {
    texto = document.querySelector(".texto").value
    console.log(texto)    

    let mensagem = {
        from: nome,
        to: para,
        text: texto,
        type: tipo
    };
    console.log(mensagem)

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(apagarMensagem);

}

function apagarMensagem() {
    document.querySelector(".texto").value = ""    
}


// function adicionarMensagens () {
//     let promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
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
    let statusCode = erroMensagens.response.status;
    console.log(statusCode);
    if (statusCode === 400) {
        outroNome()
    }
}