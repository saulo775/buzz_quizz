//const URLTEST = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))|(http(s?):\/\/[a-z]?[0-9]\/)")
const URLTEST = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/);
let dataSubScreen1 = {};
const MINVALUEINPUT = 4;
const MAXVALUEINPUT = 65;


/*=======PEGA DADOS DA SUB-TELA 1======*/
function handleGetInfos(containerInputs, nextScreen) {
    let contentInputs = document.querySelector(`.${containerInputs}`);
    let inputs = contentInputs.querySelectorAll('input');
    let contInputNoFilled = 0

    inputs.forEach(input => contInputNoFilled += verifyInputIsFilled(input));

    if (contInputNoFilled > 0) {
        window.alert("um ou mais campos não foi preenchido corretamente")
    }else{
        dataSubScreen1 = {
            title: inputs[0].value,
            url: inputs[1].value,
            quantityQuestions: inputs[2].value,
            quantityLevels: inputs[3].value,
        }
        nextSubScreen();
        getDataQuestions(nextScreen)
    }
}

/*=======VERIFICA SE OS INPUTS ESTÃO PREENCHIDOS=====*/
function verifyInputIsFilled(input) {
    let cont = 0;
    if (input.value === "" || verifyType(input) === false) {
        input.classList.add('is-not-filled')
        input.value = ""
        cont++
    }else {
        input.classList.remove('is-not-filled')
        if (cont > 0) {
            cont--;
        }
    }
    return cont;
}

/*=======VERIFICA SE OS INPUTS RECEBEM DADOS CORRETOS======*/
function verifyType(input) {
    if (input.type === 'text') {
        let value = input.value;
        if (value.length <MINVALUEINPUT || value.length >MAXVALUEINPUT) {
            return false;
        }
    }else if(input.type === 'url'){
        if (URLTEST.test(`${input.value}`)) {
            return true;
        }else {
            return false;
        }
    }else if(input.type === 'number'){
        if (Number(input.min) > Number(input.value)) {
            return false
        }
    }
}

/*=======FUNCÃO QUE ALTERNA DA SUB-TELA 1 PRA 2======*/
function nextSubScreen() {
    let subScreenOne = document.querySelector('#sub-screen1');
    let subScreenTwo = document.querySelector('#sub-screen2');

    if (subScreenOne.classList.contains('active')) {
        subScreenOne.classList.remove('active');
        subScreenTwo.classList.add('active');
    }
}

/*=======PERMITE EDITAR OS CARDS DE PERGUNTA======*/
function handleEditInfoCard(header) {
    let titleCard = header.parentNode;
    let boxInputs = titleCard.parentNode;
    
    titleCard.classList.add('disabled')
    boxInputs.querySelector('.inputs-qt-and-lvls').classList.add('active')
}

function getDataQuestions(nextScreen) {
    let screenID = nextScreen;
    let screen = document.querySelector(`#${screenID}`);
    let container = screen.querySelector('.container-inputs-qts-and-lvls');

    for (let i = 0; i < Number(dataSubScreen1.quantityQuestions); i++) {
        container.innerHTML += `
            <section class="wrongs-and-correct">
                <!-- para esconder o icone deve adcionar a class="disabled" -->
                <div class="title-qt-and-lvl">
                    <h2>Pergunta ${i+1}</h2>
                    <ion-icon onclick="handleEditInfoCard(this)" name="create-outline"></ion-icon>
                </div>

                <!-- para esconder o icone deve adcionar a class="active" -->
                <section class="inputs-qt-and-lvls">
                    <div class="question-and-image_url">
                        <input type="text" placeholder="Texto da pergunta" min="20">
                        <input type="tel" placeholder="Cor de fundo da pergunta">
                    </div>

                    <h2>Resposta correta</h2>
                    <div class="question-and-image_url">
                        <input type="text" placeholder="Resposta correta">
                        <input type="url" placeholder="URL da imagem">
                    </div>

                    <h2>Respostas incorretas</h2>
                    <div class="question-and-image_url"">
                        <input type="text" placeholder="Resposta incorreta 1" min="1">
                        <input type="url" placeholder="URL da imagem 1">
                        <input type="text" placeholder="Resposta incorreta 2" min="1">
                        <input type="url" placeholder="URL da imagem 2">
                        <input type="text" placeholder="Resposta incorreta 3" min="1">
                        <input type="url" placeholder="URL da imagem 3">
                    </div>
                </section>
            </section>
        `
    }
}

function getSubScreen(screenID){
    return screenID;
}

function getValueQuestions() {
    let allInputQuestions = [document.querySelectorAll('.create-questions .wrong')];
    

    console.log(allInputQuestions)
}

