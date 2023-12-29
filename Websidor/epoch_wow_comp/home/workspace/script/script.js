$(document).ready(function () {
    /*global $*/
    var element, ele, compEle = $('.exampleClass'), pickLeft, role;
    
    $('.pil').click(function () {
        $(this).toggleClass('pilNer');
        $(this).toggleClass('pilUpp');
        $('#lootreminder').toggleClass('lootNer');
        $('#backspace').toggleClass('pilAdjust');
    });
    
    $(window).mouseup(function() {
        $(window).off("mousemove");
        if ($('.none:hover.glow').length != 0 && element != null && $('.floatingCell').length != 0 && pickLeft) {
            ele = $('.none:hover.glow');
            addCell(ele);
            $('.floatingCell').remove();
            
        } else if($('.glow:hover').length != 0 && $('.floatingCell').length != 0 && !pickLeft){
            ele = $('.glow:hover');
            if(ele.parent().attr('class') == role || ele.parent().attr('class') == 'roleDesc'){
                compEle.text($('.floatingCell').text());
            }else{
                addCell(ele);
            }
            $('.floatingCell').remove();
        } else if($('.floatingCell').length != 0){
            if(element != null){element.parent().css('display', 'table-row');}
            $('.floatingCell').remove();
        }
        checkRows();
    });
    $('#leftTable > tbody > tr:not(:first-child) > td').mousedown(function(e) {
        element = $(this);
        pickLeft = true;
        
        $('#leftTable').parent().append('<table class="floatingCell '+$(this).attr('class')+'" id="'+$(this).attr('id')+'"><tr><td>' + $(this).text() + '</tr></td></table>');
        var eleTop = e.pageY - element.offset().top,
            eleLeft = e.pageX - element.offset().left;
        $(this).parent().css('display', 'none');
        $(".floatingCell").css('top', e.pageY - eleTop); 
        $(".floatingCell").css('left', e.pageX - eleLeft);
        
        $(window).mousemove(function(e){
            $(".floatingCell").css('top', e.pageY - eleTop); 
            $(".floatingCell").css('left', e.pageX - eleLeft);
        });
    });
    
    $('#compTable').on('mousedown', '.glow.none', function(e) {
        if($(this).text() !== ''){
            pickLeft = false;
            compEle = $(this);
            role = $(this).parent().attr('class');
            element = $("#leftTable > tbody > tr > td#"+$(this).attr('id'));
            
            $('#leftTable').parent().append('<table style="width: '+($(this).width()+4)+'px !important;" class="floatingCell '+element.attr('class')+'" id="'+element.attr('id')+'"><tr><td>' + element.text() + '</tr></td></table>');
            compEle.text('');
            var eleTop = e.pageY - $(this).offset().top,
                eleLeft = e.pageX - $(this).offset().left-2;
            $(".floatingCell").css('top', e.pageY - eleTop); 
            $(".floatingCell").css('left', e.pageX - eleLeft);
        
            $(window).mousemove(function(e){
                $(".floatingCell").css('top', e.pageY - eleTop); 
                $(".floatingCell").css('left', e.pageX - eleLeft);
            });
        } else{compEle = $('.exampleClass');}
    });
    
    $('#compTable').on('click', '.compTd', function(){
        $('.glow').removeClass('glow');
        $('.glowTop').removeClass('glowTop');
        $('.glowBottom').removeClass('glowBottom');
        $('#leftTable > tbody > tr').css('display', 'table-row');
        
        var index = getIndex(this),
        yLength = $('#compTable > tbody').children().length,
        xLength = $('#compTable > tbody > tr:nth-child(1)').children().length;

        for(var x = 1; x < xLength+1; x++){
            for(var y = 1; y < yLength+1; y++){
                var box = $('#compTable > tbody > tr:nth-child('+y+') > td:nth-child('+x+')');
                if(getIndex(box) == index){
                    box.addClass('glow');
                    if(y == 1){
                        $('#compTable > tbody > tr:nth-child(1) > td:nth-child('+x+')').addClass('glowTop');
                    }else if(y == yLength){
                        $('#compTable > tbody > tr:nth-child('+y+') > td:nth-child('+x+')').addClass('glowBottom');
                    }
                    if(box.text() !== '' && y !== 1 && y !== yLength-1 && box.text() !== 'Tanks' && box.text() !== 'Healers' && box.text() !== 'Melee' && box.text() !== 'Ranged'){
                        $("#leftTable > tbody > tr > td#"+box.attr('id')).parent().css('display', 'none');
                    }
                }
            }
        }
    });
    
    function checkRows(){
        var yLength = $('#compTable > tbody').children().length,
            xLength = $('#compTable > tbody > tr:nth-child(1)').children().length,
            emptyColumn = 0, tankC = 0, healerC = 0, meleeC = 0, rangedC = 0;
        for(var y = 1; y <= yLength; y++){
            for(var x = 1; x < xLength+1; x++){
                if($('#compTable > tbody > tr:nth-child('+y+') > td:nth-child('+x+')').text() == ''){
                    emptyColumn++;
                }
            }
            if(emptyColumn == xLength){
                var roll = $('#compTable > tbody > tr:nth-child('+y+')').attr('class');
                if(roll == 'tanks'){
                    if(tMin == null){var tMin = y;}
                    tankC++;
                }else if(roll == 'healers'){
                    if(hMin == null){var hMin = y;}
                    healerC++;
                }else if(roll == 'melee'){
                    if(mMin == null){var mMin = y;}
                    meleeC++;
                }else if(roll == 'ranged'){
                    if(rMin == null){var rMin = y;}
                    rangedC++;
                }
            }
            emptyColumn = 0;
        }
        if(tankC > 1){2
            $('#compTable > tbody > tr:nth-child('+tMin+')').remove();
            checkRows();
        }else if(healerC > 1){
            $('#compTable > tbody > tr:nth-child('+hMin+')').remove();
            checkRows();
        }else if(meleeC > 1){
            $('#compTable > tbody > tr:nth-child('+mMin+')').remove();
            checkRows();
        }else if(rangedC > 1){
            $('#compTable > tbody > tr:nth-child('+rMin+')').remove();
            checkRows();
        }
        for(var x = 1; x < xLength+1; x++){
            var xTot = 0;
            for(var y = 1; y <= yLength; y++){
                if($('#compTable > tbody > tr:nth-child('+y+') > td:nth-child('+x+')').text() != ''){
                    xTot++;
                }
            }
            $('.total:nth-child('+x+')').text(xTot-6);
        }
    }
    
    function addCell(ele){
        if(ele.text() != ''){
            $("*[id*='"+ele.attr('id')+"']:hidden").parent().css('display', 'table-row');
        }
        ele.text($('.floatingCell').text());
        ele.removeClass();
        ele.addClass('none compTd glow');
        ele.addClass(element.attr('class'));
        ele.removeAttr('id');
        ele.attr('id', element.attr('id'));
        element = null;
            
        if($("#compTable > tbody > tr:nth-child("+(ele.parent().index()+2)+")").children().hasClass('none') != true){
            var addto = $("#compTable > tbody > tr:nth-child("+(ele.parent().index()+1)+")"),
                string = "",
                sameRole = ele.parent().attr('class');
            for(var i = 0; i < $('#compTable > tbody > tr:nth-child(1)').children().length; i++){
                string = string + '<td class="none compTd"></td>';
            }
            addto.after('<tr class="'+sameRole+'">' + string + '</tr)');
        }
        $('#compTable > tbody > tr:nth-child(1) > td:nth-child('+(ele.index()+1)+')').click();
    }
    
    function getIndex(element){
        return $('#compTable > tbody > tr > td').index(element)%$('#numLines').text()+1;
    }
    
    $('#compTable > tbody > tr:nth-child(1) > td:nth-child(1)').click();
    
    $('#clear').click(function(){
        var ele = $('.none');
        ele.text('');
        ele.removeClass('warrior paladin warlock shaman rogue priest monk mage hunter druid demon_hunter deathknight');
        ele.attr('id','');
        $('#leftTable > tbody > tr').css('display', 'table-row');
        checkRows();
    });
    
    $('#save').click(function(){
        var storeData = {};
        var yLength = $('#compTable > tbody').children().length,
            xLength = $('#compTable > tbody > tr:nth-child(1)').children().length;
            
        for(var x = 1; x < xLength+1; x++){
            var newArr = [''];
            for(var y = 2; y <= yLength-1; y++){
                var text = $('#compTable > tbody > tr:nth-child('+y+') > td:nth-child('+x+')').text();
                if(text == 'Tanks' || text == 'Healers' || text == 'Melee' || text == 'Ranged' || text == ''){continue;}
                newArr.push(text);
            }
            storeData["boss" + x] = newArr;
        }
        $('#lootreminder').append(JSON.stringify(storeData, null, 4));
        $('#loadingBox').css('opacity', 1);
        $.ajax({
            type: "POST",
            url: 'saveit.php',
            data: storeData,
            success: function(response){
                if(response !== ''){
                    alert(response);
                }
                $('#loadingText').css('opacity', '0');
                $('.spinner').css('opacity', '0');
                $('#loadingBox').css('width', '100px');
                $('#checkFA').css('opacity', '1');
                
                setTimeout(function(){
                    $('#loadingBox').css('opacity', 0);
                }, 1000);
                
                setTimeout(function(){
                    $('#loadingText').css('opacity', '1');
                    $('.spinner').css('opacity', '1');
                    $('#loadingBox').css('width', '175px');
                    $('#checkFA').css('opacity', '0');
                }, 2000);
            }
        });
    });
    checkRows();
});
