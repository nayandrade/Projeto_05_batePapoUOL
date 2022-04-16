let mensagens = []
let usuarios = []
let nome;
let para = "Todos"
let texto;
let tipo = "message"
// let mensagensNovas = []

function mostrarMenu() {
    document.querySelector("menu").classList.add("show-menu");
    document.querySelector("menu").addEventListener("mouseleave", esconderMenu)
    document.querySelector(".sombra").classList.add("show-menu");
    //console.log("apareceu")
}

function esconderMenu() {
    document.querySelector("menu").classList.remove("show-menu");
    document.querySelector(".sombra").classList.remove("show-menu");
    //console.log("sumiu");
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
    promise.then(buscarUsuarios)
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
    document.querySelector(".usuario").value = ""
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

        } else if ((mensagens[i].type === "private_message") && ((mensagens[i].to === nome) || (mensagens[i].to === "Todos"))) {
            mensagem.innerHTML += `<div class="mensagem-privada"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`

        } else if (mensagens[i].type === "status") {
            mensagem.innerHTML += `<div class="status"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p></div>`

        } else if (mensagens[i].type === "private_message") {
            //console.log(`${mensagens[i].time} ${mensagens[i].from} reservadamente para ${mensagens[i].to}: ${mensagens[i].text}`)
        }
    }
    document.querySelector(".container").lastChild.scrollIntoView()
    setInterval(buscarMensagens, 3000);
    setInterval(manterConexao, 5000)
    // LEMBRAR DE MUDAR O TEMPO DE RELOAD!!!!!
    //setInterval(adicionarMensagens, 3000); 
}



function manterConexao() {
    let manterAcesso = {
        name: nome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", manterAcesso);
    promise.then(console.log("Acesso Mantido"));

}

function enviarMensagem() {
    texto = document.querySelector(".texto").value

    let mensagem = {
        from: nome,
        to: para,
        text: texto,
        type: tipo
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(apagarMensagem);
    promise.catch(sair)

}

function apagarMensagem() {
    document.querySelector(".texto").value = ""
}

function escolherDestino(elemento) {
    let check = document
        .querySelector(".visibilidade")
        .querySelector(".check")

    if (check !== null) {
        check.classList.remove("check");
    }
    elemento.classList.add("check")
    console.log(check)
}

function mensagemPublica() {
    tipo = "message"
    console.log(tipo)

}      

function mensagemPrivada() {
    tipo = "private_message"
    console.log(tipo)

}    

// function escolherVisibilidade(elemento) {
//     elemento = tipoMensagem
//     console.log(tipoMensagem)

//     let visibilidade = document
//         .querySelector(".check-oculto")
//         .querySelector(".mostrar-check");

//     if (visibilidade !== null) {
//         visibilidade.classList.remove("mostrar-check");
//     }
//     elemento.lastElementChild.classList.add("mostrar-check");

// }

function buscarUsuarios() {
    let promise = axios("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(carregarUsuarios);
    promise.catch(tratarFalha);
}

function carregarUsuarios(response) {
    usuarios = response.data;
    console.log(response.status);
    console.log(usuarios)
    renderizarUsuarios()
}

function renderizarUsuarios() {
    let usuario = document.querySelector("ul");
    console.log(usuario);
    usuario.innerHTML = `
        <li class="usuario" onclick="escolherUsuario('Todos')">
            <div class="sub-destino">
                <ion-icon name="people"></ion-icon>
                <h3>
                    Todos
                </h3>
            </div>
            <img class="check-oculto" src="img/Vector.png" alt="">
        </li>
    `
    for (let i = 0; i < usuarios.length; i++) {
        usuario.innerHTML += `
            
            <li class="usuario" onclick="escolherUsuario('${usuarios[i].name}')">
                <div class="sub-destino">
                    <ion-icon name="person-circle"></ion-icon>
                    <h3>
                    ${usuarios[i].name}
                    </h3>
                </div>
                <img class="destino-oculto" src="img/Vector.png" alt="">
            </li>        
        `
    }
    setInterval(buscarUsuarios, 10000)
}

function escolherUsuario(elemento) {
    para = String(elemento)
    console.log(elemento)


    // let check = document
    //     .querySelector(".destino-oculto")
    //     .querySelector(".mostrar-check");

    // if (check !== null) {
    //     check.classList.remove("mostrar-check");
    // }
    // elemento.lastElementChild.classList.add("mostrar-check");
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let btn = document.querySelector(".enviar-mensagem");
      
      btn.click();
      console.log(btn)
    
    }
  });




function tratarFalha(erroMensagens) {
    let statusCode = erroMensagens.response.status;
    console.log(statusCode);
    if (statusCode === 400) {
        outroNome()
    }
}
