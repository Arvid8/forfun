var map, timeout;

function initialize() {
    var myLatLng = {
        lat: 56.66668,
        lng: 16.35180
    };

    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 10,
        scrollwheel: true
    });
}

google.maps.event.addDomListener(window, "load", initialize);

google.maps.event.addDomListener(window, "resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        initialize();
    }, 50);
});

$(document).ready(function () {
    $("#hidemap").click(function () {
        $(this).fadeOut(250, function () {
            $(this).hide();
        });
    });

    $("body").on("mouseleave", "#map", function () {
        $("#hidemap").fadeIn(250);
    });
});