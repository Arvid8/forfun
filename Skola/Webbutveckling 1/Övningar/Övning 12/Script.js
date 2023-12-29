var wrongAnswerCounter = 0;
var inText, resultTag, largeImg, imgText, imgList;
// References to tags

function init() {
    inText = document.getElementById("inText");
	resultTag = document.getElementById("result");
	largeImg = document.getElementById("largeImg");
	imgText = document.getElementById("imgText");
	imgList = document.getElementById("imgList");
}
window.onload = init;

function checkAnswer() {
    var answer, resStr;
	answer = Number(inText.value);
	resStr = answer;
	if (isNaN(answer)) {resStr = "Du måste skriva ett tal!"}

	else if (answer == 5) {resStr = "Rätt!"}
	else if (answer > 5){
		wrongAnswerCounter += 1;
		resStr = "För stort tal :( Du har svarat fel " + wrongAnswerCounter + " gånger.";
		}
    else if (answer < 5){
		wrongAnswerCounter += 1;
		resStr = "För litet tal :( Du har svarat fel " + wrongAnswerCounter + " gånger.";
		}
	resultTag.innerHTML = resStr;
} // End checkAnswer

function showPict(nr) {
    largeImg.src = "pics/large/pic" + nr + ".jpg";
    var altText = document.getElementById("smallImg" + nr).alt;
    imgText.innerHTML = altText;
    return altText;
} // End showPict

function showRandomPict() {
    var randomNumber = Math.floor(5*Math.random())+1;
    var pictText = showPict(randomNumber);
    imgList.innerHTML += pictText + ", ";
} // End showRandomPict

