function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(renderizarMensagens);
}

function renderizarMensagens(promise) {
    
    let respostas= promise.data
    console.log(respostas.length);

    for (let i = 0; i < respostas.length; i++) {
        console.log(respostas[i])
    }
}

getData()