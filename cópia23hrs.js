let id;
let respostas = [];
let contador = 0;
let teste = 0; 

function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(displayMessages);
}
getData();

function getDataScreen2(id) {


    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(displayMessages2);

    promise.catch(errorFunction)
}
function errorFunction(erro) {
    alert("Vish, falhou a parada! Tente novamente!");

}
function displayMessages2(answers) {

    let answersreceived = answers.data
    teste = answersreceived.questions.length
  
    let screenTwoInfos = document.querySelector(".quizz-container");
    let quantity = answersreceived.questions
    /*resultAppears(quantity);*/
    
    screenTwoInfos.innerHTML += `

            <div class="banner">
            <img src="${answersreceived.image}" alt="">
            <p>${answersreceived.title}</p>
        </div>`

    for (let i = 0; i < answersreceived.questions.length; i++) {

        /*answersreceived.questions[i].answers.sort(() => Math.random() - 0.5);*/

        screenTwoInfos.innerHTML += `

        <div class="quizz-card">
            <div class="header-quizz-card">
                <p>${answersreceived.questions[i].title}</p>
            </div>
            <section class="quizz-options">
                <div onclick=(answerChoosed(this)) class="item ">
                    <img src='${answersreceived.questions[i].answers[i].image}' alt="">
                    <p>${answersreceived.questions[i].answers[i].text}</p>
                    <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                </div>
                <div onclick=(answerChoosed(this)) class="item ">
                    <img src=${answersreceived.questions[i].answers[i].image} alt="">
                    <p>${answersreceived.questions[i].answers[i].text}</p>
                    <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                </div>
                <div onclick=(answerChoosed(this)) class="item ">
                <img src=${answersreceived.questions[i].answers[i].image} alt="">
                <p>${answersreceived.questions[i].answers[i].text}</p>
                <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
            </div>
                 <div onclick=(answerChoosed(this)) class="item ">
                 <img src=${answersreceived.questions[i].answers[i].image} alt="">
                 <p>${answersreceived.questions[i].answers[i].text}</p>
                 <p class="status display ">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
             </div>
            </section>
        </div>
        
    `
    }
}
function validationFinalScreen(contador) {    
    if(teste === contador){
        alert("OK")
        ///chamar função que ativa ultima tela 
    }
}
/////FUNÇÃO QUE TORNA BRANCO O FUNDO AO CLICAR NAS RESPOSTAS
function answerChoosed(respostaEscolhida) {
    contador++
    validationFinalScreen(contador)
    respostaEscolhida.classList.add("selected")
    respostaEscolhida.classList.remove("display")

    const pai = respostaEscolhida.parentNode
    const pailist = pai.querySelectorAll("div")
    colorCheck(pailist)

    pailist.forEach(Element => {
       
        if (!(Element.classList.contains("selected"))) {
            Element.classList.add("disabled")
            Element.classList.remove("display")
        }
    })
}

    ////FUNÇÃO PARA CHECK DE COR E ADICIONAR 
function colorCheck(pailist){ ///O problema é que o Element não me permite acessar a classe que representa se é a resposta correta ou não e quando tento retorna undefined como na linha 99
    pailist.forEach(Element => {
        const teste = Element.querySelector(".status").innerText
        console.log(teste)
        if (teste === "true") {
            Element.classList.add("correct")
        } else {
            Element.classList.add("wrong")
        }
    })
}
////FUNÇÃO APRA EXIBIR OS RESULTADOS QUANDO FINALIZADO O QUIZZ
/*
function resultAppears(validationNumber) {
               
    let pai = respostaEscolhida.parentNode
    let result = document.querySelector(".quizz-container");
    pai.forEach(Element => {
        console.log(Element)
        if ((Element.classList.contains("selected"))) {
            result.innerHTML +=
                `<div class="quizz-card result-card active">
                 <div class="header-quizz-card">
                     <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p>
                 </div>
                 <section class="quizz-options">
                     <div class="item result">
                         <div class="result-image" style="background-image: url('./assets/gramdpa.png');">
                             
                         </div>
                         <p>
                             Parabéns Potterhead! Bem-vindx a Hogwarts,
                             aproveite o loop infinito de comida e clique no 
                             botão abaixo para usar o vira-tempo e reiniciar este teste.
                         </p>
                     </div>
                 </section>
             </div> 
             
             <div class="footer-quizz active">
                 <button onclick="restartQuizz()">Reiniciar Quizz</button>
                 <button onclick="backToHome()">Voltar pra home</button>
             </div>`

        }
    }) 
            }



resultAppears()*/
////SET INTERVAL PARA TENTAR SCROLLAR A FUNÇÃO PARA PROXIMA PERGUNTA 2S DEPOIS DE CLICADA 
setInterval(scroll2s, 100000)
function scroll2s() {
    window.scroll(0, 20) ////Arrumar a rolagem para baixo
}

function displayMessages(answers) {

    let answersreceived = answers.data

    let allQuizzes = document.querySelector(".list-all-quizzes");
    let screenTwoInfos = document.querySelector(".quizz-container");

    array = answers.data
    for (let i = 0; i < answersreceived.length; i++) {

        allQuizzes.innerHTML += `
        <div class="quizz" id="${answersreceived[i].id}"  onclick="showScreenQuizz(this)" style="background-image: linear-gradient(to bottom, transparent 0%,#000 100%), url(${answersreceived[i].image});">            
        <h1>"${answersreceived[i].title}"</h1>
            </div>
    `
    }
}


/*FUNÇAO DE JOGAR O QUIZZ*/
function showScreenQuizz(title) {
    ///Need to do a function that receives the click and add a class active to .quizz-container
    let screenOne = document.querySelector(".screen1");
    let screenTwo = document.querySelector(".quizz-container");
    screenOne.classList.remove("active")
    screenTwo.classList.add("active")

    id = title.id

    getDataScreen2(id)
}

/*FUNÇÃO DE CRIAR QUIZZ*/

function handleCreateQuizz() {
    let screenOne = document.querySelector('.screen1');
    let screenThree = document.querySelector('.create-quizz-container');

    screenOne.classList.remove('active');
    screenThree.classList.add('active');
}
/*FUNÇÃO DE RETORNAR PARA TELA PRINCIPAL*/

function backToHome() {
    ///Caso já se tenha criado algum quizz deve se ir para 2º tela da tela 1
    let screenOne = document.querySelector('.screen1');
    let screenTwo = document.querySelector(".quizz-container");

    screenOne.classList.add('active');
    screenTwo.classList.remove('active');
}
///FUNÇÃO PARA REINICIAR O QUIZZ SCROLLA PARA O INICIO DA TELA
function restartQuizz() {
    window.scroll(0, 0)
    window.location.reload();
}