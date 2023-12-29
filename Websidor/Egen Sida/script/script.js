$(document).ready(function () {
    var hopp = true,
        cb = 1,
        j = true,
        bsc, bscN;

    $("#nav-icon2").click(function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $("#menu").stop().fadeOut(250, function () {
                $("#bildShowCase").show();
            });
            $("#text-menu").stop().removeClass('animation');

        } else {
            $(this).addClass('open');
            $("#bildShowCase").hide();
            $("#menu").stop().fadeIn(250);
            $("#text-menu").stop().addClass('animation');
        }
    });

    $('#top-layer > div:nth-child(3)').click(function () {
        if ($('#top-layer').hasClass('moved')) {
            $('#top-layer').stop().toggleClass('moved');
            setTimeout(function () {
                $('#top-layer').stop().toggleClass('line');
                setTimeout(function () {
                    if (!$('#top-layer').hasClass('moved')) {
                        rotM($('#top-layer > div:nth-child(3)'));
                        $("#omoss").fadeOut(500, function () {
                            $("#omoss").text("Om Oss");
                            $("#omoss").fadeIn(500);
                        });
                    }
                }, 1000);
            }, 1000);
        } else {
            $('#top-layer').stop().toggleClass('line');
            setTimeout(function () {
                $('#top-layer').stop().toggleClass('moved');
                setTimeout(function () {
                    if ($('#top-layer').hasClass('moved')) {
                        rotP($('#top-layer > div:nth-child(3)'));
                        $("#omoss").fadeOut(500, function () {
                            $("#omoss").text("Bilder");
                            $("#omoss").fadeIn(500);
                        });
                    }
                }, 1000);
            }, 1000);
        }
    });

    $("#smallBilder > div > li").click(function () {
        var clickSrc = $(this).css("background-image"),
            theSrc = clickSrc.substring(5, clickSrc.length - 2);

        bsc = $(this).attr("id");
        bscN = parseInt(bsc.substring(3, bsc.length));
        $("#bscNav > div").removeClass("bigger");
        $("#bscNav > div:nth-child(" + bscN + ")").addClass("bigger");

        $("#pV").show();
        $("#pH").show();
        if (bscN === 8) {
            $("#pH").hide();
        } else if (bscN === 1) {
            $("#pV").hide();
        }

        $("#bildShowCase > img").attr("src", theSrc);
        $("#nav-icon2").addClass('open');
        $("#bildShowCase").show();
        $("#menu").stop().fadeIn(250);
        setBetween();
    });

    $(".pil").click(function () {
        var left;
        $("#bscNav > div").removeClass("bigger");
        if ($(this).attr("id") === "pV") {
            bscN -= 1;
            left = true;
        } else {
            bscN += 1;
            left = false;
        }

        $("#pV").show();
        $("#pH").show();
        if (bscN === 8) {
            $("#pH").hide();
        } else if (bscN === 1) {
            $("#pV").hide();
        }
        $("#bscNav > div:nth-child(" + bscN + ")").addClass("bigger");

        var clickSrc = $("#bsc" + bscN).css("background-image"),
            theSrc = clickSrc.substring(5, clickSrc.length - 2);

        $("#bildShowCase > img").fadeOut(250, function () {
            $("#bildShowCase > img").attr("src", theSrc);
            if (left) {
                $(this).css("left", "-50%");
            } else {
                $(this).css("left", "150%");
            }
            $(this).show();
            $(this).animate({
                left: "50%"
            }, 1000, "easeOutCubic");
            setBetween();
        });
    });

    $("#content-1 > img").load(function () {
        $(this).remove();
        $('#content-1 > div:nth-child(1)').fadeIn(1000);
    });

    $("#content-1 > i").click(function () {
        hopp = false;

        $("html, body").stop().animate({
            scrollTop: $("#omoss").offset().top - 25
        }, 1500);
    });

    $("#text-menu li:not(:first-child)").click(function () {
        if ($("#nav-icon2").hasClass('open')) {
            $("#nav-icon2").toggleClass('open');
            $('#menu').stop().fadeToggle(250);
            $('#text-menu').stop().toggleClass('animation');

            var liClicked = $(this).text().toLowerCase().replace(/\s+/g, '');

            if (liClicked === "bilder") {
                liClicked = "omoss";
                setTimeout(function () {
                    if (!$('#top-layer').hasClass('moved')) {
                        $('#top-layer > div:nth-child(3)').click();
                    }
                }, 1500);
            } else if (liClicked === "omoss") {
                setTimeout(function () {
                    if ($('#top-layer').hasClass('moved')) {
                        $('#top-layer > div:nth-child(3)').click();
                    }
                }, 1500);
            }
            $("html, body").stop().animate({
                scrollTop: $("#" + liClicked).offset().top - 25
            }, 1500);
        }
    });

    setInterval(function () {
        if (j) {
            var ib;
            if (cb === 3) {
                ib = 1;
            } else {
                ib = cb + 1;
            }

            $('#content-1 > div:nth-child(' + ib + ')').css("left", "100%");
            $('#content-1 > div:nth-child(' + ib + ')').show();
            $('#content-1 > div:nth-child(' + ib + ')').animate({
                left: "0%"
            }, 2000, "easeInOutQuart");

            $('#content-1 > div:nth-child(' + cb + ')').css("left", "0%");
            $('#content-1 > div:nth-child(' + cb + ')').animate({
                left: "-100%"
            }, 2000, "easeInOutQuart");

            setTimeout(function () {
                $('#content-1 > div:nth-child(' + cb + ')').hide();
                if (cb === 3) {
                    cb = 1;
                } else {
                    cb += 1;
                }
            }, 4500);
        }
    }, 6000);

    $(window).scroll(function () {
        hopp = false;

        if ($(window).scrollTop() < $(window).height()) {
            moveUp(".background > div");

            if ($(window).scrollTop() < 50) {
                j = true;
            } else {
                j = false;
            }
        }
    });

    function uppNer() {
        if (hopp) {
            $("#content-1 > i").animate({
                bottom: '30px'
            }, 750).animate({
                bottom: '0px'
            }, 500, uppNer);
        }
    }

    function setBetween() {
        var top = parseInt($("#bildShowCase > img").position().top) + $("#bildShowCase > img").height();

        $("#bscNav").css("top", (top + ($(window).height() - top) / 2) + "px");
    }

    function moveUp(element) {
        var currentTop = $(window).scrollTop(),
            opa = 1 - (currentTop * 1.2 / ($(window).height())),
            speed = 1 - (currentTop / ($(window).height())),
            e = $(element);

        e.css("opacity", opa);
        e.css("top", (50 * speed) + "vh");
    }

    function rotP(element) {
        $(element).stop().css({
            transform: 'rotate(-45deg)'
        });
    }

    function rotM(element) {
        $(element).stop().css({
            transform: 'rotate(135deg)'
        });
    }

    function fitText(e, p) {
        var eFont = 1,
            done = true;

        while (done) {
            eFont += 1;
            $(e).css("font-size", eFont + "px");

            if (parseInt($(e).height()) > parseInt($(p).height())) {
                eFont -= 1;
                $(e).css("font-size", eFont + "px");
                done = false;
            }
        }
    }

    $("#treBilder > div:nth-child(3)").hover(function () {
            $("#treBilder > div:nth-child(1)").css("margin-left", "-73%");
        },
        function () {
            $("#treBilder > div:nth-child(1)").css("margin-left", "-49%");
        });

    setTimeout(function () {
        fitText("#omText", "#fitText");
    }, 100);
    uppNer();

    $(window).resize(function () {
        fitText("#omText", "#fitText");
        setBetween();
    });
});