let index = 0;
let row = 0;
let word = [];
let parolaDelGiorno = "minni";
let currentRow = document.querySelectorAll(".row")[row];
let key = document.querySelectorAll(".keyboardChar");
console.log(key);
let modal = document.querySelector(".modal");
let win = false;

function fill(value) {
    word[index] = value;
    console.log(word);
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

    for (let i = 0; i < submittedWord.length; i++) {
        currentRow.children[i].querySelector(".letter").classList.add("absentLetter");
        
        
    }

    for (let i = 0; i < submittedWord.length; i++) {
        if (parolaDelGiorno.includes(submittedWord[i], 0)) {
            currentRow.children[i].querySelector(".letter").classList.remove("absentLetter");
            currentRow.children[i].querySelector(".letter").classList.add("presentLetter");
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
        }
    }

    if (correctLetter === 5) {
        modalMsg("Hai vinto!");
        win = true;
        return false;
    }

    return true;
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}


document.addEventListener("keydown", function (e) {

    let letter = e.key;

    if (letter === "Enter" && !win) {
        if (checkWord()) {
            if (row < 5) {
                word.splice(0, word.length);
                index = 0;
                row++;
                currentRow = document.querySelectorAll(".row")[row];
            }
        }
    }

    if (letter === "Backspace" && !win) {
        if (index > 0) {
            remove();
        }
    }

    if (index < 5 && isLetter(letter) && !win) {
        fill(letter);
    }
})

for (let i = 0; i < key.length; i++) {
    key[i].addEventListener("click", function (e) {
        let letter = e.target.innerHTML;
        letter = letter.trim();

        if (letter === "ENTER" && !win) {
            if (checkWord()) {
                if (row < 5) {
                    index = 0;
                    row++;
                    currentRow = document.querySelectorAll(".row")[row];
                }
            }
        }

        if (i === 27 && index > 0 && !win) {
            remove();
        }

        if (index < 5 && i != 27 && i != 19 && !win) {
            fill(letter);
        }
    })
}