var ammunition =0;//патроны макс знач 36
var timer_last=20;//секунд до поражения
var lvl=1; //текущий уровень
var specialLvl=5;//уровни после 11
var duck_speed=1000;//милесекунды между которыми утка меняет положение
var protector=1;//защита от проигрыша по патронам в время открытого магазина
var money=20000;//текущие деньги
var moneyPrize=0;//назначенная награда за уровень
var continueGame = 0; //возможность продолжения по сле проигрыша сохранив апгрейды
var clickTrigger = "click"; //тип нажатия ниначто не влият просто тип оружия для проверки
var feedingUp = 0;// подкорм для уток увеличивает утку
var slowingDuck = 0;//замедлить утку на 100 долисекунд
var WeaponDamage = 1;//урон оружия
var upgradeDamageResolution = 3;// насколько можно повысить урон
var youDied = true;//запрещает клацать на экран если вы мертвы
var maxAmmunition = 3;//максимум патронов ограничено 36
var duckRoflProtector = false;// пока фолс можно вызвать бонус
var duckRoflProtectorClick = false;// пока фолс можно нажимать на бонус утку
var BonusPosTop = 0;//позиционирование бонусной рулетки
var BonusPosLeft = 0;//поз бонус релетки
var randBonusAnimation=0;//тип картинки которая в конце рулетки
var presenceDog = false;//наличие собаки
//для утки 1
var duckQuantity = 1;//количество уток
var PositionLeft=0;//макс лефт 1540   
var PositionTop=0; //620
var ammunitionProtector=1; //защита подстрела мертвой уткиъ
var utochkaHp = 1;//покачто макс знач 10
//для утки 2
var PositionLeftDuck2=0;//макс лефт 1540   
var PositionTopDuck2=0; //620
var utochkaHpDuck2 = 1;//хп утки 2
var ammunitionProtectorDuck2 = 1;//запрет клик на мертвую утку 2
//для утки 3
var PositionLeftDuck3=0;//макс лефт 1540   
var PositionTopDuck3=0; //620
var utochkaHpDuck3 = 1;//хп утки 2
var ammunitionProtectorDuck3 = 1;//запрет клик на мертвую утку 2


var soundShot = new Audio(); //переменная звука для выстрелов
var soundBack = new Audio(); //переменная звука заставка
var soundDuckQuack = new Audio(); //переменная звука кря утки
// setTimeout('playSoundBack("buy.mp3")', 1);


$(".start").bind("click",StartGame);
function StartGame() {
   // playSoundBack("intro.mp3");//музыка вступление интро не забыть раскоментить и мэйби убавить громкость
    ammunitionProtector=0;//защита подстрела мертвой утки снята
    ammunitionProtectorDuck2=0;//разрешить клик на утку 2
    ammunitionProtectorDuck3=0;//разрешить клик на утку 3
    protector=0;//снять предохранитель
    youDied = false;//разрешение клацать на экран

    SelectLvl();//выбор уровня сложности
    add_amunation();//добавить иконки патронов//показать пустые ячейки для патронов
    showDuckHp();//показать хп утки

    if(feedingUp>=1){//накормить утку увеличив ее
        var heightDuck = parseInt($(".utochka").css("height"), 10)+feedingUp*50;
        $(".utochka").css('height',heightDuck+'px');
        var widthDuck = parseInt($(".utochka").css("width"), 10)+feedingUp*50;
        $(".utochka").css('width',widthDuck+'px');
        feedingUp=0;
    }
    
    if(slowingDuck>=1){//напоить утку замедлив ее
        duck_speed+=slowingDuck*100;

        var leftTransition = $(".utochka").css("transition");// получить стринг css значение transition( transition: left 1s, top 1s;)
        var leftNum = leftTransition.indexOf("left")+5; //ищем в стринг позицию слова лефт(0) и добавляем ее длину + пробел
        leftTransition = leftTransition.substr(leftNum,3);//вырезаем 3 символа после слова лефт
        leftTransition = parseFloat(leftTransition);//превращаем стринг в флоат
        leftTransition+=0.1*slowingDuck;// замедляем утку на десятую секунды за каждый хмель
        leftTransition=leftTransition.toFixed(1);//округляем до десятых 1.2

        var topTransition = $(".utochka").css("transition");
        leftNum = topTransition.indexOf("top")+4;
        topTransition = topTransition.substr(leftNum,3);
        topTransition = parseFloat(topTransition);
        topTransition+=0.1*slowingDuck;
        topTransition=topTransition.toFixed(1);
        var transitionString = "left "+leftTransition+"s, top "+topTransition+"s";//объеденяем все значения в 1 стринг
        $(".utochka").css('transition',transitionString);//подставляем стринг в значение css

        slowingDuck=0;
    }
    
    $(".thisLvlInfo").show();
    $(".nextLvlInfo").hide();
    $(".shop").hide();//спрятать магазин
    $(".start").hide(); //убрать кнопку запуска
    $(".utochka").css('background-image','url("utka.gif")');//назначить анимацию полета
    $(".utochka").show(1000); //показать утку
    DuckPosition = setInterval(DuckPositionInSpace, duck_speed);//положения утки и скорость его иизменения
    timerHunt = setInterval(timer_Hunt, 1000);//обратный отсчет до порожения

    if(duckQuantity>=2){//если утки 2
        $(".utochka2").css('background-image','url("utka2.gif")');//назначить анимацию полета
        $(".utochka2").show(1000); //показать утку
//кормим утку два увеличивая ее
        if(feedingUp>=1){
            $(".utochka2").css('height',heightDuck+'px');
            $(".utochka2").css('width',widthDuck+'px');
        }
//замедляем утку хмелем
        if(slowingDuck>=1){
            $(".utochka2").css('transition',transitionString);//подставляем стринг в значение css
        }
    }//конец вторая утка
    if(duckQuantity>=3){//если утки 2
        $(".utochka3").css('background-image','url("utka3.gif")');//назначить анимацию полета
        $(".utochka3").show(1000); //показать утку
//кормим утку два увеличивая ее
        if(feedingUp>=1){
            $(".utochka3").css('height',heightDuck+'px');
            $(".utochka3").css('width',widthDuck+'px');
        }
//замедляем утку хмелем
        if(slowingDuck>=1){
            $(".utochka3").css('transition',transitionString);//подставляем стринг в значение css
        }
    }//конец вторая утка
}

function add_amunation(){// назначить колличество патронов вначале игры
    if(ammunition>maxAmmunition){ammunition=maxAmmunition;}//если больше максимума то максимум
    $('.inventory').children().removeClass("patron");// очистить иконки патронов
    for( var i=0; i<ammunition; i++){
    $('.inventory').children().eq(i).addClass("patron"); 
    } 
    //отображать пустые ячейки
    for( var i=ammunition; i<maxAmmunition; i++){
    $('.inventory').children().eq(i).addClass("emptyPatron"); 
    } 
}

function showDuckHp(){
    $('.utochkaHpBlock').children().removeClass("utochkaHp");// очистить иконки сердечек
    for( var i=0; i<utochkaHp; i++){
    $('.utochkaHpBlock').children().eq(i).addClass("utochkaHp"); 
    } 
}

//случайная генерация положения утки
function DuckPositionInSpace(){
    if(utochkaHp>=1){
        var randPositionDuck = Math.floor(Math.random() * (1541 - 0)) + 0;//горизонт поз

        if(PositionLeft>=randPositionDuck){//направление носа утки в зависимости от движения
            $(".utochka").css("transform", "scaleX(-1)");
        } else {
            $(".utochka").css("transform", "scaleX(1)");
        }
        PositionLeft = randPositionDuck;
        $(".utochka").css("left", PositionLeft+"px");

        randPositionDuck = Math.floor(Math.random() * (621 - 0)) + 0;//вертикаль поз
        PositionTop=randPositionDuck;
        $(".utochka").css("top", PositionTop+"px");

        if(randPositionDuck%3==0){//с вероятность 50% утка крякнет
            playSoundDuckQuack("DuckQuack.mp3"); 
        }
    }
// несколько уток
    if(duckQuantity>=2&&utochkaHpDuck2>=1){//если утки 2
        var randPositionDuck2 = Math.floor(Math.random() * (1541 - 0)) + 0;//горизонт поз

        while (randPositionDuck2-PositionLeftDuck2<300&&PositionLeftDuck2-randPositionDuck2<300) {//нужно фолс когда отличие 100 или бодьше
            randPositionDuck2 = Math.floor(Math.random() * (1541 - 0)) + 0;
        }

        if(PositionLeftDuck2>=randPositionDuck2){//направление носа утки в зависимости от движения
            $(".utochka2").css("transform", "scaleX(-1)");//нос в лево
        } else {
            $(".utochka2").css("transform", "scaleX(1)");//нос в право
        }
        PositionLeftDuck2 = randPositionDuck2;
        $(".utochka2").css("left", PositionLeftDuck2+"px");

        randPositionDuck2 = Math.floor(Math.random() * (621 - 0)) + 0;//вертикаль поз
        PositionTopDuck2=randPositionDuck2;
        $(".utochka2").css("top", PositionTopDuck2+"px");

        if(randPositionDuck2%4==0){//с вероятность 50% утка крякнет
                playSoundDuckQuack("DuckQuack.mp3"); 
        }
    }


    if(duckQuantity>=3&&utochkaHpDuck3>=1){//если утки 3
        var randPositionDuck3 = Math.floor(Math.random() * (1541 - 0)) + 0;//горизонт поз

        while (randPositionDuck3-PositionLeftDuck3<600&&PositionLeftDuck3-randPositionDuck3<600) {//нужно фолс когда отличие 100 или бодьше
            randPositionDuck3 = Math.floor(Math.random() * (1541 - 0)) + 0;
        }

        if(PositionLeftDuck3>=randPositionDuck3){//направление носа утки в зависимости от движения
            $(".utochka3").css("transform", "scaleX(-1)");//нос в лево
        } else {
            $(".utochka3").css("transform", "scaleX(1)");//нос в право
        }
        PositionLeftDuck3 = randPositionDuck3;
        $(".utochka3").css("left", PositionLeftDuck3+"px");

        randPositionDuck3 = Math.floor(Math.random() * (621 - 0)) + 0;//вертикаль поз
        PositionTopDuck3=randPositionDuck3;
        $(".utochka3").css("top", PositionTopDuck3+"px");

        if(randPositionDuck3%5==0){//с вероятность 50% утка крякнет
                playSoundDuckQuack("DuckQuack.mp3"); 
        }
    }


}

//таймер
function timer_Hunt(){
//вылезет бонус утка
    var randBonusChance = Math.floor(Math.random() * (11 - 1)) + 1; //от 1 до 15
    if(randBonusChance==1&&duckRoflProtector==false){//c вероятностью 25% при премещении вылезет бонус
        playSoundBack("tosty.mp3");
        duckRoflProtector = true;
        setTimeout("duckRoflProtector = false", 4400);//сумарное на анимацию надо минимум 2800 утка не вылезет 4400милисек
        var randSide = Math.floor(Math.random() * (5 - 1)) + 1;
        switch(randSide){

        case 1://правая утка
            var randPosRofl = Math.floor(Math.random() * (621 - 0)) + 0;
            $(".duckRofl").css("transform", "scale(1,1)");//повернуть утку носом к центру
            $(".duckRofl").css("top", randPosRofl+"px");//0- 620
            $(".duckRofl").css("left", "1728px");// утку не видно на таком позиционировании 1728
            $(".duckRofl").show();
            $(".duckRofl").animate({left: "-=200"}, 700).animate({ left: "+=200"}, 700);//собственная анимация
            BonusPosTop = randPosRofl;//позиция для рулетки топ
            BonusPosLeft = 1528;//лефт
        break;
        case 2://левая утка
            var randPosRofl = Math.floor(Math.random() * (621 - 0)) + 0;
            $(".duckRofl").css("transform", "scale(-1,1)");
            $(".duckRofl").css("top", randPosRofl+"px");//0- 620
            $(".duckRofl").css("left", "-200px");// -200
            $(".duckRofl").show();
            $(".duckRofl").animate({left: "+=200"}, 700).animate({ left: "-=200"}, 700);
            BonusPosTop = randPosRofl;//
            BonusPosLeft = 0;//
        break;
        case 3:// утка сверху
            var randPosRofl = Math.floor(Math.random() * (1531 - 0)) + 0;
            $(".duckRofl").css("transform", "scale(-1, -1)");// отразить по оси игрек
            $(".duckRofl").css("top", "-200px");// 200
            $(".duckRofl").css("left", randPosRofl+"px");// 0-1530
            $(".duckRofl").show();
            $(".duckRofl").animate({top: "+=200"}, 700).animate({ top: "-=200"}, 700);
            BonusPosTop = 0;//
            BonusPosLeft = randPosRofl;//
        break;
        case 4:// утка снизу
            var randPosRofl = Math.floor(Math.random() * (1530 - 0)) + 0;
            $(".duckRofl").css("transform", "scale(1, 1)");// отразить по оси игрек
            $(".duckRofl").css("top", "820px");// 820
            $(".duckRofl").css("left", randPosRofl+"px");// 0-1530
            $(".duckRofl").show();
            $(".duckRofl").animate({top: "-=200"}, 700).animate({ top: "+=200"}, 700);
            BonusPosTop = 620;//
            BonusPosLeft = randPosRofl;//
        break;
        }//конец свитч
    }//кнец скрипт бонус утка
    
    timer_last--;
    $(".timer_center").html("Таймер "+timer_last);
    if(timer_last<=0){
     ammunition=0;
     gameOver();
    }
}

//клик по бонус утке
$(".duckRofl").bind("click", duckRoflBonus);
function duckRoflBonus(){//переделать блок в имг чтоб гиф заново. или удалять дум хтмл а потом добавлять
    // if(duckRoflProtectorClick==true){return;}//защита от дабл клика по утке
    // setTimeout("duckRoflProtectorClick = false", 1600);
    // duckRoflProtectorClick=true;//конец защита мэйби она не нужнат.к. приз ее загараживает и является не кликабельным
var randBonus = Math.floor(Math.random() * (5 - 1)) + 1;//получаем рандомный из 4 бонус
    $(".duckRoflBonus").show();
    $(".duckRoflBonus").css("top", BonusPosTop+"px");
    $(".duckRoflBonus").css("left", BonusPosLeft+"px");
    $(".duckRoflBonus").attr("src", "duckRoflRuletka.gif");
    playSoundShot("shot_gun.mp3");
    ammunition--;
    add_amunation();
    if(randBonus==1){//приз патроны
        randBonusAnimation=1;
        setTimeout(duckRoflBonusEnd, 800);//800
    }
    else if(randBonus==2){//приз время
        randBonusAnimation=2;
        setTimeout(duckRoflBonusEnd, 1000);
    }
    else if(randBonus==3){//приз конт
        randBonusAnimation=3;
        setTimeout(duckRoflBonusEnd, 1200);
    }
    else if(randBonus==4){//приз деньги
        randBonusAnimation=4;
        setTimeout(duckRoflBonusEnd, 1400);
    }

}
//призы от подстрела бонус утки
function duckRoflBonusEnd(){
    if(randBonusAnimation==1){$(".duckRoflBonus").attr("src", "duckRoflRuletka1.png");
        playSoundBack("DogShows.mp3");
        ammunition+=4;
        add_amunation();
    }
    else if(randBonusAnimation==2){$(".duckRoflBonus").attr("src", "duckRoflRuletka2.png");
        playSoundBack("DogShows.mp3");
        timer_last+=40;
        $(".timer_center").html("Таймер "+timer_last);
    }
    else if(randBonusAnimation==3){$(".duckRoflBonus").attr("src", "duckRoflRuletka3.png");
        playSoundBack("DogShows.mp3");
        continueGame ++;
    }
    else if(randBonusAnimation==4){$(".duckRoflBonus").attr("src", "duckRoflRuletka4.png");
        playSoundBack("DogShows.mp3");
        money+=300;
        $(".money span").html(money); 
    }

    setTimeout("$('.duckRoflBonus').fadeOut(200)", 1600);
    if(ammunition<=0){ setTimeout(gameOver, 1000);}//если последний патрон потрачен то конец игры
}

//клик по бэк промах
$(".content").bind("click", Miss);
//промах
function Miss(event){
    if(event.target!=this)return; //отменяем всплытие при клике на утку
    if(youDied==true){return;}//нельзя кликать если проиграл
    if(protector==1){alert("не трать патроны кря"); return;}//сработал предохранитель
    playSoundShot("shot_gun.mp3");
    ammunition--; 
    add_amunation();
// анимация промаха
    var contentPosition = $(".content").offset(); //вычислить положение блока
    var truePositionX = (event.pageX - contentPosition.left - 26); //26 половина блока с картинкой
    var truePositionY = (event.pageY - contentPosition.top - 26);

    $(".missImg").stop();//остановить незаконченную анимацию
    $(".missImg").stop();// без двойного стопа анимация не пропадает
    $(".missImg").css("left", truePositionX+"px");
    $(".missImg").css("top", truePositionY+"px");
 
    $(".missImg").fadeIn();
    $(".missImg").fadeOut(500);

 // условие поражения по патронам   
    if(ammunition<=0){
    // alert("game over"); 
    gameOver(); //гейм овер
    }

}
//  клик по утке1
$(".utochka").bind("click", DuckKill,);

function DuckKill(event){
    if (ammunitionProtector==1) {return} //запрет клика по мертвой утке
    //забрать 1 патрон
    if(ammunition<=0){//защита от убийства без патронов
        gameOver();
        return;
    }
    ammunition--; 
    add_amunation();
    // var patronIndex = $(".patron").length;//старый варик вместо адд амунишн удаляли последний
    // var patronBlock = $(".patron")[patronIndex-1];
    // $(patronBlock).removeClass("patron");
    // забрать хп утки
    utochkaHp-=WeaponDamage;
    if(utochkaHp>=1){//если хп у утки осталось то продолжить игру
        showDuckHp();
      
        playSoundBack("shot2.mp3");//скомпилировать микс выстрел + кряк и звук дамага
        return;
    }
    $('.utochkaHpBlock').children().removeClass("utochkaHp");// очистить иконки сердечек
    playSoundShot("shot_gun.mp3");//звук выстрела при убийстве и вук дамага при дмг
    //анимация падения
    $(".utochka").css('background-image','url("duck_hit.png")');
    setTimeout(duckFall, 1400);
    
    ammunitionProtector=1; //запрет клика на утку(мертвую)
    if(presenceDog==true){ setTimeout('dogShowDuck(1);', 4100);}//вылезет собака покажет утку
    if(utochkaHpDuck3<=0&&utochkaHpDuck2<=0&&utochkaHp<=0){completeVictory();}
}

//  клик по утке2
$(".utochka2").bind("click", DuckKill2,);
//
function DuckKill2(event){
    if (ammunitionProtectorDuck2==1) {return} //запрет клика по мертвой утке
    //забрать 1 патрон
    if(ammunition<=0){//защита от убийства без патронов
        gameOver();
        return;
    }
    ammunition--; 
    add_amunation();
    // забрать хп утки
    utochkaHpDuck2-=WeaponDamage;
    if(utochkaHpDuck2>=1){//если хп у утки осталось то продолжить игру
        showDuckHp();
      
        playSoundBack("shot2.mp3");//скомпилировать микс выстрел + кряк и звук дамага
        return;
    }
    
    playSoundShot("shot_gun.mp3");//звук выстрела при убийстве и вук дамага при дмг
    ammunitionProtectorDuck2=1; //запрет клика на утку(мертвую)
    //анимация падения
    $(".utochka2").css('background-image','url("duck_hit.png")');
    setTimeout(duckFall2, 1400);
    
    if(presenceDog==true){ setTimeout('dogShowDuck(2);', 4100);}//вылезет собака покажет утку
    if(utochkaHpDuck3<=0&&utochkaHpDuck2<=0&&utochkaHp<=0){completeVictory();}
}

//  клик по утке3
$(".utochka3").bind("click", DuckKill3,);
//
function DuckKill3(event){
    if (ammunitionProtectorDuck3==1) {return} //запрет клика по мертвой утке
    //забрать 1 патрон
    if(ammunition<=0){//защита от убийства без патронов
        gameOver();
        return;
    }
    ammunition--; 
    add_amunation();
    // забрать хп утки
    utochkaHpDuck3-=WeaponDamage;
    if(utochkaHpDuck3>=1){//если хп у утки осталось то продолжить игру
        showDuckHp();
      
        playSoundBack("shot2.mp3");//скомпилировать микс выстрел + кряк и звук дамага
        return;
    }
 
    playSoundShot("shot_gun.mp3");//звук выстрела при убийстве и вук дамага при дмг
    ammunitionProtectorDuck3=1; //запрет клика на утку(мертвую)
    //анимация падения
    $(".utochka3").css('background-image','url("duck_hit.png")');
    setTimeout(duckFall3, 1400);
    
    if(presenceDog==true){ setTimeout('dogShowDuck(3);', 4100);}//вылезет собака покажет утку
    if(utochkaHpDuck3<=0&&utochkaHpDuck2<=0&&utochkaHp<=0){completeVictory();}
}


//анимация падения
function duckFall(){
    playSoundDuckQuack("DuckFalls.mp3");

    $(".utochka").css('transition','left 2s, top 2s');
    $(".utochka").css('background-image','url("duck_fall.gif")');
    $(".utochka").css("top", "810px");
    setTimeout('$(".utochka").hide();', 2000);
}
//анимация падения утки 2
function duckFall2(){
    playSoundDuckQuack("DuckFalls.mp3");

    $(".utochka2").css('transition','left 2s, top 2s');
    $(".utochka2").css('background-image','url("duck_fall.gif")');
    $(".utochka2").css("top", "810px");
    setTimeout('$(".utochka2").hide();', 2000);
}
//анимация падения утки 3
function duckFall3(){
    playSoundDuckQuack("DuckFalls.mp3");

    $(".utochka3").css('transition','left 2s, top 2s');
    $(".utochka3").css('background-image','url("duck_fall.gif")');
    $(".utochka3").css("top", "810px");
    setTimeout('$(".utochka3").hide();', 2000);
}
//если убиты все утки полная победа
function completeVictory(){
    playSoundBack("win.mp3");
    lvl++;
    money += moneyPrize;
    $(".money span").html(money);  
    protector=1; //поднять предохранитель не проиграть между уровней
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    // $("header").html("следующий уровень нажми начать игру"); 
    $(".thisLvlInfo").hide();
    $(".nextLvlInfo").show();
    setTimeout('$(".start").show();', 1000);//анти лаг магазина
    setTimeout('$(".shop").fadeIn(1000)', 1000);
    
    window.getSelection().removeAllRanges();//снять баг с фокусом магазина
}
//собака показывает утку при победе
function dogShowDuck(duckNumber){
    $(".dogShowDuck").show();
    if(duckNumber==1){$(".dogShowDuck").css("left", PositionLeft+"px");}//вылезет под местом убиения утки
    if(duckNumber==2){$(".dogShowDuck").css("left", PositionLeftDuck2+"px");}//вылезет под местом убиения утки
    if(duckNumber==3){$(".dogShowDuck").css("left", PositionLeftDuck3+"px");}//вылезет под местом убиения утки
    $(".dogShowDuck").animate({top: "-=240"}, 1500).animate({ top: "+=0"}, 500).animate({ top: "+=240"}, 1500).fadeOut();
    playSoundDuckQuack("DogShows.mp3");
    money+=50;
    $(".money span").html(money);
}
//порожение
function gameOver(){
    if(continueGame>=1){//если есть континью не завершать игру
        ammunitionProtector=1;//нельзя нажать на утку
        continueGame--;//забрать конт
        timer_last+=10;//дать 10 сек
        ammunition++;//дать 1 патрон
        add_amunation();
        alert("вы использовали 'кантиниус' "); 
        playSoundDuckQuack("Perfect.mp3");
        // setTimeout('playSoundDuckQuack("Perfect.mp3")', 1000);
        clearInterval(timerHunt);
        clearInterval(DuckPosition);
        protector=1; //поднять предохранитель
        $(".utochka").hide(3000); 
        $(".utochka2").hide(3000); 
        $(".utochka3").hide(3000); 
        $(".start").show(1000);
        $(".shop").fadeIn(1000);
        return;
    }

    if(timer_last<=0){//поражение по таймеру  
        alert("вас заклевали ути(закончился таймер)"); 
    }
    else {//порожение по патронам
        alert("вас заклевали ути(нет патронов)"); 
    } 
//вернуть исходный клик
    if(clickTrigger=="dblclick"){
        $(".content").unbind('dblclick', Miss);
        $(".utochka").unbind('dblclick', DuckKill);
        $(".utochka2").unbind('dblclick', DuckKill2);
        $(".utochka3").unbind('dblclick', DuckKill3);

        $(".content").bind("click", Miss);
        $(".utochka").bind("click", DuckKill);
        $(".utochka2").bind("click", DuckKill2);
        $(".utochka3").bind("click", DuckKill3);
    }
    if(clickTrigger=="mousedown"){
        $(".content").unbind('mousedown', Miss);
        $(".utochka").unbind('mousedown', DuckKill);
        $(".utochka2").unbind('mousedown', DuckKill2);
        $(".utochka3").unbind('mousedown', DuckKill3);

        $(".content").bind("click", Miss);
        $(".utochka").bind("click", DuckKill);
        $(".utochka2").bind("click", DuckKill2);
        $(".utochka3").bind("click", DuckKill3);
    }
    clickTrigger = "click";

    ammunitionProtector = 1;
    youDied = true;
    lvl=1; 
    money=200;
    playSoundBack("Dog_Laughs.mp3");
    $(".utochka").hide(3000); 
    $(".utochka2").hide(3000); 
    $(".utochka3").hide(3000); 
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    $(".start").show(1000);
}
//магазинные товары\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\shop

function buyDog(){
    if(money>=500){
        if(presenceDog==true){//
            alert("у вас уже есть собака");
            return;
        }
        presenceDog=true;
        money-=500;
        $(".money span").html(money);
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $500");}
}

function buyUpgradeDamageResolution(){
    if(money>=1500){
        if(upgradeDamageResolution>=20){//
            alert("вы достигли вершин науки, больше апгрейдить нельзя");
            return;
        }
        upgradeDamageResolution++;
        money-=1500;
        $(".money span").html(money);
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $1500");}
}

function buyMaxAmmunition(){
    if(money>=50){
        if(maxAmmunition>=36){alert("пояс не вмещает больше 36 патронов"); return;}
        money-=50;
        $(".money span").html(money); 
        maxAmmunition++;
        playSoundShot("buy.mp3");
        add_amunation();
    }
    else{alert("вы нищий, нужно $100");} 
}

function buyWunderwaffe(){
    if(money>=1500){
        if(clickTrigger=="dblclick"){
            alert("нельзя улучшить,уже приобретено");
            return;
        }
        upgradeDamageResolution=10;
        clickTrigger="dblclick";
        WeaponDamage=4;
        money-=1500;
        $(".money span").html(money); 
        playSoundShot("Perfect.mp3");
        if(clickTrigger=="mousedown"){
            $(".content").unbind('mousedown', Miss);
            $(".utochka").unbind('mousedown', DuckKill);
            $(".utochka2").unbind('mousedown', DuckKill2);
            $(".utochka3").unbind('mousedown', DuckKill3);
        }
        else{
            $(".content").unbind('click', Miss);
            $(".utochka").unbind('click', DuckKill);
            $(".utochka2").unbind('click', DuckKill2);
            $(".utochka3").unbind('click', DuckKill3);
        }
        $(".content").bind("dblclick", Miss);
        $(".utochka").bind("dblclick", DuckKill);
        $(".utochka2").bind("dblclick", DuckKill2);
        $(".utochka3").bind("dblclick", DuckKill3);
    }
    else{alert("вы нищий, нужно $1500");}
}

function buyWeaponDamage(){
    if(money>=500){
        if(WeaponDamage>=upgradeDamageResolution){//если урон равен возможности грейдить 
            alert("ваши знания недостаточны для улучшения текущег оружия оружия");
            return;
        }
        WeaponDamage++;
        money-=500;
        $(".money span").html(money); 
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $500");}
}

function buyTrigger(){
    if(money>=1500){
        if(clickTrigger=="mousedown"){
            alert("нельзя улучшить,уже приабретено");
            return;
        }
        if(clickTrigger=="dblclick"){
            $(".content").unbind('dblclick', Miss);
            $(".utochka").unbind('dblclick', DuckKill);
            $(".utochka2").unbind('dblclick', DuckKill2);
            $(".utochka3").unbind('dblclick', DuckKill3);
        }
        else{
            $(".content").unbind('click', Miss);
            $(".utochka").unbind('click', DuckKill);
            $(".utochka2").unbind('click', DuckKill2);
            $(".utochka3").unbind('click', DuckKill3);
        }
        $(".content").bind("mousedown", Miss);
        $(".utochka").bind("mousedown", DuckKill);
        $(".utochka2").bind("mousedown", DuckKill2);
        $(".utochka3").bind("mousedown", DuckKill3);
        upgradeDamageResolution=1;
        WeaponDamage=1;
        clickTrigger = "mousedown";
        money-=1500;
        $(".money span").html(money); 
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $500");}
}

function buyDuckSlow(){
    if(money>=50){
        if(slowingDuck>=10)  {
            alert("Утки уже максимально хмельные!");
            return;
        }
        slowingDuck++;
        money-=50;
        $(".money span").html(money); 
        playSoundShot("buy.mp3");
    } 
    else{alert("вы нищий, нужно $50");}
}

function buyFood(){
    if(money>=50){
        if(feedingUp>=3)  {
            alert("Утки уже перекормлены!");
            return;
        }
        feedingUp++;
        money-=50;
        $(".money span").html(money); 
        playSoundShot("buy.mp3");
    } 
    else{alert("вы нищий, нужно $50");} 
}

function buyContinue(){
    if(money>=500){
        continueGame ++;
        money-=500;
        $(".money span").html(money); 
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $500");}
}

function buyTime(){
    if(money>=100){
        timer_last+=10;
        $(".timer_center").html("Таймер "+timer_last);
        money-=100;
        $(".money span").html(money); 
        playSoundShot("buy.mp3");
    }
    else{alert("вы нищий, нужно $100");}
}

function buyAmmunition(){//купить патрон
    if(money>=100){
        if(ammunition>=maxAmmunition){alert("патроны вываливатся из карманов"); return;}
        money-=100;
        $(".money span").html(money); 
        ammunition++;
        add_amunation();
        playSoundShot("buy.mp3");
    }
    else{alert("вы нищий, нужно $100");}  
}

function SelectLvl(){
    if(lvl==1){ //нет патронов
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last=30;
        ammunition=8;
        moneyPrize=50;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=1;
        duckQuantity = 3;// 3 утки
        $(".thisLvlNumber span").html("1");//номер уровня
        $(".thisLvlInfo span").html("береги патроны");
        $(".nextLvlInfo span").html("быстрая утка. таймер +5 патрон +2");
         
      }
      else if(lvl==2){  //быстрая утка
        duck_speed=900;
        $(".utochka").css('transition','left 0.9s, top 0.9s');
        $(".utochka").css('height','200px');
        $(".utochka").css('width','200px');
        timer_last+=5;
        ammunition+=2;
        moneyPrize=150;
        utochkaHp=1;
        utochkaHpDuck2=1;
        duckQuantity = 2;// две утки
        $(".thisLvlNumber span").html("2");//номер уровня
        $(".thisLvlInfo span").html("скоростная утка");
        $(".nextLvlInfo span").html("мелкая утка. таймер 25, патроны +3");
      }
      else if(lvl==3){ //маленькая утка
        duck_speed=1000;
        $(".utochka").css('transition','left 1s, top 1s');
        $(".utochka").css('height','150px');
        $(".utochka").css('width','150px');
        timer_last+=5;
        ammunition+=3;
        moneyPrize=150;
        utochkaHp=11;
        $(".thisLvlNumber span").html("3");//номер уровня
        $(".thisLvlInfo span").html("микро утка");
        $(".nextLvlInfo span").html("времени дадут в обрез, 7 сек.");
      }
      else if(lvl==4){ // мало таймер
        duck_speed=1000;
        $(".utochka").css('transition','left 1s, top 1s');
        $(".utochka").css('height','200px');
        $(".utochka").css('width','200px');
        timer_last+=0;
        ammunition+=2;
        moneyPrize=150;
        utochkaHp=1;
        $(".thisLvlNumber span").html("4");//номер уровня
        $(".thisLvlInfo span").html("заканчивается время");
        $(".nextLvlInfo span").html("бонусных патронов не дадут");
      }
      else if(lvl==5){
        duck_speed=900;
        $(".utochka").css('transition','left 0.9s, top 0.9s');
        $(".utochka").css('height','200px');
        $(".utochka").css('width','200px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=200;
        utochkaHp=1;
        $(".thisLvlNumber span").html("5");//номер уровня
        $(".thisLvlInfo span").html("мало патронов ,а утки быстры");
        $(".nextLvlInfo span").html("бонусных патронов не дадут, а утка мелкая...");
      }
      else if(lvl==6){
        duck_speed=800;
        $(".utochka").css('transition','left 0.8s, top 0.8s');
        $(".utochka").css('height','70px');
        $(".utochka").css('width','70px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=150;
        utochkaHp=1;
        $(".thisLvlNumber span").html("6");//номер уровня
        $(".thisLvlInfo span").html("утка мала а патронов кот наплакал");
        $(".nextLvlInfo span").html("мало патронов и времени");
      }
       else if(lvl==7){
        duck_speed=800;
        $(".utochka").css('transition','left 0.8s, top 0.8s');
        $(".utochka").css('height','200px');
        $(".utochka").css('width','200px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=200;
        utochkaHp=1;
        $(".thisLvlNumber span").html("7");//номер уровня
        $(".thisLvlInfo span").html("нет времени и патронов");
        $(".nextLvlInfo span").html("мелкая но шустрая утка");
      }
       else if(lvl==8){
        duck_speed=500;
        $(".utochka").css('transition','left 0.5s, top 0.5s');
        $(".utochka").css('height','85px');
        $(".utochka").css('width','85px');
        timer_last+=5;
        ammunition+=3;
        moneyPrize=200;
        utochkaHp=1;
        $(".thisLvlNumber span").html("8");//номер уровня
        $(".thisLvlInfo span").html("утки быстры и малы");
        $(".nextLvlInfo span").html("время быстро как и утка");
      }
        else if(lvl==9){
        duck_speed=500;
        $(".utochka").css('transition','left 0.5s, top 0.5s');
        $(".utochka").css('height','185px');
        $(".utochka").css('width','185px');
        timer_last+=0;
        ammunition+=3;
        moneyPrize=300;
        utochkaHp=1;
        $(".thisLvlNumber span").html("9");//номер уровня
        $(".thisLvlInfo span").html("таймер быстрый утка шустра");
        $(".nextLvlInfo span").html("мелкая утка а таймер на 8");
      }
         else if(lvl==10){
        duck_speed=1000;
        $(".utochka").css('transition','left 1s, top 1s');
        $(".utochka").css('height','85px');
        $(".utochka").css('width','85px');
        timer_last+=0;
        ammunition=36;
        moneyPrize=300;
        utochkaHp=1;
        $(".thisLvlNumber span").html("10");//номер уровня
        $(".thisLvlInfo span").html("быстрый таймер а утка с наперсток");
        $(".nextLvlInfo span").html("след уровень отдушина");
      }
       else if(lvl>=11){//адаптивный уровень сложности
        specialLvl+=0.5;
        duck_speed=6000/specialLvl//на 6 1000 скорость утки
        var transitionSpeed=duck_speed/1000+0.00001;
        var transitionStreeng = "left "+transitionSpeed+"s, top "+transitionSpeed+"s";
        $(".utochka").css('transition',transitionStreeng);
    
        var UtkaRazmer = 1190/specialLvl;//получаем разиер на 6 около 200 .размер утки
        $(".utochka").css('height',UtkaRazmer+'px');
        $(".utochka").css('width',UtkaRazmer+'px');
    
        timer_last+=5;
        ammunition+=3;
        if(ammunition>36)ammunition=36;
        moneyPrize=300;
        utochkaHp=1;
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("сложный уровень а следующий еще сложнее");
        $(".nextLvlInfo span").html("каждый уровень немного сложнее");
      }
}

//звук
function playSoundShot(url){
    soundShot.pause();
    soundShot.currentTime = 0;
    soundShot.src = url;
    soundShot.play();
}
function playSoundBack(url){
    soundBack.pause();
    soundBack.currentTime = 0;
    soundBack.src = url;
    soundBack.play();
}
function playSoundDuckQuack(url){
    soundDuckQuack.pause();
    soundDuckQuack.currentTime = 0;
    soundDuckQuack.src = url;
    soundDuckQuack.play();
}