let id;
let index = 0;
let indexcount;
let counting;
let data;
let quantity;
let counter = 0;
let sumShowed;
let level;

function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(displayMessages);
}

getData();

function getDataScreen2(id) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(displayMessages2);
    promise.catch(errorFunction);
}
function errorFunction(erro) {
    alert("Vish, falhou a parada! Tente novamente!");
}
function displayMessages2(answers){
    let answersreceived = answers.data;
    indexcount = answersreceived.questions;
    data = answersreceived;
    let screenTwoInfos = document.querySelector(".quizz-container");

    screenTwoInfos.innerHTML += `
        <div class="banner">
            <img src="${answersreceived.image}" alt="">
            <p>${answersreceived.title}</p>
        </div>
    `

    for (let i = 0; i < answersreceived.questions.length; i++) {
        answersreceived.questions[i].answers.sort(() => Math.random() - 0.5);
        screenTwoInfos.innerHTML += `
            <div class="quizz-card" data-identifier="quizz-card">
                <div class="header-quizz-card">
                    <p>${answersreceived.questions[i].title}</p>
                </div>
                <section class="quizz-options" data-identifier="question">
                    <div onclick=(answerChoosed(this)) class="item" data-identifier="answer">
                        <img src='${answersreceived.questions[i].answers[i].image}' alt="">
                        <p>${answersreceived.questions[i].answers[i].text}</p>
                        <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                    </div>
                    <div onclick=(answerChoosed(this)) class="item " data-identifier="answer">
                        <img src=${answersreceived.questions[i].answers[i].image} alt="">
                        <p>${answersreceived.questions[i].answers[i].text}</p>
                        <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                    </div>
                    <div onclick=(answerChoosed(this)) class="item " data-identifier="answer">
                        <img src=${answersreceived.questions[i].answers[i].image} alt="">
                        <p>${answersreceived.questions[i].answers[i].text}</p>
                        <p class="status display">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                    </div>
                    <div onclick=(answerChoosed(this)) class="item " data-identifier="answer">
                        <img src=${answersreceived.questions[i].answers[i].image} alt="">
                        <p>${answersreceived.questions[i].answers[i].text}</p>
                        <p class="status display ">${answersreceived.questions[i].answers[i].isCorrectAnswer}</p>
                    </div>
                </section>
            </div>
        `
    }

    quantity = answersreceived.questions;
    validationFinalScreen();
    levelSum(quantity);
}

function validationFinalScreen(index) {
    if (indexcount.length === index) {
        resultAppears();
    }
}

function answerChoosed(answerpicked) {
    counting = answerpicked;
    index++;
    validationFinalScreen(index);
    answerpicked.classList.add("selected");
    answerpicked.classList.remove("display");

    const dad = answerpicked.parentNode;
    const dadlist = dad.querySelectorAll("div");
    colorCheck(dadlist);
    levelSum(dadlist);

    dadlist.forEach(Element => {
        Element.classList.add("selected-question");
        if (!(Element.classList.contains("selected"))) {
            Element.classList.add("disabled");
            Element.classList.remove("display");
        }
    })
}

function colorCheck(received) {
    received.forEach(Element => {
        const status = Element.querySelector(".status").innerText;

        if (status==="true") {
            Element.classList.add("correct");
            counter = 1;
        } else {
            Element.classList.add("wrong");
        }
    })
    levelSum(counter);
}

function resultAppears() {
    let result = document.querySelector(".quizz-container");

    result.innerHTML =
        `<div class="quizz-card result-card active" data-identifier="quizz-result">
                <div class="header-quizz-card">
                    <p>${sumShowed}% de acerto: Você é um mestre, cara! nivel ${level}!</p>
                </div>
                <section class="quizz-options">
                    <div class="item result">
                        <img  class="result-image" src=${data.image} alt="">
                        </div>
                        <p>
                        ${data.title}
                        </p>
                    </div>
                </section>
            </div> 
            
            <div class="footer-quizz active">
                <button onclick="restartQuizz()">Reiniciar Quizz</button>
                <button onclick="backToHome()">Voltar pra home</button>
            </div>`
    levelSum();
}

function levelSum(Element) {
    let account = Number((counter/indexcount.length)*100);
    
    sumShowed = account.toFixed(2);
    if(account < 50){ 
        level = 1;
    } else {
        if (account > 50)
        level = 2;
    }
}

function displayMessages(answers) {

    let answersreceived = answers.data;
    let allQuizzes = document.querySelector(".list-all-quizzes");
    array = answers.data;

    for (let i = 0; i < answersreceived.length; i++) {
        allQuizzes.innerHTML += `
        <div class="quizz" id="${answersreceived[i].id}"  onclick="showScreenQuizz(this)" style="background-image: linear-gradient(to bottom, transparent 0%,#000 100%), url(${answersreceived[i].image});">            
            <h1>"${answersreceived[i].title}"</h1>
        </div>
    `}
}


function showScreenQuizz(title) {
    let screenOne = document.querySelector(".screen1");
    let screenTwo = document.querySelector(".quizz-container");
    screenOne.classList.remove("active");
    screenTwo.classList.add("active");
    
    id = title.id;
    getDataScreen2(id);
}

function handleCreateQuizz() {
    let screenOne = document.querySelector('.screen1');
    let screenThree = document.querySelector('.create-quizz-container');

    screenOne.classList.remove('active');
    screenThree.classList.add('active');
}

function backToHome() {
    let screenOne = document.querySelector('.screen1');
    let screenTwo = document.querySelector(".quizz-container");
    let result = document.querySelector(".quizz-card");
    let result2 = document.querySelector(".footer-quizz");

    result2.classList.remove('active');
    screenOne.classList.add('active');
    screenTwo.classList.remove('active');
    result.classList.remove('active');
    window.location.reload();
}

function restartQuizz() {
    let test = document.querySelector(".quizz-card");
    let footer = document.querySelector(".footer-quizz");
    let resultcard = document.querySelector(".result-card");

    test.classList.remove("active");
    resultcard.classList.remove('active');
    footer.classList.remove('active');

    window.scroll(0, 0);
    getDataScreen2(id);
    index = 0;
}