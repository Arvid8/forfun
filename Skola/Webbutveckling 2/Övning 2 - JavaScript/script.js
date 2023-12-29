var inText, resultTag, pictureTag, randomNumber, guessCounter = 0, resStr;

function init() {
    inText = document.getElementById("inText").value;
    resultTag = document.getElementById("result");
    pictureTag = document.getElementById("picture");
    newGame();
}
window.onload = init;

function newRandom(high) {
    i = Math.floor(Math.random() * high) + 1;
    return i;
}

function newGame() {
    guessCounter = 0;
    randomNumber = newRandom(10);
    alert("Ett nytt slumptal har nu genererats.");
}

function checkGuess() {
    var guess = document.getElementById("inText").value;
    
    if (Number(guess) === randomNumber){
        resStr = "Rätt!";
        showFlower();
    } else {
        guessCounter++;
        resStr = guessCounter + " fel!";
         if (Number(guessCounter) >= 5){
            resStr = "Du har nu gissat fel " + guessCounter + " gånger. Rätta svaret är: " + randomNumber;
        }
    }
    
    if ((isNaN(Number(guess))) || (guess === "")) {
        resStr = "Du måste skriva ett nummer!";
    }
    
    resultTag.innerHTML = resStr;
}

function showFlower() {
 var x = newRandom(3);
    pictureTag.src = "pics/flower" + x + ".jpg";
}