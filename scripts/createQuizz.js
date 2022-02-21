//const URLTEST = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))|(http(s?):\/\/[a-z]?[0-9]\/)")
const URLTEST = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/);
const COLORTEST = new RegExp('^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})|([0-9a-fA-F]{3})$');
let dataSubScreen1 = {};
let dataSubScreen2 = [];
let dataSubScreen3 = [];
const MINVALUEINPUT = 4;
const MAXVALUEINPUT = 65;
const MINVALUETEXTAREA = 6;


/*=======PEGA DADOS DA SUB-TELA 1======*/
function handleGetBasicInfos(containerInputs, nextScreen) {
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
        displayInputQuestions(nextScreen)
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
        if (input.name == 'percentage') {
            if (Number(input.value >0) && Number(input.value < 100)) {
                return true;
            }else{
                return false;
            }
        }

        if (Number(input.min) > Number(input.value)) {
            return false
        }
    }else if(input.type === 'tel') {
        if (COLORTEST.test(`${input.value}`)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

/*=======FUNCÃO QUE ALTERNA DA SUB-TELA 1 PRA 2======*/
function nextSubScreen() {
    let subScreenOne = document.querySelector('#sub-screen1');
    let subScreenTwo = document.querySelector('#sub-screen2');
    let subScreenThree = document.querySelector('#sub-screen3');
    

    if (subScreenOne.classList.contains('active')) {
        subScreenOne.classList.remove('active');
        subScreenTwo.classList.add('active');
    }else if (subScreenTwo.classList.contains('active')) {
        subScreenTwo.classList.remove('active');
        subScreenThree.classList.add('active');
    }
}

/*=======PERMITE EDITAR OS CARDS DE PERGUNTA======*/
function handleEditInfoCard(header) {
    let titleCard = header.parentNode;
    let boxInputs = titleCard.parentNode;
    
    titleCard.classList.add('disabled')
    boxInputs.querySelector('.inputs-qt-and-lvls').classList.add('active')
}

/*=======MOSTRA NA TELA AS QUESTOES======*/
function displayInputQuestions(nextScreen) {
    let screenID = nextScreen;
    let screen = document.querySelector(`#${screenID}`);

    for (let i = 0; i < Number(dataSubScreen1.quantityQuestions); i++) {
        screen.innerHTML += `
            <section class="box-inputs">
                <!-- para esconder o icone deve adcionar a class="disabled" -->
                <div class="title-qt-and-lvl">
                    <h2>Pergunta ${i+1}</h2>
                    <ion-icon onclick="handleEditInfoCard(this)" name="create-outline" role="img" class="md hydrated" aria-label="create outline"></ion-icon>
                </div>

                <!-- para esconder o icone deve adcionar a class="active" -->
                <section class="inputs-qt-and-lvls">
                    <input type="text" placeholder="Texto da pergunta" min="20">
                    <input type="tel" placeholder="Cor de fundo da pergunta">

                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta">
                    <input type="url" placeholder="URL da imagem">

                    <h2>Respostas incorretas</h2>
                    <input type="text" placeholder="Resposta incorreta 1" min="1" class='wrong'>
                    <input type="url" placeholder="URL da imagem 1" class='wrong'>

                    <input type="text" placeholder="Resposta incorreta 2" min="1" class='wrong'>
                    <input type="url" placeholder="URL da imagem 2" class='wrong'>

                    <input type="text" placeholder="Resposta incorreta 3" min="1" class='wrong'>
                    <input type="url" placeholder="URL da imagem 3" class='wrong'>
                </section>
            </section>
        `

    }
    screen.innerHTML += `
        <button class="btn-main" onclick="handleGetQuestionsInfo('sub-screen2')">
            Prosseguir para criar niveis
        </button>
    `
}

/*=======PEGA DADOS DA TELA DE QUESTOES======*/
function handleGetQuestionsInfo(subScreen) {
    let screen = document.querySelector(`#${subScreen}`);
    let inputs = screen.querySelectorAll('input');
    let contInputNoFilled = 0;
    let questions = screen.querySelectorAll('.inputs-qt-and-lvls');
    
    inputs.forEach(input => contInputNoFilled += verifyInputIsFilled(input));

    if (contInputNoFilled > 0) {
        window.alert("um ou mais campos não foi preenchido corretamente")
    }else{
        for (let i = 0; i < questions.length; i++) {
            let input = questions[i].querySelectorAll('input');

            let data = {
                title: input[0].value,
                color: input[1].value,
                answers: [
                    {
                        text: input[2].value,
                        image: input[3].value,
                        isCorrectAnswer: true,
                    },
                    {
                        text: input[4].value,
                        image: input[5].value,
                        isCorrectAnswer: false,
                    },
                    {
                        text: input[6].value,
                        image: input[7].value,
                        isCorrectAnswer: false,
                    },
                    {
                        text: input[8].value,
                        image: input[9].value,
                        isCorrectAnswer: false,
                    },
                ]
            }

            dataSubScreen2.push(data)
            // console.log(data)
        }
        nextSubScreen();
        displayInputLevels()
    }
}

/*=======VERIFICA SE OS INPUTS DAS QUESTOES ESTÃO VAZIOS======*/
// function verifyInputQuestionsIsFilled(input) {
//     let cont = 0;

//     if (input.value === "" || verifyType(input) === false) {
//         input.classList.add('is-not-filled')
//         input.value = ""
//         cont++
//     }else {
//         input.classList.remove('is-not-filled')
//         if (cont > 0) {
//             cont--;
//         }
//     }
//     return cont;
// }

function getSubScreen(screenID){
    return screenID;
}

// function getValueQuestions() {
//     let allInputQuestions = [document.querySelectorAll('.create-questions .wrong')];
    

//     console.log(allInputQuestions)
// }


function displayInputLevels() {
    //let screenID = nextScreen;
    let screen = document.querySelector('#sub-screen3');
    console.log(screen)

    for (let i = 0; i < Number(dataSubScreen1.quantityLevels); i++) {
        screen.innerHTML += `
            <section class="box-inputs">
                <!-- para esconder o icone deve adcionar a class="disabled" -->
                <div class="title-qt-and-lvl">
                    <h2>Nivel ${i+1}</h2>
                    <ion-icon onclick="handleEditInfoCard(this)" name="create-outline" role="img" class="md hydrated" aria-label="create outline"></ion-icon>
                </div>

                <!-- para esconder o icone deve adcionar a class="active" -->
                <section class="inputs-qt-and-lvls">
                    <input type="text" placeholder="Título do nível">
                    <input type="number" name="percentage" id="" placeholder="% de acerto mínima">
                    <input type="url" name="url-image-level" id="" placeholder="URL da imagem do nível">
                    <textarea min="6" name="description of level" id="" cols="30" rows="10" placeholder="Descrição do nível"></textarea>
                </section>
            </section>
        `

    }
    screen.innerHTML += `
        <button class="btn-main" onclick="handleGetLevelsInfo('sub-screen3')">
            Prosseguir para criar niveis
        </button>
    `
}


function handleGetLevelsInfo() {
    let screen = document.querySelector('#sub-screen3');
    let inputs = screen.querySelectorAll('input');
    let textarea = screen.querySelectorAll('textarea');
    let contInputNoFilled = 0;
    let contTextAreaNoFilled = 0;
    
    inputs.forEach(input => contInputNoFilled += verifyInputIsFilled(input));
    textarea.forEach(textarea => contTextAreaNoFilled += verifyTextareaIsFilled(textarea));
    console.log(contTextAreaNoFilled);

    if (contInputNoFilled > 0 || contTextAreaNoFilled > 0) {
        window.alert("um ou mais campos não foi preenchido corretamente")
     }//else{
    //     for (let i = 0; i < questions.length; i++) {
    //         let input = questions[i].querySelectorAll('input');

    //         let data = {
    //             title: input[0].value,
    //             color: input[1].value,
    //             answers: [
    //                 {
    //                     text: input[2].value,
    //                     image: input[3].value,
    //                     isCorrectAnswer: true,
    //                 },
    //                 {
    //                     text: input[4].value,
    //                     image: input[5].value,
    //                     isCorrectAnswer: false,
    //                 },
    //                 {
    //                     text: input[6].value,
    //                     image: input[7].value,
    //                     isCorrectAnswer: false,
    //                 },
    //                 {
    //                     text: input[8].value,
    //                     image: input[9].value,
    //                     isCorrectAnswer: false,
    //                 },
    //             ]
    //         }

    //         dataSubScreen2.push(data)
    //         // console.log(data)
    //     }
    //     nextSubScreen();
    //     displayInputLevels()
    // }
}


function verifyTextareaIsFilled(textarea) {
    let cont = 0;
    if (textarea.value === "" || verifyTypeTextarea(textarea) === false) {
        textarea.classList.add('is-not-filled')
        textarea.value = ""
        cont++
    }else {
        textarea.classList.remove('is-not-filled')
        if (cont > 0) {
            cont--;
        }
    }
    return cont;
}

function verifyTypeTextarea(textarea) {
    if (textarea.value.length < MINVALUETEXTAREA) {
        return false
    }
}