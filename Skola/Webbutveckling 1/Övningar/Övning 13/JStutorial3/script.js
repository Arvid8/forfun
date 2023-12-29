// Global variables
var dateTag, imgTag, nameListTag, pictListTag; // References to tags

function init() {
	dateTag = document.getElementById("date");
	imgTag = document.getElementById("fruitPict");
	nameListTag = document.getElementById("fruitNameList");
	pictListTag = document.getElementById("fruitPictList");
    
    showDate();
} // End init
window.onload = init;



function chooseFruit(fruitName) {
	imgTag.src = "pics/fruits/" + fruitName + ".jpg";
} // End chooseFruit

function showDate() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();
    dateTag.innerHTML = d + "-" + (m+1) + "-" + y;
}

function prevPict() {
	
} // End prevPict


function nextPict() {
	
} // End nextPict


function listFruits() {
	
} // End listFruits


function ifAppleChangeLemonsToOranges() {
	
} //End ifAppleChangeLemonsToOranges
