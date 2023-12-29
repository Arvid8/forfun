var map, timeout;

function enableScrollingWithMouseWheel() {
    map.setOptions({
        scrollwheel: true
    });
}

function disableScrollingWithMouseWheel() {
    map.setOptions({
        scrollwheel: false
    });
}

function initialize() {
    var myLatLng = {
        lat: 56.66668,
        lng: 16.35180
    };

    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 15,
        scrollwheel: false
    });

    var marker = new MarkerWithLabel({
        position: myLatLng,
        map: map,
        labelContent: "<div class='arrow'></div><div class='inner'>Här finns vi!</div>",
        labelAnchor: new google.maps.Point(75, 115),
        labelClass: "labels",
        icon : 'https://cdn1.iconfinder.com/data/icons/Webtoys/64/Pin.png'
    });

    google.maps.event.addListener(map, "mousedown", function() {
        enableScrollingWithMouseWheel();
    });
}

google.maps.event.addDomListener(window, "load", initialize);

google.maps.event.addDomListener(window, "resize", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        initialize();
    }, 50);
});

$(document).ready(function() {
    $("body").on("mouseleave", "#map", function() {
        disableScrollingWithMouseWheel();
    });
});

$(window).scroll(function() {
    disableScrollingWithMouseWheel();
});