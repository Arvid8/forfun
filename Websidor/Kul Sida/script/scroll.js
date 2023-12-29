$(document).ready(function(){
	
	var scrollTopValue = $(window).scrollTop();
	scrollReturnButton(scrollTopValue);
    menuColorChange(scrollTopValue);
    elementScrolledIntoView();

    
    $('.image-angle-down > i').click(function(){
    	$('#hagelin-container').scrollView(1500, 'easeOutSine', 30);
    });
    
    $('#header-container > div > #menu > .primary-menu > li:nth-child(1)').click(function(){
    	$('#hagelin-container').scrollView(1500, 'easeOutSine', 30);
        $('#menu').fadeOut(250);
        mobileMenu();
    });

    $('#header-container > div > #menu > .primary-menu > li:nth-child(2)').click(function(){
    	$('#exam-container').scrollView(1500, 'easeOutSine', 30);
    	$('#menu').fadeOut(250);
    	mobileMenu();
    });
    
    $('#header-container > div > #menu > .primary-menu > li:nth-child(3)').click(function(){
    	$('#employee-container').scrollView(1500, 'easeOutSine', 30);
    	$('#menu').fadeOut(250);
    	mobileMenu();
    });
    
    $('#header-container > div > #menu > .primary-menu > li:nth-child(4)').click(function(){
    	$('#contact-container').scrollView(1500, 'easeOutSine', 30);
    	$('#menu').fadeOut(250);
    	mobileMenu();
    });
    
    $('#return-up-button').click(function(){
    	$('html, body').animate({
		  scrollTop: '0',
		}, 1500, 'easeOutSine');
		
		if(!$('#menu-button > div:nth-child(2)').is(':visible')){
			$('#menu').fadeOut(250);
	    	mobileMenu();
		}
    });
    
    $('html, body').bind('mousedown scroll DOMMouseScroll mousewheel', function(){
		$('html, body').stop();
	});
    
});

var windowWidth = $(window).width();

$(window).resize(function(){
	windowWidth = $(window).width();
});

$(window).scroll(function(){ 

    var scrollTopValue = $(window).scrollTop();
    scrollReturnButton(scrollTopValue);
    menuColorChange(scrollTopValue);
    elementScrolledIntoView();

});


$.fn.scrollView = function (animationTime, easing, scrollTopValueMinus) {
	
	var scrollTopValue = $(this).offset().top - scrollTopValueMinus;
	

	return this.each(function () {
		$('html, body').animate({
		  scrollTop: scrollTopValue
		}, animationTime, easing);
		event.preventDefault();
	});

};


function scrollReturnButton(scrollTopValue){
	var documentHeight = $(document).height();
    var scrollTopReturnUp = documentHeight * 0.3;

	if(scrollTopValue > scrollTopReturnUp){
		$('#return-up-button').fadeIn(250);
	}else{
		$('#return-up-button').fadeOut(250);
	}
	
}

function mobileMenu(){
    
    if($('#menu-button > div:nth-child(2)').is(':visible')){
        $('#menu-button > div').stop().toggleClass('cross-clicked');
        $('#menu-button-container > p').stop().toggleClass('menu-text');
        $('#menu-button > div:nth-child(1), #menu-button > div:nth-child(3)').stop().toggleClass('cross-top');
        
        setTimeout(animateXFirst, 250);
        
        $('#menu').stop().fadeToggle(250);
        $('#menu > .primary-menu').stop().toggleClass('mobile-menu-animation');
        
    }else{
        $('#menu-button > div:nth-child(1)').stop().toggleClass('cross-plus');
        $('#menu-button > div:nth-child(3)').stop().toggleClass('cross-minus');
        
        setTimeout(animateXSecond, 250);
        
        $('#menu').stop().fadeToggle(250);
        $('#menu > .primary-menu').stop().toggleClass('mobile-menu-animation');
        
    }
    
    function animateXFirst(){
        $('#menu-button > div:nth-child(1)').stop().toggleClass('cross-plus');
        $('#menu-button > div:nth-child(3)').stop().toggleClass('cross-minus');
        $('#menu-button > div:nth-child(2)').stop().toggle();
    }
    
    function animateXSecond(){
        $('#menu-button > div').stop().toggleClass('cross-clicked');
        $('#menu-button-container > p').stop().toggleClass('menu-text');
        $('#menu-button > div:nth-child(1), #menu-button > div:nth-child(3)').stop().toggleClass('cross-top');
        $('#menu-button > div:nth-child(2)').stop().toggle();
    }
    
}


function menuColorChange(){


}


function elementScrolledIntoView(){

    if(scrolledIntoViewCheck('.divider-1') == true){
        $('.divider-1').animate({
            width: '200px',
        });
    }else if(scrolledIntoViewCheck('.divider-2') == true){
        $('.divider-2').animate({
            width: '200px',
        });
    }else if(scrolledIntoViewCheck('.divider-3') == true){
        $('.divider-3').animate({
            width: '200px',
        });
    }


    function scrolledIntoViewCheck(element){
        var $element = $(element);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elementTop = $element.offset().top + 25;
        var elementBottom = elementTop + $element.height() + 25;

        return ((elementBottom <= docViewBottom) && (elementTop >= docViewTop));
    }
}

