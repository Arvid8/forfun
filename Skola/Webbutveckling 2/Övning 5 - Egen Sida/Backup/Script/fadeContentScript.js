var path, darkColor = "#2b2b2b",
    redColor = "#de1b1b",
    allDone = true;

function hemFade() {
    path = window.location.pathname;
    if ((path != "/") && (path != "/index.html") && (allDone)) {
        changeStuff("liHem", "index", "hemSection");
    }
}

function sortimentFade() {
    path = window.location.pathname;
    if ((path != "/sortiment.html") && (allDone)) {
        changeStuff("liSortiment", "sortiment", "sortimentSection");
    }
}

function kontaktFade() {
    path = window.location.pathname;
    if ((path != "/kontakt.html") && (allDone)) {
        changeStuff("liKontakt", "kontakt", "kontaktSection");
    }
}

function historiaFade() {
    path = window.location.pathname;
    if ((path != "/historia.html") && (allDone)) {
        changeStuff("liHistoria", "historia", "historiaSection");
    }
}

function hittahitFade() {
    path = window.location.pathname;
    if ((path != "/hittahit.html") && (allDone)) {
        changeStuff("liHittahit", "hittahit", "hittahitSection");
    }
}

function changeStuff(liname, name, classname) {
    allDone = false;
    $(".active").removeAttr("class");
    $("#" + liname).addClass("active");
    var obj = {
        Title: "url",
        Url: name + ".html"
    };
    history.replaceState(obj, obj.Title, obj.Url);

    setActive();
    setRed();

    $("section").fadeOut(1000);
    setTimeout(function () {
        $("." + classname).fadeIn(1000);
        initialize();
        setTimeout(function () {
            var height = $("#topcontainer").height() + $("#fromSide").height() + 22;
            if (height + $("footer").height() < $(window).height()) {
                $("footer").css("top", $(window).height() - $("footer").height() + "px");
            } else {
                $("footer").css("top", height + "px");
            }
        }, 60);

        setTimeout(function () {
            allDone = true;
        }, 1000);
    }, 950);
}

function setRed() {
    $("#hem").css("color", redColor);
    $("#sortiment").css("color", redColor);
    $("#kontakt").css("color", redColor);
    $("#historia").css("color", redColor);
    $("#hittahit").css("color", redColor);
    $(".active > a").css("color", darkColor);
}