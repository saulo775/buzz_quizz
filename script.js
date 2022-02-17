
function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(displayMessages);
}

function displayMessages(anwsers) {

    let anwsersreceived = anwsers.data
    let q1 = document.querySelector(".quizzes");
    
    for (let i = 0; i < anwsersreceived.length; i++) { 
        q1.innerHTML += `
        <div class="result-image"  style="background-image: linear-gradient(to bottom, transparent 0%,#000 95%), url(${anwsersreceived[i].image});">            
        <h1 onclick="">"${anwsersreceived[i].title}"</h1>
            </div>
    `}
}


getData();


/*FUNÇÃO DE CRIAR QUIZZ*/

function handleCreateQuizz() {
    let screenOne = document.querySelector('.screen1');
    let screenThree = document.querySelector('.create-quizz-container');

    screenOne.classList.remove('active');
    screenThree.classList.add('active');

    console.log(screenOne);
    console.log(screenThree);
}