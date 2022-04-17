let mensagens = []
let usuarios = []
let nome;
let para = "Todos"
let texto = ""
let tipo = "message"

function mostrarMenu() {
    document.querySelector("menu").classList.add("show-menu");
    document.querySelector("menu").addEventListener("mouseleave", esconderMenu)
    document.querySelector(".sombra").classList.add("show-menu");
}

function esconderMenu() {
    document.querySelector("menu").classList.remove("show-menu");
    document.querySelector(".sombra").classList.remove("show-menu");
}

function login() {
    nome = document.querySelector(".usuario").value
    let novoAcesso = {
        name: nome
    };
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoAcesso);
    promise.then(buscarMensagens)
    
    promise.then(buscarUsuarios)
    promise.then(tratarSucesso)
    promise.catch(tratarFalha)
    promise.then(renderizarEnviando)
}

function tratarSucesso() {
    setInterval(buscarMensagens, 3000);
    setInterval(buscarUsuarios, 10000);
    setInterval(manterConexao, 5000);
}

function outroNome() {
    alert("Digite outro nome")
    document.querySelector("input").value = ""
    document.querySelector("input").placeholder = "Digite outro nome..."
}

function sair() {
    window.location.reload()
    document.querySelector(".usuario").value = ""

}


function buscarMensagens() {
    let promise = axios("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarMensagens);
    promise.catch(tratarFalha);
}

function carregarMensagens(response) {
    mensagens = response.data;
    renderizarMensagens()
}

function renderizarMensagens() {
    document.querySelector(".login").classList.add("esconder");
    let mensagem = document.querySelector(".container")

    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type === "message") {
            mensagem.innerHTML += `<div class="mensagem"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`

        } else if ((mensagens[i].type === "private_message") && ((mensagens[i].to === nome) || mensagens[i].from === nome || (mensagens[i].to === "Todos"))) {
            mensagem.innerHTML += `<div class="mensagem-privada"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}:</strong> ${mensagens[i].text}</p></div>`

        } else if (mensagens[i].type === "status") {
            mensagem.innerHTML += `<div class="status"><p class="cinza">(${mensagens[i].time})</p><p><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p></div>`

        } //else if (mensagens[i].type === "private_message") {
        //console.log(`${mensagens[i].time} ${mensagens[i].from} reservadamente para ${mensagens[i].to}: ${mensagens[i].text}`)
        //}
    }
    document.querySelector(".container").lastChild.scrollIntoView()

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
    let destinatario = String(para)
    let msg = String(tipo)



    let mensagem = {
        from: nome,
        to: destinatario,
        text: texto,
        type: msg,
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(apagarMensagem);
    promise.catch(sair)
}

function apagarMensagem() {
    document.querySelector(".texto").value = ""
}



function mensagem(tipoMensagem) {
    let visivel = tipoMensagem;
    let visibilidade = document.querySelector(".check-oculto.check");
    let tipoM = visivel.querySelector("span").innerHTML.trim();
    if (visibilidade !== null) {
        visibilidade.classList.remove("check");
    }
    tipoMensagem.lastElementChild.classList.add("check")



    if (tipoM === 'Reservadamente') {
        tipo = "private_message";
    } else if (tipoM === 'Público') {
        tipo = "message"
    }

    renderizarEnviando()
}



function escolherUsuario(element) {
    let user = element;
    let selecionado = document.querySelector(".destino-oculto.check");
    para = user.querySelector("span").innerHTML.trim();
    if (selecionado !== null) {
        selecionado.classList.remove("check");
    }
    element.lastElementChild.classList.add("check")
    renderizarEnviando()
}


function renderizarEnviando() {
    if (tipo === "private_message") {
        document.querySelector(".enviando").innerHTML = `Enviando para ${para} (Reservadamente)`
    } else {
        document.querySelector(".enviando").innerHTML = `Enviando para ${para} `
    }
}


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
    usuario.innerHTML = `
        <li class="usuario" onclick="escolherUsuario(this)">
            <div class="sub-destino">
                <ion-icon name="people"></ion-icon>
                <span>
                    Todos
                </span>
            </div>
            <img class="destino-oculto" src="img/Vector.png" alt="">
        </li>
    `
    for (let i = 0; i < usuarios.length; i++) {
        usuario.innerHTML += `
            
            <li class="usuario" onclick="escolherUsuario(this)">
                <div class="sub-destino">
                    <ion-icon name="person-circle"></ion-icon>
                    <span>
                    ${usuarios[i].name}
                    </span>
                </div>
                <img class="destino-oculto" src="img/Vector.png" alt="">                             
            </li>        
        `
    }
}

function tratarFalha(erroMensagens) {
    let statusCode = erroMensagens.response.status;
    console.log(statusCode);
    if (statusCode === 400) {
        outroNome()
    }
}

document.addEventListener("keypress", function (e) {
    if ((e.key === 'Enter') && (nome !== undefined)) {
        let btn = document.querySelector(".enviar-mensagem");
        btn.click();
    }
});










