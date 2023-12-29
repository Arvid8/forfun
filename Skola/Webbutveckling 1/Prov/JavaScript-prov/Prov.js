var namn, resultat, tal1, tal2;

function init() {
    
    resultat = document.getElementsByName("total")[0];
    tal1 = document.getElementsByName("number1")[0];
    tal2 = document.getElementsByName("number2")[0];
    
    //namn = window.prompt("Skriv ditt namn:");
    //window.alert("Hej " + namn + ". Fixa miniräknaren med java-script.");
}
window.onload = init;

function klicka() {
    smallImg1.src = "small/pic2.jpg";
}

function hover() {
    smallImg2.src = "small/pic1.jpg";
}

function addition() {
    resultat.value = Number(tal1.value) + Number(tal2.value);
}

function subtraction() {
    resultat.value = Number(tal1.value) - Number(tal2.value);
}

function multiply() {
    resultat.value = Number(tal1.value) * Number(tal2.value);
}