$(document).ready(function(){

	validateForm();

 	$('.contact-send-button').click(function(){
 	    validateSendForm();
 	});

   
});

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function validateForm(){

	$('input, textarea').focusout(function(){
  		if($(this).val() == ''){
  			$(this).css('border', '2px solid #C24040');
  		}else{
  			$(this).css('border', '1px solid #333');
  		}
 	});
 	
 	$('input[name="email"]').focusout(function(){
  		if(!isEmail($('input[name="email"]').val())){
	  		$('input[name="email"]').css('border', '2px solid #C24040');
	  	}else{
	  		$('input[name="email"]').css('border', '1px solid #333');
	  	}
 	});
 	
 	$('input[name="phone"]').focusout(function(){
  		if(!$.isNumeric($('input[name="phone"]').val())){
	  		$('input[name="phone"]').css('border', '2px solid #C24040');
	  	}else{
	  		$('input[name="phone"]').css('border', '1px solid #333');
	  	}
 	});
 	
}

function validateSendForm(){

	var errors = 0;

	$('input, textarea').each(function(){
  		if($(this).val() == ''){
  			$(this).css('border', '2px solid #C24040');
  			errors++;
  		}else{
  			$(this).css('border', '1px solid #333');
  		}
 	});


	if($('input[name="email"]').val()!=''){
		if(!isEmail($('input[name="email"]').val())){
  			$('input[name="email"]').css('border', '2px solid #C24040');
  			errors++;
  		}else{
  			$('input[name="email"]').css('border', '1px solid #333');
  		}
	}

	if($('input[name="phone"]').val()!=''){
  		if(!$.isNumeric($('input[name="phone"]').val())){
  			$('input[name="phone"]').css('border', '2px solid #C24040');
  			errors++;
  		}else{
  			$('input[name="phone"]').css('border', '1px solid #333');
  		}
  	}

  	console.log(errors);

  	if(errors == 0){
  		$.post("email.php",

		   {
    		   name : $('input[name = "name"]').val(), 
    		   email : $('input[name = "email"]').val(), 
    		   phone : $('input[name = "phone"]').val(), 
    		   textarea : $('textarea[name = "textarea"]').val()
		   },function(ajax_register_data){
		   		
		   		$('input,textarea').each(function(){
		   			$(this).val('');
		   		});
				
          $('#contact-container > #contact > #contact-form > h4').show();
		   });
  	}

}