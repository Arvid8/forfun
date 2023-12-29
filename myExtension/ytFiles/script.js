$(document).ready(function () {
    $("video, #player-api").addClass("extend-fullscreen");
    $("#watch7-content").addClass("mRest");
    $("#watch7-sidebar").addClass("mStuff");
    $(".ytp-play-button").click();
    $(".ytp-play-button").click();
    $(".ytp-size-button").remove();
    var j;

    setInterval(function () {
        if (!$("#movie_player").hasClass("ytp-fullscreen") && !$("video, #player-api").hasClass("extend-fullscreen")) {
            $("video, #player-api").addClass("extend-fullscreen");
            $(".ytp-play-button").click();
            $(".ytp-play-button").click();
        } else if ($("#movie_player").hasClass("ytp-fullscreen") && $("video, #player-api").hasClass("extend-fullscreen")) {
            $("video, #player-api").removeClass("extend-fullscreen");
            $(".ytp-play-button").click();
            $(".ytp-play-button").click();
        }
    }, 10);
    $(document).mousemove(function () {
        clearTimeout(j);
        $('html').css("cursor", "default");
        j = setTimeout(function () {
            $('html').css("cursor", "none");
        }, 5000);
    });
});