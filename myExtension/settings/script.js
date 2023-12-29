$(document).ready(function () {
    var height = 360,
        down = false,
        x, y;

    $("#autoplay-checkbox").prop('checked', true)

    doXY(height);

    $(".player-apis > div:nth-child(1)").mousedown(function () {
        down = true;
    });
    $(document).mouseup(function () {
        down = false;
    });

    $(document).mousemove(function (e) {
        if (down) {
            var top = e.pageY - 60;
            doXY(top);
        }
    });

    $("#inpt").on('input', 'input:text', function () {
        if ($("#crW").val().match(/^\d+$/) && $("#crH").val().match(/^\d+$/)) {
            x = $("#crW").val();
            y = $("#crH").val();
            $(".player-apis").css("height", y + "px");
            $(".player-apis").css("width", x + "px");
            $(".player-apis > div:nth-child(2) > div:nth-child(1)").text("Width: " + x + "px");
            $(".player-apis > div:nth-child(2) > div:nth-child(2)").text("Height: " + y + "px");
        }
    });

    function doXY(y) {
        x = Math.round(y * (16 / 9));
        if (y <= 144) {
            y = 144;
            x = 256;
        } else if (x >= $(document).width()) {
            x = $(document).width();
            y = Math.round(x / (16 / 9));
        } else if ((y >= 230) && (y <= 250)) {
            y = 240;
            x = 240 * (16 / 9);
        } else if ((y >= 350) && (y <= 370)) {
            y = 360;
            x = 360 * (16 / 9);
        } else if ((y >= 470) && (y <= 490)) {
            y = 480;
            x = 480 * (16 / 9);
        } else if ((y >= 710) && (y <= 730)) {
            y = 720;
            x = 720 * (16 / 9);
        }
        $(".player-apis").css("height", y + "px");
        $(".player-apis").css("width", x + "px");
        $(".player-apis > div:nth-child(2) > div:nth-child(1)").text("Width: " + Math.round(x) + "px");
        $(".player-apis > div:nth-child(2) > div:nth-child(2)").text("Height: " + Math.round(y) + "px");
    }
});