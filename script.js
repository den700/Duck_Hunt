var ammunition =0;//0 патроны макс знач 36
var timer_last=20;//секунд до поражения
var additionalTime = 0;//покупное время
var lvl=1; //1 текущий уровень
var specialLvl=5;//5 уровни после 16
var duck_speed=1000;//милесекунды между которыми утка меняет положение
var protector=1;//защита от проигрыша по патронам в время открытого магазина
var money=0;//текущие деньги
var moneyPrize=0;//назначенная награда за уровень
var continueGame = 0; //возможность продолжения по сле проигрыша сохранив апгрейды
var clickTrigger = "click"; //тип нажатия ниначто не влият просто тип оружия для проверки
var feedingUp = 0;// подкорм для уток увеличивает утку
var slowingDuck = 0;//замедлить утку на 100 долисекунд
var WeaponDamage = 1;//1 урон оружия
var upgradeDamageResolution = 3;// насколько можно повысить урон
var youDied = true;//запрещает клацать на экран если вы мертвы
var maxAmmunition = 3;//3 максимум патронов ограничено 36
var duckRoflProtector = false;// пока фолс можно вызвать бонус
var duckRoflProtectorClick = false;// пока фолс можно нажимать на бонус утку
var BonusPosTop = 0;//позиционирование бонусной рулетки
var BonusPosLeft = 0;//поз бонус релетки
var randBonusAnimation=0;//тип картинки которая в конце рулетки
var presenceDog = false;//наличие собаки
var backgroundJpg="background1.jpg";//текущий фон
var Complexity="Ultra hardcore"; //уровень сложности
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
var soundTosty = new Audio(); //переменная звука бонус утки


$(".start").bind("click",StartGame);
function StartGame() {
   
    ammunitionProtector=0;//защита подстрела мертвой утки снята
    ammunitionProtectorDuck2=0;//разрешить клик на утку 2
    ammunitionProtectorDuck3=0;//разрешить клик на утку 3
    protector=0;//снять предохранитель
    youDied = false;//разрешение клацать на экран

    SelectLvl();//выбор уровня сложности
    add_amunation();//добавить иконки патронов//показать пустые ячейки для патронов
    showDuckHp();//показать хп утки
    if(lvl==1||lvl==100||lvl==1000){playSoundBack("intro.mp3"); }
    //доп вреся на уровень
    timer_last+=additionalTime;
    additionalTime=0;
    $(".additionalTime span").html(additionalTime);

    if(feedingUp>=1){//накормить утку увеличив ее
        var heightDuck = parseInt($(".utochka").css("height"), 10)+feedingUp*50;
        $(".utochka").css('height',heightDuck+'px');
        var widthDuck = parseInt($(".utochka").css("width"), 10)+feedingUp*50;
        $(".utochka").css('width',widthDuck+'px');
        //кормим утку два увеличивая ее
        $(".utochka2").css('height',heightDuck+'px');
        $(".utochka2").css('width',widthDuck+'px');
        //кормим утку 3 увеличивая ее
        $(".utochka3").css('height',heightDuck+'px');
        $(".utochka3").css('width',widthDuck+'px');

        feedingUp=0;
        $(".feedingUp span").html(feedingUp);
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

        //замедляем утку 2 хмелем
        $(".utochka2").css('transition',transitionString);//подставляем стринг в значение css
        //замедляем утку 3 хмелем
        $(".utochka3").css('transition',transitionString);//подставляем стринг в значение css

        slowingDuck=0;
        $(".slowingDuck span").html(slowingDuck);
    }
    $(".slowingDuck span").html(slowingDuck); //обнулить хмель инфо
    $(".feedingUp span").html(feedingUp);//обнулить количество еды

    $(".thisLvlInfo").show();
    $(".nextLvlInfo").hide();
    $(".shop").hide();//спрятать магазин
    $(".start").hide(); //убрать кнопку запуска
    $(".utochka").css('background-image','url("utka.gif")');//назначить анимацию полета
    $(".utkaBlack").css('background-image','url("utkaColorBlack.png")');//поставить картинку рядом с хп утка 1
    $(".utochka").show(); //показать утку
    DuckPosition = setInterval(DuckPositionInSpace, duck_speed);//положения утки и скорость его иизменения
    timerHunt = setInterval(timer_Hunt, 1000);//обратный отсчет до порожения

    if(duckQuantity>=2){//если утки 2
        $(".utochka2").css('background-image','url("utka2.gif")');//назначить анимацию полета
        $(".utkaBlue").css('background-image','url("utkaColorBlue.png")');//поставить картинку рядом с хп утка 2
        $(".utochka2").show(); //показать утку

    }//конец вторая утка
    if(duckQuantity>=3){//если утки 2
        $(".utochka3").css('background-image','url("utka3.gif")');//назначить анимацию полета
        $(".utkaRed").css('background-image','url("utkaColorRed.png")');//поставить картинку рядом с хп утка 2
        $(".utochka3").show(); //показать утку
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

    if(duckQuantity>=2){//если уток 2 +
        $('.utochka2HpBlock').children().removeClass("utochkaHp");// очистить иконки сердечек ut2
        for( var i=0; i<utochkaHpDuck2; i++){
        $('.utochka2HpBlock').children().eq(i).addClass("utochkaHp"); 
        } 
    }

    if(duckQuantity>=3){//если уток 2 +
        $('.utochka3HpBlock').children().removeClass("utochkaHp");// очистить иконки сердечек ut3
        for( var i=0; i<utochkaHpDuck3; i++){
        $('.utochka3HpBlock').children().eq(i).addClass("utochkaHp"); 
        } 
    }
}

//случайная генерация положения утки
function DuckPositionInSpace(){

    var randDuckQuackGeneration = Math.floor(Math.random() * (11 - 1)) + 1;//горизонт поз
    if(randDuckQuackGeneration>=6){//с вероятность 50% утка крякнет
        playSoundDuckQuack("DuckQuack.mp3"); 
    }

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
    }


}

//таймер
function timer_Hunt(){
//вылезет бонус утка
    var randBonusChance = Math.floor(Math.random() * (11 - 1)) + 1; //от 1 до 15
    if(randBonusChance==1&&duckRoflProtector==false){//c вероятностью 25% при премещении вылезет бонус
        playSoundTosty("tosty.mp3");
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
        additionalTime+=40;
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
    utochkaHp-=WeaponDamage;
    showDuckHp();
    if(utochkaHp>=1){//если хп у утки осталось то продолжить игру
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
    showDuckHp();
    if(utochkaHpDuck2>=1){//если хп у утки осталось то продолжить игру
        playSoundBack("shot2.mp3");//скомпилировать микс выстрел + кряк и звук дамага
        return;
    }
    
    playSoundShot("shot_gun.mp3");//звук выстрела при убийстве и вук дамага при дмг
    ammunitionProtectorDuck2=1; //запрет клика на утку(мертвую)
    //анимация падения
    $(".utochka2").css('background-image','url("duck_hit2.png")');
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
    showDuckHp();
    if(utochkaHpDuck3>=1){//если хп у утки осталось то продолжить игру
        playSoundBack("shot2.mp3");//скомпилировать микс выстрел + кряк и звук дамага
        return;
    }
 
    playSoundShot("shot_gun.mp3");//звук выстрела при убийстве и вук дамага при дмг
    ammunitionProtectorDuck3=1; //запрет клика на утку(мертвую)
    //анимация падения
    $(".utochka3").css('background-image','url("duck_hit3.png")');
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
    // setTimeout('$(".utochka").hide();', 2000);
}
//анимация падения утки 2
function duckFall2(){
    playSoundDuckQuack("DuckFalls.mp3");

    $(".utochka2").css('transition','left 2s, top 2s');
    $(".utochka2").css('background-image','url("duck_fall2.gif")');
    $(".utochka2").css("top", "810px");
    // setTimeout('$(".utochka2").hide();', 2000);
}
//анимация падения утки 3
function duckFall3(){
    playSoundDuckQuack("DuckFalls.mp3");

    $(".utochka3").css('transition','left 2s, top 2s');
    $(".utochka3").css('background-image','url("duck_fall3.gif")');
    $(".utochka3").css("top", "810px");
    // setTimeout('$(".utochka3").hide();', 2000);
}
//если убиты все утки полная победа
function completeVictory(){
    playSoundBack("win.mp3");
    lvl++;
    if(Complexity=="Ultra hardcore"){ $(".thisLvlNumber span").html(lvl);}//номер уровня
    else if(Complexity=="Middle"){ $(".thisLvlNumber span").html(lvl-99);}//номер уровня
    else if(Complexity=="Easy"){ $(".thisLvlNumber span").html(lvl-999);}//номер уровня
    money += moneyPrize;
    $(".money span").html(money);  
    protector=1; //поднять предохранитель не проиграть между уровней
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    $(".moneyInfo").html("на прошлом уровне вы получили "+moneyPrize+" денег"); //конфликт с хп уток
    $(".thisLvlInfo").hide();
    $(".nextLvlInfo").show();
    $(".utkaBlack").css('background-image','url("")');//поставить картинку рядом с хп утка 1
    $(".utkaBlue").css('background-image','url("")');//поставить картинку рядом с хп утка 2
    $(".utkaRed").css('background-image','url("")');//поставить картинку рядом с хп утка 3
    setTimeout('$(".start").show();', 1000);//анти лаг магазина
    setTimeout('$(".shop").fadeIn(1000)', 1000);
    
    window.getSelection().removeAllRanges();//снять баг с фокусом магазина
}
//собака показывает утку при победе
function dogShowDuck(duckNumber){
    $(".dogShowDuck").stop();//остановить незаконченную анимацию
    $(".dogShowDuck").stop();// без двойного стопа анимация не пропадает
    $(".dogShowDuck").show();
    if(duckNumber==1){$(".dogShowDuck").css("left", PositionLeft+"px");}//вылезет под местом убиения утки
    if(duckNumber==2){$(".dogShowDuck").css("left", PositionLeftDuck2+"px");}//вылезет под местом убиения утки
    if(duckNumber==3){$(".dogShowDuck").css("left", PositionLeftDuck3+"px");}//вылезет под местом убиения утки
    $(".dogShowDuck").animate({top: "580px"}, 1000).animate({ top: "+=0"}, 500).animate({ top: "820px"}, 1000).fadeOut();
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
        playSoundBack("Dog_Laughs.mp3");
    }
    else if(ammunition<=0) {//порожение по патронам
        alert("вас заклевали ути(нет патронов)"); 
        playSoundBack("Dog_Laughs.mp3");
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
    ammunition =0;
    timer_last=20;
    WeaponDamage = 1;
    upgradeDamageResolution = 3;
    maxAmmunition = 3;
    presenceDog = false;

    ammunitionProtector = 1;
    youDied = true;
    lvl=1; 
    money=0;
    
    $(".utochka").hide(3000); 
    $(".utochka2").hide(3000); 
    $(".utochka3").hide(3000); 
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    setTimeout("$('.start').show();", 3000);
    
}
//магазинные товары\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\shop

function buyBackground(){
    if(money>=100){
        if(backgroundJpg=="background1.jpg"){
            $(".content").css('background-image','url("background2.jpg")');
            backgroundJpg="background2.jpg";
            
        }
        else if(backgroundJpg=="background2.jpg"){
            $(".content").css('background-image','url("background3.jpg")');
            backgroundJpg="background3.jpg";
        }
        else if(backgroundJpg=="background3.jpg"){
            $(".content").css('background-image','url("background4.jpg")');
            backgroundJpg="background4.jpg";
        }
        else {
             $(".content").css('background-image','url("background1.jpg")');
            backgroundJpg="background1.jpg";
        }
        money-=100;
        $(".money span").html(money);
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $100");}
}

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
    if(money>=750){
        if(upgradeDamageResolution>=20){//
            alert("вы достигли вершин науки, больше апгрейдить нельзя");
            return;
        }
        upgradeDamageResolution++;
        money-=750;
        $(".money span").html(money);
        $(".upgradeDamageResolution span").html(upgradeDamageResolution);
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $750");}
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
    else{alert("вы нищий, нужно $50");} 
}

function buyWunderwaffe(){
    if(money>=750){
        if(clickTrigger=="dblclick"){
            alert("нельзя улучшить,уже приобретено");
            return;
        }
        upgradeDamageResolution=10;
        clickTrigger="dblclick";
        WeaponDamage=4;
        money-=750;
        $(".money span").html(money); 
        $(".WeaponDamage span").html(WeaponDamage);
        $(".upgradeDamageResolution span").html(upgradeDamageResolution);
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
    else{alert("вы нищий, нужно $750");}
}

function buyStandartWeapon(){
    if(money>=0){
        if(clickTrigger=="click"){
            alert("нельзя взять,уже приобретено");
            return;
        }
        upgradeDamageResolution=3;
        clickTrigger="click";
        WeaponDamage=1;
        money-=0;
        $(".money span").html(money); 
        $(".WeaponDamage span").html(WeaponDamage);
        $(".upgradeDamageResolution span").html(upgradeDamageResolution);
        playSoundShot("Perfect.mp3");
        if(clickTrigger=="mousedown"){
            $(".content").unbind('mousedown', Miss);
            $(".utochka").unbind('mousedown', DuckKill);
            $(".utochka2").unbind('mousedown', DuckKill2);
            $(".utochka3").unbind('mousedown', DuckKill3);
        }
        else{
            $(".content").unbind('dblclick', Miss);
            $(".utochka").unbind('dblclick', DuckKill);
            $(".utochka2").unbind('dblclick', DuckKill2);
            $(".utochka3").unbind('dblclick', DuckKill3);
        }
        $(".content").bind("click", Miss);
        $(".utochka").bind("click", DuckKill);
        $(".utochka2").bind("click", DuckKill2);
        $(".utochka3").bind("click", DuckKill3);
    }
    else{alert("вы нищий, нужно $0");}
}

function buyWeaponDamage(){
    if(money>=750){
        if(WeaponDamage>=upgradeDamageResolution){//если урон равен возможности грейдить 
            alert("ваши знания недостаточны для улучшения текущег оружия оружия");
            return;
        }
        WeaponDamage++;
        money-=750;
        $(".money span").html(money);
        $(".WeaponDamage span").html(WeaponDamage); 
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $750");}
}

function buyTrigger(){
    if(money>=750){
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
        money-=750;
        $(".money span").html(money); 
        $(".WeaponDamage span").html(WeaponDamage);
        $(".upgradeDamageResolution span").html(upgradeDamageResolution);
        playSoundShot("Perfect.mp3");
    }
    else{alert("вы нищий, нужно $750");}
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
        $(".slowingDuck span").html(slowingDuck);
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
        $(".feedingUp span").html(feedingUp);
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
        additionalTime+=10;
        $(".timer_center").html("Таймер "+timer_last);
        money-=100;
        $(".money span").html(money);
        $(".additionalTime span").html(additionalTime); 
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
//выбор уровня ////////////////////////////////////////////////////////////////////////////////////
function SelectLvl(){
    if(lvl==1){ //старт время
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last=20;//время
        ammunition=1;//патроны
        moneyPrize=200;//приз за прохождение уровня
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// 3 утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("береги патроны");//совет этот уровень
        $(".nextLvlInfo span").html("маленькая утка. таймер = 40, патрон +2");//подсказка на след уровень
         
    }
    else if(lvl==2){  //маленькая утка разминка
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','100px');
        $(".utochka, .utochka2, .utochka3").css('width','100px');
        timer_last=40;
        ammunition+=2;
        moneyPrize=100;
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("хорошо целься");
        $(".nextLvlInfo span").html("купи время !!! очень мало времени. таймер = 1, патрон +1");
    }
    else if(lvl==3){ //время 1 обязательная покупка
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last=1;
        ammunition+=1;
        moneyPrize=200;
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("поспеши");
        $(".nextLvlInfo span").html("две утки,таймер +10 патроны +1");
    }
    else if(lvl==4){ // две утки 
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=10;
        ammunition+=1;
        moneyPrize=150;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=0;
        duckQuantity = 2;
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("за двумя зайцами");
        $(".nextLvlInfo span").html("быстрая утка таймер +5, дадут целых +4 патронов если влезут");
    }
    else if(lvl==5){//слот патрон быстрая утка \\\после уровня у нас 3 патрона и 4 слота -150$;=650$;
        duck_speed=1000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 1.0s, top 1.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=4;
        moneyPrize=150;
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// 
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("мелоч пузатая,лучше не спешить");
        $(".nextLvlInfo span").html("будет 3 утки. таймер + 5,патроны + 1");
    }
    else if(lvl==6){//три утки \\после у нас 1 патрон 750 4 слота  (билд на количество патрон.)
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=1;
        moneyPrize=100;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=1;
        duckQuantity = 3;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("они соображают на троих");
        $(".nextLvlInfo span").html("утка жирная 3 хп.таймер + 5,патроны целых + 5,держи карман шире");
    }
    else if(lvl==7){//утка 3 хп после у нас 0патрон 800 денег 4 слота(билд количество  )(2патрона 4 слота урон 2 50денег)
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=5;
        moneyPrize=50;
        utochkaHp=3;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("жирная утка");
        $(".nextLvlInfo span").html("босс утка с 10 хп. таймер + 5,патроны + 3");
    }
    else if(lvl==8){//супер рб 10 хп\\стандарт либо 2 урона 5 слотов 0патронов 0монет \или 1 урона 10 слотов 100 монет 0патрон\вандер5 слот 2патрона 0 денег\без учота приза на 8 вле
        // +50 надо дать
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','300px');
        $(".utochka, .utochka2, .utochka3").css('width','300px');
        timer_last+=5;
        ammunition+=3;
        moneyPrize=500;
        utochkaHp=10;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("жирная утка");
        $(".nextLvlInfo span").html("три утки ,таймер + 5,патроны + 10 если унесешь");
    }
    else if(lvl==9){//три утки бананчиком
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 0.7s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=10;
        moneyPrize=300;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=1;
        duckQuantity = 3;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("тройка борзая летит");
        $(".nextLvlInfo span").html("три утки,худые, купи патроны.таймер + 5,патроны + 0");
    }
    else if(lvl==10){//три утки маленькие
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','75px');
        $(".utochka, .utochka2, .utochka3").css('width','75px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=100;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=1;
        duckQuantity = 3;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("утки пароды анарекс");
        $(".nextLvlInfo span").html("три утки обокравшие гороховый склад.таймер + 5,патроны + 2");
    }
    else if(lvl==11){//три утки быстрые после покачто в но0ль
        duck_speed=800;
        $(".utochka, .utochka2, .utochka3").css('transition','left 0.8s, top 0.8s');
        $(".utochka, .utochka2, .utochka3").css('height','175px');
        $(".utochka, .utochka2, .utochka3").css('width','175px');
        timer_last+=5;
        ammunition+=2;
        moneyPrize=100;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=1;
        duckQuantity = 3;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("используют реактивную тягу");
        $(".nextLvlInfo span").html("одна утка и попутный ветер.таймер + 5,патроны + 1");
    }
    else if(lvl==12){//одна юркая бананчикос 0
        duck_speed=800;
        $(".utochka, .utochka2, .utochka3").css('transition','left 0.5s, top 0.8s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=1;
        moneyPrize=100;
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("заносит на поворотах");
        $(".nextLvlInfo span").html("один ципленок.таймер + 5,патроны + 0");
    }
    else if(lvl==13){//микро утка 0
        duck_speed=1500;
        $(".utochka, .utochka2, .utochka3").css('transition','left 1.5s, top 1.5s');
        $(".utochka, .utochka2, .utochka3").css('height','50px');
        $(".utochka, .utochka2, .utochka3").css('width','50px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=600;
        utochkaHp=1;
        utochkaHpDuck2=0;
        utochkaHpDuck3=0;
        duckQuantity = 1;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("нужнобыло прикормить");
        $(".nextLvlInfo span").html("две утки нажрались.таймер + 5,патроны + 0");
    }
    else if(lvl==14){//двеутки с хп 0
        duck_speed=1500;
        $(".utochka, .utochka2, .utochka3").css('transition','left 1.5s, top 1.5s');
        $(".utochka, .utochka2, .utochka3").css('height','225px');
        $(".utochka, .utochka2, .utochka3").css('width','225px');
        timer_last+=5;
        ammunition+=0;
        moneyPrize=100;
        utochkaHp=3;
        utochkaHpDuck2=3;
        utochkaHpDuck3=0;
        duckQuantity = 2;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("лоснящаяся утка");
        $(".nextLvlInfo span").html("две утки худые и шустрые.таймер + 5,патроны + 1");
    }
    else if(lvl==15){// две утки мелко быстрые надо дать 1ю5к на патроны\если дать +500 псле 8 то будет пред 16 +750 250 навар
        duck_speed=700;
        $(".utochka, .utochka2, .utochka3").css('transition','left 0.7s, top 0.7s');
        $(".utochka, .utochka2, .utochka3").css('height','75px');
        $(".utochka, .utochka2, .utochka3").css('width','75px');
        timer_last+=5;
        ammunition+=1;
        moneyPrize=0;
        utochkaHp=1;
        utochkaHpDuck2=1;
        utochkaHpDuck3=0;
        duckQuantity = 2;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("утки с повышенной аэродинамикой");
        $(".nextLvlInfo span").html("3 утки по 5хп у каждой,надеюсь хватит пороха.таймер + 5,патроны + 1");
    }
    else if(lvl==16){
        duck_speed=2000;
        $(".utochka, .utochka2, .utochka3").css('transition','left 2.0s, top 2.0s');
        $(".utochka, .utochka2, .utochka3").css('height','200px');
        $(".utochka, .utochka2, .utochka3").css('width','200px');
        timer_last+=5;
        ammunition+=1;
        moneyPrize=300;
        utochkaHp=5;
        utochkaHpDuck2=5;
        utochkaHpDuck3=5;
        duckQuantity = 3;// две утки
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("три толстяка");
        $(".nextLvlInfo span").html("случайный уровень.таймер + 5,патроны + 1");
    }
    else if(lvl>=17&&lvl<50){//адаптивный уровень сложности \рандом хп уток,приз равен сумма хп уток умножить на 100\некое число спешал лвл может пойти на уменьшение утки а может на скорость
        // уровень 50 победа
        specialLvl+=0.5;
//генерим постеменно увеличивающуюся случайным образом скорость
        var randGenegationDuckSpeed=10000/specialLvl//на 5 2000 скорость утки
        duck_speed = Math.floor(Math.random() * (2001 - randGenegationDuckSpeed)) + randGenegationDuckSpeed;
//корректируем транзишн под нашу скорость
        var transitionSpeed=duck_speed/1000+0.00001;
        var transitionStreeng = "left "+transitionSpeed+"s, top "+transitionSpeed+"s";
        $(".utochka, .utochka2, .utochka3").css('transition',transitionStreeng);
    //генерим случайный размер
        var randGenegationDuckHeight = 1190/specialLvl;//получаем разиер на 6 около 200 .размер утки
        var UtkaRazmer = Math.floor(Math.random() * (221 - randGenegationDuckHeight)) + randGenegationDuckHeight;
        $(".utochka, .utochka2, .utochka3").css('height',UtkaRazmer+'px');
        $(".utochka, .utochka2, .utochka3").css('width',UtkaRazmer+'px');
    //генератор количества уток и их хп и от этого награда
        var randUtcaQuantity = Math.floor(Math.random() * (4 - 1)) + 1;//утки от 1 до 3
        if(randUtcaQuantity==1){
            //генератор хп уток макс 12 хп
            var maxHpUtoc = specialLvl;//6.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//6
            maxHpUtoc-=3;//3
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>20){randUtcaHp=20;}
            utochkaHp=randUtcaHp;

            utochkaHpDuck2=0;
            utochkaHpDuck3=0;
            duckQuantity = 1;
        }
        if(randUtcaQuantity==2){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=3;//5
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHpDuck2=randUtcaHp;

            utochkaHpDuck3=0;
            duckQuantity = 2;
        }
         if(randUtcaQuantity==3){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=3;//5
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck2=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck3=randUtcaHp;
            duckQuantity = 3;
        }

        var sumHp = utochkaHp + utochkaHpDuck2 + utochkaHpDuck3;
        moneyPrize=sumHp*100-100;
        ammunition+=1;
        if(ammunition>36)ammunition=36;

        timer_last+=5;
        
        $(".thisLvlNumber span").html(lvl);//номер уровня
        $(".thisLvlInfo span").html("денежный приз= "+moneyPrize+" будь запаслив патронами");
        $(".nextLvlInfo span").html("каждый уровень немного сложнее,патрон + 1,таймер +5");
    }
    else if(lvl==50){
        playSoundShot("Congratulation.mp3");
        $(".moneyInfo").html("поздравляем вы прошли самый сложный уровень сложности,молодцом! Pазраб den700");
        alert("Congratulation вы прошли хардкор мод!!!");
        continueGame = 0;
        gameOver();
        
    }
    else if(lvl>=100&&lvl<150){//средний
        specialLvl+=0.5;
//генерим постеменно увеличивающуюся случайным образом скорость
        var randGenegationDuckSpeed=10000/specialLvl//на 5 3000 скорость утки
        duck_speed = Math.floor(Math.random() * (2001 - randGenegationDuckSpeed)) + randGenegationDuckSpeed;
//корректируем транзишн под нашу скорость
        var transitionSpeed=duck_speed/1000+0.00001;
        var transitionStreeng = "left "+transitionSpeed+"s, top "+transitionSpeed+"s";
        $(".utochka, .utochka2, .utochka3").css('transition',transitionStreeng);
    //генерим случайный размер
        var randGenegationDuckHeight = 1190/specialLvl;//получаем разиер на 6 около 200 .размер утки
        var UtkaRazmer = Math.floor(Math.random() * (221 - randGenegationDuckHeight)) + randGenegationDuckHeight;
        $(".utochka, .utochka2, .utochka3").css('height',UtkaRazmer+'px');
        $(".utochka, .utochka2, .utochka3").css('width',UtkaRazmer+'px');
    //генератор количества уток и их хп и от этого награда
        var randUtcaQuantity = Math.floor(Math.random() * (4 - 1)) + 1;//утки от 1 до 3
        if(randUtcaQuantity==1){
            //генератор хп уток макс 12 хп
            var maxHpUtoc = specialLvl;//6.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//6
            maxHpUtoc-=3;//3
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>20){randUtcaHp=20;}
            utochkaHp=randUtcaHp;

            utochkaHpDuck2=0;
            utochkaHpDuck3=0;
            duckQuantity = 1;
        }
        if(randUtcaQuantity==2){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=3;//
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHpDuck2=randUtcaHp;

            utochkaHpDuck3=0;
            duckQuantity = 2;
        }
         if(randUtcaQuantity==3){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=3;//
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck2=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck3=randUtcaHp;
            duckQuantity = 3;
        }

        var sumHp = utochkaHp + utochkaHpDuck2 + utochkaHpDuck3;
        moneyPrize=sumHp*125-100;
        ammunition+=1;
        if(ammunition>36)ammunition=36;

        timer_last+=5;
        
        $(".thisLvlNumber span").html(lvl-99);//номер уровня
        $(".thisLvlInfo span").html("денежный приз= "+moneyPrize+" будь запаслив патронами");
        $(".nextLvlInfo span").html("каждый уровень немного сложнее,патрон + 1,таймер +5");
    }
    else if(lvl==150){
        playSoundShot("Congratulation.mp3");
        $(".moneyInfo").html("поздравляем вы прошли средний уровень сложности(как взросный),молодцом! Pазраб den700");
        alert("Congratulation вы прошли хардкор мод!!!");
        continueGame = 0;
        gameOver();
    }   
    else if(lvl>=1000&&lvl<1050){
         specialLvl+=0.5;
//генерим постеменно увеличивающуюся случайным образом скорость
        var randGenegationDuckSpeed=15000/specialLvl//на 5 3000 скорость утки
        duck_speed = Math.floor(Math.random() * (3001 - randGenegationDuckSpeed)) + randGenegationDuckSpeed;
//корректируем транзишн под нашу скорость
        var transitionSpeed=duck_speed/1000+0.00001;
        var transitionStreeng = "left "+transitionSpeed+"s, top "+transitionSpeed+"s";
        $(".utochka, .utochka2, .utochka3").css('transition',transitionStreeng);
    //генерим случайный размер
        var randGenegationDuckHeight = 1650/specialLvl;//получаем разиер на 6 около 200 .размер утки
        var UtkaRazmer = Math.floor(Math.random() * (301 - randGenegationDuckHeight)) + randGenegationDuckHeight;
        $(".utochka, .utochka2, .utochka3").css('height',UtkaRazmer+'px');
        $(".utochka, .utochka2, .utochka3").css('width',UtkaRazmer+'px');
    //генератор количества уток и их хп и от этого награда
        var randUtcaQuantity = Math.floor(Math.random() * (4 - 1)) + 1;//утки от 1 до 3
        if(randUtcaQuantity==1){
            //генератор хп уток макс 12 хп
            var maxHpUtoc = specialLvl;//6.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//6
            maxHpUtoc-=6;//3
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>20){randUtcaHp=20;}
            utochkaHp=randUtcaHp;

            utochkaHpDuck2=0;
            utochkaHpDuck3=0;
            duckQuantity = 1;
        }
        if(randUtcaQuantity==2){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=6;//
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>18){randUtcaHp=18;}
            utochkaHpDuck2=randUtcaHp;

            utochkaHpDuck3=0;
            duckQuantity = 2;
        }
         if(randUtcaQuantity==3){
            //генератор хп уток
            var maxHpUtoc = specialLvl;//8.5==лвл19 
            maxHpUtoc=Math.floor(maxHpUtoc);//8
            maxHpUtoc-=6;//
            if(maxHpUtoc<2){maxHpUtoc=2;}
            var randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHp=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck2=randUtcaHp;

            randUtcaHp = Math.floor(Math.random() * (maxHpUtoc - 1)) + 1;//утки хп(4-1)
            if(randUtcaHp>12){randUtcaHp=12;}
            utochkaHpDuck3=randUtcaHp;
            duckQuantity = 3;
        }

        var sumHp = utochkaHp + utochkaHpDuck2 + utochkaHpDuck3;
        moneyPrize=sumHp*150-100;
        ammunition+=1;
        if(ammunition>36)ammunition=36;

        timer_last+=10;
        
        $(".thisLvlNumber span").html(lvl-999);//номер уровня
        $(".thisLvlInfo span").html("денежный приз= "+moneyPrize+" будь запаслив патронами");
        $(".nextLvlInfo span").html("каждый уровень немного сложнее,патрон + 1,таймер +5");
    }
    else if(lvl==1050){
        playSoundShot("Congratulation.mp3");
        $(".moneyInfo").html("поздравляем вы прошли детский уровень сложности,молодцом! Pазраб den700");
        alert("Congratulation вы прошли хардкор мод!!!");
        continueGame = 0;
        gameOver();
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
function playSoundTosty(url){
    soundTosty.pause();
    soundTosty.currentTime = 0;
    soundTosty.src = url;
    soundTosty.play();
}

//сложность
function choiceLevelComplexity(choiceLevel){
    if(choiceLevel=="Easy"){
        lvl = 1000;
        ammunition=3;
        Complexity="Easy";
    }
    else if(choiceLevel=="Middle"){
        lvl = 100;
        Complexity="Middle";
        ammunition=3;
    }
    else if(choiceLevel=="Ultra hardcore"){
        lvl = 1;
        Complexity="Ultra hardcore";
    }
    $(".choiceComplexity").fadeOut(500);
    $(".start").fadeIn(500);
    playSoundBack("Title2.mp3");//музыка вступление интро 
}