var x, y, breadTop, siteHeight;
var topContainer = document.getElementById("topcontainer"),
    fromSide = document.getElementById("fromSide"),
    bread = document.getElementById("bread");

function setup() {
    topContainer = document.getElementById("topcontainer");
    fromSide = document.getElementById("fromSide");
    bread = document.getElementById("bread");
    var n = Math.floor((Math.random() * 3) + 1);
    var srcName = "Bilder/bread/" + n + ".png";
    bread.src = srcName;

    checkWhatHtmlFile();
    setRed();

    if ($(window).width() > 580) {
        $(".antiscroll-inner").css("width", $(window).width() + "px");
        $(".antiscroll-inner").css("height", $(window).height() + "px");
        $(".antiscroll-wrap").css("width", $(window).width() + "px");
        $(".antiscroll-wrap").css("height", $(window).height() + "px");
    } else {
        $(".antiscroll-inner").css("width", 580 + "px");
        $(".antiscroll-wrap").css("width", 580 + "px");
    }

    siteHeight = $("#topcontainer").height() + $("footer").height() + $("article").height() + 22;

    if (siteHeight < $(".antiscroll-inner").height()) {
        siteHeight = $(".antiscroll-inner").height();
    }

    y = siteHeight - $("#topcontainer").height() - $("footer").height() + 8;
    x = y * 0.65 * 2.5;
    bread.style.height = y * 0.65 + "px";

    if ($(window).width() < x) {
        bread.style.width = $(window).width() * 0.9 + "px";
        bread.style.height = ($(window).width() / 2.5) * 0.9 + "px";
        x = parseInt(bread.style.width);
    } else {
        bread.style.width = x + "px";
    }

    bread.style.left = (($(window).width()) / 2 - (x / 2)) + "px";
    breadTop = (y / 2) + $("#topcontainer").height() - (bread.clientHeight / 2);
    bread.style.top = breadTop + "px";
    fromSide.style.left = $(window).width() + "px";

    var height = $("#topcontainer").height() + $("article").height() + 22;
    if (height + $("footer").height() < $(window).height()) {
        $("footer").css("top", $(window).height() - $("footer").height() + "px");
    } else {
        $("footer").css("top", height + "px");
    }

    /* Scrolling down */
    $(".antiscroll-inner").animate({
            scrollTop: (fromSide.clientHeight / 2 + topContainer.clientHeight - window.innerHeight / 2)
        },
        500);

    $("#bread").hide();
    $("#loading:visible").fadeOut(500, function () {
        if ($("#bread").complete) {
            readyToStart();
        } else {
            $("#bread").ready(function () {
                $('<img src="' + srcName + '">').load(function () {
                    readyToStart();
                });
            });
        }
    });
}

function readyToStart() {
    $("#bread").fadeIn(1500);

    setTimeout(function () {
        $("#fromSide").animate({
            left: parseInt($("#topcontainer").width() / 2 - fromSide.clientWidth / 2) + "px"
        }, 1600);

        $("#bread").animate({
            left: parseInt(-($("#bread").width() + $("#bread").offset().left)) + "px"
        }, 1600);

        setTimeout(function () {
            $(".antiscroll-inner").animate({
                scrollTop: 0
            }, 500);
        }, 2100);
    }, 2000);
}

function checkWhatHtmlFile() {
    var path = window.location.pathname;
    $("section").hide();
    if (path == "/sortiment.html") {
        $(".sortimentSection").show();
    } else if (path == "/kontakt.html") {
        $(".kontaktSection").show();
    } else if (path == "/historia.html") {
        $(".historiaSection").show();
    } else if (path == "/hittahit.html") {
        $(".hittahitSection").show();
    } else {
        $(".hemSection").show();
    }
}

(function ($) {
    $(document).ready(function () {
        $(".antiscroll-wrap").antiscroll();
    });
})(jQuery);

window.onload = setup;