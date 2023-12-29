function init() {
    alert("Hej");
}

window.onload = init;

function goButton() {
    var number1 = document.getElementById("text1").value;
    var number2 = document.getElementById("text2").value;

    if ((isNaN(Number(number1))) || (isNaN(Number(number2))) ||
        (number1 === "") || (number2 === "")) {
        document.getElementById('divID').innerHTML =
            "Du måste skriva ett nummer!";
    } else {
        var slut = (Number(number1) + Number(number2)) * 4;
        document.getElementById('divID').innerHTML =
            "Resultatet blir: " + slut;
        document.getElementById('resultat').innerHTML = slut;
    }
}

function clearShit() {
    document.getElementById('divID').innerHTML = "";
    document.getElementById('text1').value = "";
    document.getElementById('text2').value = "";
    document.getElementById('resultat').innerHTML = "";
}

function randomNumb() {
    var r1 = Math.floor(Math.random() * 100000) + 1;
    var r2 = Math.floor(Math.random() * 100000) + 1;
    var slut = (Number(r1) + Number(r2)) * 4;

    document.getElementById('text1').value = r1;
    document.getElementById('text2').value = r2;
    document.getElementById('divID').innerHTML =
        "Resultatet blir: " + slut;
    document.getElementById('resultat').innerHTML = slut;
}

function decrease1() {
    if ((document.getElementById('text1').value == "") || (document.getElementById('text1').value == 0)) {
        document.getElementById('text1').value = -1;
    } else {
        document.getElementById('text1').value = Number(document.getElementById('text1').value) - 1;
    }
}

function increase1() {
    if ((document.getElementById('text1').value == "") || (document.getElementById('text1').value == 0)) {
        document.getElementById('text1').value = 1;
    } else {
        document.getElementById('text1').value = Number(document.getElementById('text1').value) + 1;
    }
}

function decrease2() {
    if ((document.getElementById('text2').value == "") || (document.getElementById('text2').value == 0)) {
        document.getElementById('text2').value = -1;
    } else {
        document.getElementById('text2').value = Number(document.getElementById('text2').value) - 1;
    }
}

function increase2() {
    if ((document.getElementById('text2').value == "") || (document.getElementById('text2').value == 0)) {
        document.getElementById('text2').value = 1;
    } else {
        document.getElementById('text2').value = Number(document.getElementById('text2').value) + 1;
    }
}
//
//for (let i = 1; i < 101; i++) {
//    let string = '';
//    if (i % 5 == 0) {
//        string += "Fizz";
//    }
//
//    if (i % 3 == 0) {
//        string += "Buzz";
//    }
//    console.log(i + " är " + string);
//}
