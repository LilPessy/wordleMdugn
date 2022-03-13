let index = 0;
let row = 0;
let word = [];
let parolaDelGiorno = "minni";
let currentRow = document.querySelectorAll(".row")[row];
let key = document.querySelectorAll(".keyboardChar");
let modal = document.querySelector(".modal");
let end = false;
var r = document.querySelector(':root');
let vocabulary = [];
    
fetch("https://raw.githubusercontent.com/pietroppeter/wordle-it/d763ccca39e10ed8c5a3674618d9268ccb60f189/dict/word_list.txt")
    .then(text => text.text())
    .then(function (text) {
        vocabulary = text.split("\n")
    })

let themeBtn = document.querySelectorAll(".themeBtn");

function fill(value) {
    word[index] = value;
    currentRow.children[index].querySelector(".letter").innerHTML = value;
    currentRow.children[index].querySelector(".letter").classList.add("filledBorder");
    index++;
}

function remove() {
    word.pop();
    index--;
    currentRow.children[index].querySelector(".letter").innerHTML = "";
    currentRow.children[index].querySelector(".letter").classList.remove("filledBorder");
}

function modalMsg(msg) {
    modal.innerHTML = msg;
    modal.classList.remove("hidden")
    setTimeout(() => {
        modal.classList.add("hidden")
    }, 2000)
}

function checkWord() {
    let correctLetter = 0;
    let submittedWord = "";


    for (let i = 0; i < word.length; i++) {
        submittedWord += word[i];
    }

    if (submittedWord.length < 5) {
        modalMsg("Numero di lettere errato");
        return false;
    }

    submittedWord = submittedWord.toLowerCase();
    
    let finded = false;
    for (let i = 0; i < vocabulary.length; i++){
        if (submittedWord === vocabulary[i]) {
            finded = true;
        }
    }

    if (!finded) {
        modalMsg("Parola non presente");
        return false;
    }

    for (let i = 0; i < submittedWord.length; i++) {
        currentRow.children[i].querySelector(".letter").classList.add("absentLetter");
        let j = 0;
        let finded = false;
        while(!finded && j<key.length){
            if (key[j].innerHTML.trim().toLowerCase() == submittedWord[i]) {
                if (!key[j].classList.contains("correctLetter")) {
                    key[j].classList.add("absentLetter");
                    key[j].classList.remove("keyBg");
                    finded = true;
                }
            }
            j++;
        }
    }

    for (let i = 0; i < submittedWord.length; i++) {
        if (parolaDelGiorno.includes(submittedWord[i], 0)) {
            currentRow.children[i].querySelector(".letter").classList.remove("absentLetter");
            currentRow.children[i].querySelector(".letter").classList.add("presentLetter");
            let j = 0;
            let finded = false;
            while(!finded && j<key.length){
                if (key[j].innerHTML.trim().toLowerCase() == submittedWord[i]) {
                    if (!key[j].classList.contains("correctLetter")) { 
                        key[j].classList.add("presentLetter");
                        key[j].classList.remove("absentLetter");
                        key[j].classList.remove("keyBg");
                        finded = true;
                    }
                }
                j++;
            }

            for(let j=i; j>0; j--){
                if(submittedWord[j]===submittedWord[i] && j!=i){
                    currentRow.children[i].querySelector(".letter").classList.add("absentLetter");
                    currentRow.children[i].querySelector(".letter").classList.remove("presentLetter");
                }
                
            }
        }
    }

    for (let i = 0; i < submittedWord.length; i++) {
        if (submittedWord[i] === parolaDelGiorno[i]) {
            for(let j = 0; j < submittedWord.length; j++){
                if(j!=i){
                    if(submittedWord[j] === submittedWord[i] && submittedWord[j]!=parolaDelGiorno[j]){
                        currentRow.children[j].querySelector(".letter").classList.add("absentLetter");
                        currentRow.children[j].querySelector(".letter").classList.remove("presentLetter");
                    }
                }
            }
            currentRow.children[i].querySelector(".letter").classList.remove("presentLetter");
            currentRow.children[i].querySelector(".letter").classList.remove("absentLetter");
            currentRow.children[i].querySelector(".letter").classList.add("correctLetter");
            correctLetter++;
            let j = 0;
            let finded = false;
            while(!finded && j<key.length){
                if(key[j].innerHTML.trim().toLowerCase()==submittedWord[i]){
                    key[j].classList.add("correctLetter");
                    key[j].classList.remove("presentLetter");
                    key[j].classList.remove("absentLetter");
                    key[j].classList.remove("keyBg");
                    finded = true;
                }
                j++;
            }
        }
    }

    if (correctLetter === 5) {
        modalMsg("Hai vinto!");
        end = true;
        return false;
    }

    if (row == 5 && !end) {
        modalMsg("Hai perso!");
        end = true;
        return false;
    }

    return true;
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/);
}


document.addEventListener("keydown", function (e) {

    let letter = e.key;

    if (letter === "Enter" && !end) {
        if (checkWord()) {
            if (row < 5) {
                word.splice(0, word.length);
                index = 0;
                row++;
                currentRow = document.querySelectorAll(".row")[row];
            }
        }
    }

    if (letter === "Backspace" && !end) {
        if (index > 0) {
            remove();
        }
    }

    if (index < 5 && isLetter(letter) && !end) {
        fill(letter);
    }
})

for (let i = 0; i < key.length; i++) {
    key[i].addEventListener("click", function (e) {
        let letter = e.target.innerHTML;
        letter = letter.trim();

        if (letter === "ENTER" && !end) {
            if (checkWord()) {
                if (row < 5) {
                    index = 0;
                    row++;
                    currentRow = document.querySelectorAll(".row")[row];
                }
            }
        }

        if (i === 27 && index > 0 && !end) {
            remove();
        }

        if (index < 5 && i != 27 && i != 19 && !end) {
            fill(letter);
        }
    })
}

for(let i=0; i<themeBtn.length; i++){
    themeBtn[i].addEventListener("click", function(e){
        if(i==0){
           themeBtn[i].classList.add("hidden");
           themeBtn[i+1].classList.remove("hidden");
           r.style.setProperty("--background", "white");
           r.style.setProperty("--letters", "#000");
           r.style.setProperty("--absentLetter", "#787c7e");
           r.style.setProperty("--key", "#d3d6da");
           r.style.setProperty("--letterBorder", "#d3d6da");
           r.style.setProperty("--filledBorder", "#d3d6da");
           r.style.setProperty("--boxedLetters", "#000")
        }else{
            themeBtn[i].classList.add("hidden");
            themeBtn[i-1].classList.remove("hidden");
            r.style.setProperty("--background", "#121213");
            r.style.setProperty("--letters", "#fff");
            r.style.setProperty("--absentLetter", "#3a3a3c");
            r.style.setProperty("--key", "#818384");
            r.style.setProperty("--letterBorder", "#3a3a3c");
            r.style.setProperty("--filledBorder", "#565758");
            r.style.setProperty("--boxedLetters", "#fff")
        }
    })
}


