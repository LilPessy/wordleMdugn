let index = 0;
let row = 0;
let word = [];
let parolaDelGiorno = "nervi";
let currentRow = document.querySelectorAll(".row")[row];

function fill(value){
    word[index] = value;
    console.log(word);
    currentRow.children[index].querySelector(".letter").innerHTML = value;
    index++;
}

function remove(){
    word.pop();
    index--;
    currentRow.children[index].querySelector(".letter").innerHTML = "";
}

function checkWord(){
    let correctLetter = 0;
    let submittedWord = "";

    for(let i=0; i<word.length; i++){
        submittedWord += word[i];
    }

    submittedWord.toLowerCase();

    for(let i=0; i<submittedWord.length; i++){
        if(parolaDelGiorno.includes(submittedWord[i], 0)){
            currentRow.children[i].querySelector(".letter").classList.add("presentLetter");
        }
    }

    for(let i=0; i<submittedWord.length; i++){
        if(submittedWord[i]===parolaDelGiorno[i]){
            currentRow.children[i].querySelector(".letter").classList.remove("presentLetter");
            currentRow.children[i].querySelector(".letter").classList.add("correctLetter");
            correctLetter++;
        }
    }

    if(correctLetter===5){
        console.log("hai trovato la parola")
        return false;
    }

    return true;
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

document.addEventListener("keydown", function(e){


    if(e.key === "Enter" && index === 5){
        if(checkWord()){
            if(row<5){
                index = 0;
                row++;
                currentRow = document.querySelectorAll(".row")[row];
            }
        }
    }

    if(e.key === "Backspace"){
        if(index>0){
            remove();
        }
    }

    if(index<5 && isLetter(e.key)){
        fill(e.key);
    }
})