$(document).ready(function() {

    var weekNumber = getWeek(new Date());

    setIt();

    $('#tV, #tP').click(function() {
        weekNumber -= 1;
        if (weekNumber === 1) {
            $('#tV, #tP').hide();
        }
        else {
            $('#tV, #tP, #fV, #fP').show();
        }
        setIt();
    });

    $('#fV, #fP').click(function() {
        weekNumber += 1;
        if (weekNumber === 52) {
            $('#fV, #fP').hide();
        }
        else {
            $('#tV, #tP, #fV, #fP').show();
        }
        setIt();
    });

    $('#tV, #tP').hover(function() {
            aColor('t', '#C83333');
        },
        function() {
            aColor('t', 'white');
        });

    $('#fV, #fP').hover(function() {
            aColor('f', '#C83333');
        },
        function() {
            aColor('f', 'white');
        });

    function aColor(o, c) {
        $('#' + o + 'V').stop().animate({
            color: c
        }, 200);
        $('#' + o + 'P').stop().animate({
            borderRightColor: c,
            borderBottomColor: c
        }, 200);
    }

    function setIt() {
        $('#vecka > span').text(weekNumber);
        $('#tV').text("v." + (weekNumber - 1));
        $('#fV').text("v." + (weekNumber + 1));
        $('#kod > span').text(getCode(weekNumber));
    }

    function getWeek(dt) {
        var tdt = new Date(dt.valueOf());
        var dayn = (dt.getDay() + 6) % 7;
        tdt.setDate(tdt.getDate() - dayn + 3);
        var firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if (tdt.getDay() !== 4) {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    }

    function getCode(x) {
        var first = parseInt(x.toString().substring(0, 1), 10);
        if (x.toString().length === 1) {
            var second = first;
            first = 0;
        }
        else {
            var second = parseInt(x.toString().substring(1, 2), 10);
        }

        first = (first + 10) * 10;
        second += 5;

        for (var o = 0; o < second; o++) {
            first = Math.sqrt(first);
        }
        var year = new Date().getFullYear();
        var yearSum = 0;

        for (var i = 0; i < year.toString().length; i++) {
            yearSum += parseInt(year.toString().charAt(i), 10);
        }
        first *= yearSum * (yearSum + 1) * (yearSum + 15) * (yearSum * 5) * (yearSum / 2);

        var fLength = parseInt(first.toString().length);
        var code = first.toString().substring(fLength - 4, fLength);
        return code;
    }
});