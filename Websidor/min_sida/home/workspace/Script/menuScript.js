    var breadTop, reSizeIt, defaultPosition, activeElement, indicatorPosition, change;
    var fromSide = document.getElementById("fromSide"),
        bread = document.getElementById("bread"),
        darkColor = "#2b2b2b",
        redColor = "#de1b1b",
        noMorePlox = true,
        notClicked = true;

    function setHeader() {
        if ($(window).width() <= 630) {
            if (change != 110) {
                setHeaderAnimation(110, 200, 200);
            }
        } else if ($(window).width() <= 680) {
            if (change != 120) {
                setHeaderAnimation(120, 220, 220);
            }
        } else if ($(window).width() <= 730) {
            if (change != 130) {
                setHeaderAnimation(130, 240, 240);
            }
        } else if ($(window).width() <= 780) {
            if (change != 140) {
                setHeaderAnimation(140, 260, 260);
            }
        } else if ($(window).width() > 780) {
            if (change != 150) {
                setHeaderAnimation(150, 280, 280);
            }
        }
    }

    function setHeaderAnimation(fontsizeV, leftV, widthV) {
        change = fontsizeV;
        $("h1").clearQueue().stop();
        $("#loga").clearQueue().stop();
        $("h1").animate({
            fontSize: fontsizeV + "px",
            left: leftV + "px"
        }, 500);
        $("#loga").animate({
            width: widthV + "px"
        }, 500);
    }

    function setActive() {
        $("#cssmenu > ul > li").each(function () {
            if ($(this).hasClass('active')) {
                activeElement = $(this);
            }
        });

        defaultPosition = activeElement.position().left + activeElement.width() / 2 - 5;
    }

    function dotAnimateStuff() {
        notClicked = false;
        clearBlinking();
        if (noMorePlox) {
            var el = $("#colorAnimate");
            var str = el.text();
            var len = str.length;
            noMorePlox = false
            var newHtml = "";

            for (var i = 0; i < len; i++) {
                if (i == len - 1) {
                    newHtml = newHtml + "<span class='animatedLetters' id='dotAnimate' onclick='dotAnimateStuff()'>" + el.text().charAt(i) + "</span>";
                } else {
                    newHtml = newHtml + "<span class='animatedLetters'>" + el.text().charAt(i) + "</span>";
                }
            }

            el.html(newHtml);

            var timeout = 0;
            $($("#colorAnimate span").get().reverse()).each(function () {
                var curel = $(this);
                setTimeout(function () {
                    curel.animate({
                        color: $.Color("white")
                    }, 1000);
                }, timeout);
                timeout = timeout + 100;
            });
            var timeout = 0;
            setTimeout(function () {
                $("#colorAnimate span").each(function () {
                    var curel = $(this);
                    setTimeout(function () {
                        curel.animate({
                            color: $.Color(redColor)
                        }, 1000);
                    }, timeout);
                    timeout = timeout + 100;
                });
            }, 2500);

            setTimeout(function () {
                noMorePlox = true;
            }, 4500);
        }
    }

    function constantBlinking() {
        $("#dotAnimate").animate({
            opacity: 0.1
        }, 500, function () {
            $("#dotAnimate").animate({
                opacity: 1
            }, 500);
        });
    }

    function clearBlinking() {
        clearInterval(noticeMeSenpai);
        $("#dotAnimate").stop();
        $("#dotAnimate").css("opacity", 1);
    }

    var noticeMeSenpai = setInterval(constantBlinking, 2000);

    $(document).ready(function () {
        $("h1").on("mouseenter", "#dotAnimate", function fading() {
            if (noMorePlox) {
                clearBlinking();
                $("#dotAnimate").animate({
                    opacity: 0.1
                }, 500, function () {
                    $("#dotAnimate").animate({
                        opacity: 1
                    }, 500, function () {
                        fading();
                    });
                });
            }
        });
        $("h1").on("mouseleave", "#dotAnimate", function () {
            if (noMorePlox) {
                $("#dotAnimate").stop();
                $("#dotAnimate").css("opacity", 1);
                if (notClicked) {
                    noticeMeSenpai = setInterval(constantBlinking, 2000);
                }
            }
        });
    });

    (function ($) {

        $.fn.menumaker = function (options) {

            var cssmenu = $(this),
                settings = $.extend({
                    title: "Menu",
                    format: "dropdown",
                    breakpoint: 700,
                    sticky: false
                }, options);

            return this.each(function () {
                cssmenu.find('li ul').parent().addClass('has-sub');
                if (settings.format != 'select') {
                    cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
                    $(this).find("#menu-button").on('click', function () {
                        $(this).toggleClass('menu-opened');
                        var mainmenu = $(this).next('ul');

                        if (mainmenu.hasClass('open')) {
                            mainmenu.hide().removeClass('open');
                            bread.style.top = breadTop + "px";
                        } else {
                            mainmenu.show().addClass('open');
                            bread.style.top = breadTop + document.getElementsByClassName("open")[0].clientHeight + "px";
                            if (settings.format === "dropdown") {
                                mainmenu.find('ul').show();
                            }
                        }
                        var height = $("#topcontainer").height() + $("#fromSide").height() + 24;
                        if (height + $("footer").height() < $(window).height()) {
                            $("footer").css("top", $(window).height() - $("footer").height() + "px");
                        } else {
                            $("footer").css("top", height + "px");
                        }
                    });

                    multiTg = function () {
                        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                        cssmenu.find('.submenu-button').on('click', function () {

                            $(this).toggleClass('submenu-opened');
                            if ($(this).siblings('ul').hasClass('open')) {
                                $(this).siblings('ul').removeClass('open').hide();
                            } else {
                                $(this).siblings('ul').addClass('open').show();
                            }
                        });
                    };

                    if (settings.format === 'multitoggle') multiTg();
                    else cssmenu.addClass('dropdown');
                } else if (settings.format === 'select') {
                    cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
                    var selectList = cssmenu.find('select');
                    selectList.append('<option>' + settings.title + '</option>', {
                        "selected": "selected",
                        "value": ""
                    });
                    cssmenu.find('a').each(function () {
                        var element = $(this),
                            indentation = "";
                        for (i = 1; i < element.parents('ul').length; i++) {
                            indentation += '-';
                        }
                        selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
                    });
                    selectList.on('change', function () {
                        window.location = $(this).find("option:selected").val();
                    });
                }

                if (settings.sticky === true) cssmenu.css('position', 'fixed');

                resizeFix = function () {
                    if ($(window).width() > settings.breakpoint) {
                        cssmenu.find('ul').show();
                        cssmenu.removeClass('small-screen');
                        if (settings.format === 'select') {
                            cssmenu.find('select').hide();
                        } else {
                            cssmenu.find("#menu-button").removeClass("menu-opened");
                        }
                    }

                    if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
                        cssmenu.find('ul').hide().removeClass('open');
                        cssmenu.addClass('small-screen');
                        if (settings.format === 'select') {
                            cssmenu.find('select').show();
                        }
                    }
                };
                resizeFix();
                return $(window).on('resize', resizeFix);

            });
        };
    })(jQuery);

    (function ($) {
        $(document).ready(function () {
            setHeader();

            $(window).load(function () {
                $("#cssmenu").menumaker({
                    title: "Menu",
                    format: "dropdown"
                });


                $('#cssmenu').prepend("<div id='menu-indicator'></div>");

                var foundActive = false,
                    indicator = $('#cssmenu #menu-indicator'),
                    overPosition1 = $("#kontakt"),
                    whatElement1 = $("#menu-list-kontakt"),
                    overPosition2 = $("#historia"),
                    whatElement2 = $("#menu-list-historia"),
                    menuLeftPosition, menuTopPosition, tryAgain1, tryAgain2, tryAgain3, moveMouse1, moveMouse2, moveMouse3, indicatorMove;

                $("#cssmenu > ul > li").each(function () {
                    if ($(this).hasClass('active')) {
                        activeElement = $(this);
                        foundActive = true;
                    }
                });

                if (foundActive === false) {
                    activeElement = $("#cssmenu > ul > li").first();
                }

                defaultPosition = indicatorPosition = activeElement.position().left + activeElement.width() / 2 - 5;

                $("#menu-list-kontakt").hide();
                $("#menu-list-historia").hide();

                indicator.css("left", indicatorPosition);

                $("#cssmenu > ul > li").hover(function () {
                        clearTimeout(indicatorMove);
                        activeElement = $(this);
                        indicatorPosition = activeElement.position().left + activeElement.width() / 2 - 5;
                        indicator.css("left", indicatorPosition);
                    },

                    function () {
                        indicatorMove = setTimeout(function () {
                            indicator.css("left", defaultPosition);
                        }, 100);
                    });

                $(".dropitdown").hover(function () {
                        clearTimeout(indicatorMove);
                        indicatorPosition = activeElement.position().left + activeElement.width() / 2 - 5;
                        indicator.css("left", indicatorPosition);
                    },
                    function () {
                        indicator.css("left", defaultPosition);
                    });

                $("#hem").hover(function () {
                        $("#hem").css("color", darkColor);
                    },

                    function () {
                        setTimeout(function () {
                            $("#hem").css("color", redColor);
                            $(".active > a").css("color", darkColor);
                        }, 100);
                    });

                $("#sortiment").hover(function () {
                        $("#sortiment").css("color", darkColor);
                    },

                    function () {
                        setTimeout(function () {
                            $("#sortiment").css("color", redColor);
                            $(".active > a").css("color", darkColor);
                        }, 100);
                    });

                $("#kontakt, #menu-list-kontakt").hover(function () {
                        clearTimeout(moveMouse1);
                        var act = $("#liKontakt");
                        overPosition1.css("color", darkColor);
                        if (!$("#cssmenu").hasClass("small-screen")) {
                            $("#menu-list-kontakt").css("width", 140 + "px");
                            if (act.position().left + act.width() / 2 - 5 == indicator.position().left) {
                                setMenu(whatElement1, overPosition1);
                            } else {
                                tryAgain1 = setTimeout(function () {
                                    setMenu(whatElement1, overPosition1);
                                }, 350);
                            }
                        }
                    },

                    function () {
                        clearTimeout(tryAgain1);
                        moveMouse1 = setTimeout(function () {
                            whatElement1.stop();
                            whatElement1.slideUp(100);
                            overPosition1.css("color", redColor);
                            $(".active > a").css("color", darkColor);
                        }, 100);

                    });

                $("#historia, #menu-list-historia").hover(function () {
                        clearTimeout(moveMouse2);
                        var act = $("#liHistoria");
                        overPosition2.css("color", darkColor);

                        if (!$("#cssmenu").hasClass("small-screen")) {
                            $("#menu-list-historia").css("width", 200 + "px");
                            if (act.position().left + act.width() / 2 - 5 == indicator.position().left) {
                                setMenu(whatElement2, overPosition2);
                            } else {
                                tryAgain2 = setTimeout(function () {
                                    setMenu(whatElement2, overPosition2);
                                }, 350);
                            }
                        }
                    },

                    function () {
                        clearTimeout(tryAgain2);
                        moveMouse2 = setTimeout(function () {
                            whatElement2.stop();
                            whatElement2.slideUp(100);
                            overPosition2.css("color", redColor);
                            $(".active > a").css("color", darkColor);
                        }, 100);

                    });

                $("#hittahit").hover(function () {
                        $("#hittahit").css("color", darkColor);
                    },

                    function () {
                        setTimeout(function () {
                            $("#hittahit").css("color", redColor);
                            $(".active > a").css("color", darkColor);
                        }, 100);
                    });

                function setMenu(whatElementV, overPositionV) {
                    menuLeftPosition = overPositionV.offset().left + overPositionV.innerWidth() / 2 - whatElementV.innerWidth() / 2;
                    menuTopPosition = overPositionV.parent().parent().parent().position().top + overPositionV.innerHeight() + 5;

                    whatElementV.css("left", menuLeftPosition);
                    whatElementV.css("top", menuTopPosition);
                    whatElementV.css("zIndex", 6);
                    whatElementV.slideDown(100);
                }

                reSizeIt = function () {
                    if ($(window).width() > 580) {
                        $(".antiscroll-inner").css("width", $(window).width() + "px");
                        $(".antiscroll-inner").css("height", $(window).height() + "px");
                        $(".antiscroll-wrap").css("width", $(window).width() + "px");
                        $(".antiscroll-wrap").css("height", $(window).height() + "px");
                    } else {
                        $(".antiscroll-inner").css("width", 580 + "px");
                        $(".antiscroll-wrap").css("width", 580 + "px");
                    }

                    $("#cssmenu > ul > li").each(function () {
                        if ($(this).hasClass('active')) {
                            activeElement = $(this);
                        }
                    });
                    indicatorPosition = activeElement.position().left + activeElement.width() / 2 - 5;
                    indicator.css("left", indicatorPosition);
                    defaultPosition = activeElement.position().left + activeElement.width() / 2 - 5;

                    fromSide.style.left = ($(document).width() / 2) - ($("#fromSide").width() / 2) + "px";

                    setHeader();
                    setTimeout(function () {
                        var height = $("#topcontainer").height() + $("article").height() + 22;
                        if (height + $("footer").height() < $(window).height()) {
                            $("footer").css("top", $(window).height() - $("footer").height() + "px");
                        } else {
                            $("footer").css("top", height + "px");
                        }
                    }, 500);
                }
                $(window).resize(reSizeIt);
            });
        });
    })(jQuery);