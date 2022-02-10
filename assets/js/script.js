let index = 0;
let word = [];

function fill(value){
    word[index] = value;
    console.log(word);
    let currentRow = document.querySelectorAll(".row")[0];
    currentRow.children[index].querySelector(".letter").innerHTML = value;
    index++;
}

function checkWord(){
    console.log(word);
}

document.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        checkWord();
        console.log("mic check")
    }

    console.log(e.key);

    if(e.key === "Backspace"){
        
        if(index>0){
            word.pop();
            index--;
            let currentRow = document.querySelectorAll(".row")[0];
            currentRow.children[index].querySelector(".letter").innerHTML = "";
        }
        
    }

    if(index<5 && e.key!="Backspace" && e.key!="Enter"){
        fill(e.key);
    }
})