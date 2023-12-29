function getInfo() {
    var allowSendCheck = false, allowSend = false, count = 0, email = document.getElementById(61);
    for(var x = 0; x < 6; x++){
        for(var i = 1; i < 4; i++){
            if(document.getElementById((x*10)+i).checked) allowSend = true; break;
        }
    }
    for(var s = 62; s < 65; s++ ){
      if(document.getElementById(s).value) count++;
    }
    
    for(var p = 0; p < email.length; p++){
        if(email.value.charAt(p) == '@') count++;
    }
    if(count==4) allowSendCheck = true;
    if((!allowSend)||(!allowSendCheck)) alert("Du måste göra minst ett val i rutorna. Samt fylla i dina kontaktuppgifter.");
    else if((allowSend)&&(allowSendCheck)) alert("Skickat!");
}