$(document).ready(function(){
	
	injectPage();

});

function injectPage(){

    $('#header-container > div > #menu > .secondary-menu > li:nth-child(1)').click(function(){
        console.log('dua');

        $('#sub-page-container').load('../sub-pages/glass.html', function(){

        });
        
        $('#header-container > div > #menu > .secondary-menu').addClass('secondary-menu-animation-2');

        $('#sub-page-container').animate({
        	right: '0',
        }, 1000, 'easeOutQuint');
    });

}