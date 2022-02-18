//const URLTEST = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))|(http(s?):\/\/[a-z]?[0-9]\/)")
const URLTEST = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)


function handleGetInfos(containerInputs) {
    let contentInputs = document.querySelector(`.${containerInputs}`);
    let inputs = contentInputs.querySelectorAll('input');
    let contInputNoFilled = 0

    inputs.forEach(input => contInputNoFilled += verifyInputIsFilled(input));

    if (contInputNoFilled > 0) {
        window.alert("um ou mais campos não foi preenchido corretamente")
    }else{
        nextScreenData();
    }

    console.log(contInputNoFilled);
}

function verifyInputIsFilled(input){
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

function verifyType(input) {
    if (input.type === 'text') {
        let value = input.value;
        if (value.length <20 || value.length >65) {
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


function nextScreenData(){
    let subScreenOne = document.querySelector('#sub-screen1');
    let subScreenTwo = document.querySelector('#sub-screen2');

    if (subScreenOne.classList.contains('active')) {
        subScreenOne.classList.remove('active');
        subScreenTwo.classList.add('active');
    }
}