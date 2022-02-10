let index = 0;
let word = [];

function fill(value){
    word[index] = value;
    console.log(word);
    let currentRow = document.querySelectorAll(".row")[0];
    currentRow.children[index].querySelector(".letter").innerHTML = value;
    index++;
}

function remove(){
    word.pop();
    index--;
    let currentRow = document.querySelectorAll(".row")[0];
    currentRow.children[index].querySelector(".letter").innerHTML = "";
}

function checkWord(){
    console.log(word);
}

document.addEventListener("keydown", function(e){

    if(e.key === "Enter" && index === 5){
        checkWord();
        console.log(":)")
    }

    if(e.key === "Backspace"){
        if(index>0){
            remove();
        }
    }

    if(index<5 && e.key!="Backspace" && e.key!="Enter"){
        fill(e.key);
    }
})