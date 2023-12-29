$(document).ready(function () {
    var imageAmount = 4;
    var sliderWidth = imageAmount * 100;
    var imageWidth = 100 / imageAmount;

    $('#image-slider-container').css('width', sliderWidth + '%');
    $('#image-slider-container > .image-slider-images').css('width', imageWidth + '%');

    $('#menu-button-container').click(mobileMenu);
    $('#menu > .primary-menu > li:last-child, #menu > .secondary-menu > li:last-child').click(menuReadMore);

    $(window).enllax();



    /* FUNCTIONS */

    googleMap();

    $(window).load(function () {
        injectOverflow();
        bouncyBounce();
        imageSlider(imageAmount);
    });

    /* FUNCTIONS */

});


function mobileMenu() {

    if ($('#menu-button > div:nth-child(2)').is(':visible')) {
        $('#menu-button > div').stop().toggleClass('cross-clicked');
        $('#menu-button-container > p').stop().toggleClass('menu-text');
        $('#menu-button > div:nth-child(1), #menu-button > div:nth-child(3)').stop().toggleClass('cross-top');

        setTimeout(animateXFirst, 250);

        $('#menu').stop().fadeToggle(250);
        $('#menu > .primary-menu').stop().toggleClass('mobile-menu-animation');

    } else {
        $('#menu-button > div:nth-child(1)').stop().toggleClass('cross-plus');
        $('#menu-button > div:nth-child(3)').stop().toggleClass('cross-minus');

        setTimeout(animateXSecond, 250);

        $('#menu').stop().fadeToggle(250);
        $('#menu > .primary-menu').stop().toggleClass('mobile-menu-animation');
    }

    function animateXFirst() {
        $('#menu-button > div:nth-child(1)').stop().toggleClass('cross-plus');
        $('#menu-button > div:nth-child(3)').stop().toggleClass('cross-minus');
        $('#menu-button > div:nth-child(2)').stop().toggle();
    }

    function animateXSecond() {
        $('#menu-button > div').stop().toggleClass('cross-clicked');
        $('#menu-button-container > p').stop().toggleClass('menu-text');
        $('#menu-button > div:nth-child(1), #menu-button > div:nth-child(3)').stop().toggleClass('cross-top');
        $('#menu-button > div:nth-child(2)').stop().toggle();
    }

    setTimeout(secondaryMenuReset, 250);

    function secondaryMenuReset() {
        $('#menu > .primary-menu').addClass('primary-menu').show().removeClass('primary-menu-ul-right');
        $('#menu > .secondary-menu').removeClass('secondary-menu-animation').hide();
    }

}


function menuReadMore() {

    if ($('#menu > .primary-menu').is(':visible')) {
        $('#menu > .primary-menu').toggleClass('primary-menu-ul-right', 700, toggleSecondary()); // Animate fade out primary menu
        $('#menu > .secondary-menu').toggle(); // Shows secondary menu
    } else {
        $('#menu > .secondary-menu').toggleClass('secondary-menu-animation', 700, togglePrimaryBack()); // Animate fade out secondary menu
    }


    function toggleSecondary() {
        setTimeout(function () {
            $('#menu > .primary-menu').toggle(); // Hides primary menu 
            $('#menu > .secondary-menu').toggleClass('secondary-menu-animation'); // Animate fade in secondary menu
        }, 700);
    }

    function togglePrimaryBack() {
        setTimeout(function () {

            setTimeout(function () {
                $('#menu > .primary-menu').toggleClass('primary-menu-ul-right'); // Animate fade in primary menu
            }, 10);

            $('#menu > .primary-menu').toggle(); // Shows primary menu
            $('#menu > .secondary-menu').toggle(); // Hides secondary menu

        }, 700);

    }

}


function imageSlider(imageAmount) {
    var loops = 0;
    var pixelsLeft = 0;
    var animationTime = 1500;
    var staticTimeoutTime = 8000;
    var timeoutTime;
    var imageWidthPixels = $('.image-slider-images').width();

    next();

    function next() {
        $(window).resize(function () {
            $('.image-slider-images').css({
                left: '-0px',
            });
            imageWidthPixels = $('.image-slider-images').width();
            pixelsLeft = 0;
            loops = 1;
        });
        if (loops == imageAmount) {
            pixelsLeft = 0;
            loops = 0;
        }

        if (loops == 0 || loops == 1) {
            timeoutTime = staticTimeoutTime / 2;
        } else {
            timeoutTime = staticTimeoutTime;
        }

        if (loops++ >= imageAmount) return;

        setTimeout(function () {

            if (pixelsLeft == 0) {
                $('.image-slider-images').css({
                    left: '-' + pixelsLeft + 'px',
                }, 0);
            } else {
                $('.image-slider-images').animate({
                    left: '-' + pixelsLeft + 'px',
                }, animationTime, 'easeInOutQuart');
            }

            pixelsLeft = pixelsLeft + imageWidthPixels;

            next();

        }, timeoutTime);
    }


}

var bounces = 0;

function bouncyBounce() {

    if (bounces++ < 10) {
        $('.image-angle-down').animate({
            bottom: '30px',
        }, 750).animate({
            bottom: '0px'
        }, 500, bouncyBounce);

    }

}


function googleMap() {
    var locationOverlay = $('#location-google-iframe-container > .location-google-overlay');


    locationOverlay.click(function () {
        $(this).fadeOut(250);
    });
    $('#location-google-iframe-container').mouseleave(function () {
        locationOverlay.fadeIn(250);
    });

}


function injectOverflow() {

    $('#frame-image-slider-wrapper').load('brand-images.html', function () {
        brandImageSlider();
    });

    $('#extra-container').load('extra.html', function () {

    });

}


function brandImageSlider() {
    var imageAmount = $('#frame-image-slider > img').length;
    var animationTime = 3250 * imageAmount;

    var imageSliderWidth = $('#frame-image-slider').width();

    $('#frame-image-slider').animate({
        left: '-' + imageSliderWidth + 'px',
    }, animationTime, 'linear', brandImageSliderReset);

    $('#frame-image-slider-2').animate({
        left: '-' + imageSliderWidth + 'px',
    }, animationTime, 'linear', brandImageSliderReset);


    function brandImageSliderReset() {
        $('#frame-image-slider, #frame-image-slider-2').css('left', '');

        brandImageSlider();
    }

}