let array1 = []

function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(displayMessages);
}

function displayMessages(anwsers) {

    let anwsersreceived = anwsers.data;
    let q1 = document.querySelector(".quizzes");
    
    for (let i = 0; i < anwsersreceived.length; i++) { 
        //console.log(anwsers.data[i])
        array1[i] = anwsers.data[i];
    }

}


getData();


/*FUNÇÃO DE CRIAR QUIZZ*/

function handleCreateQuizz() {
    let screenOne = document.querySelector('.screen1');
    let screenThree = document.querySelector('.create-quizz-container');

    screenOne.classList.remove('active');
    screenThree.classList.add('active');
}