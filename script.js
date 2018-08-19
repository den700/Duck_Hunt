//утка кидется предметами лефт премета = лефт утки 
// пауза в игре\продолжить\рекорды
 var PositionLeft=0;//макс лефт 1540   
 var PositionTop=0; //620
var ammunition =0;//макс знач 36
var timer_last=20;//секунд до поражения
var lvl=1; //текущий уровень
var specialLvl=5;//уровни после 11
var duck_speed=1000;//милесекунды между которыми утка меняет положение
var protector=1;//защита от проигрыша по патронам
var ammunitionProtector=1; //защита подстрела мертвой утки
var money=11500;//текущие деньги
var moneyPrize=0;//назначенная награда за уровень
var continueGame = 0; //возможность продолжения по сле проигрыша
var clickTrigger = "click"; //тип нажатия ниначто не влият просто тип оружия для проверки
var feedingUp = 0;// подкорм для уток
var slowingDuck = 0;//замедлить утку на 100 долисекунд
var utochkaHp = 1;//покачто макс знач 10
var WeaponDamage = 1;//урон оружия
var upgradeDamageResolution = 3;// насколько можно повысить урон
var youDied = true;//запрещает клацать на экран если вы мертвы
var maxAmmunition = 3;//максимум патронов ограничено 36

var soundShot = new Audio(); //переменная звука для выстрелов
var soundBack = new Audio(); //переменная звука заставка
var soundDuckQuack = new Audio(); //переменная звука кря утки
// setTimeout('playSoundBack("buy.mp3")', 1);


$(".start").bind("click",StartGame);
function StartGame() {
   // playSoundBack("intro.mp3");//музыка вступление интро не забыть раскоментить и мэйби убавить громкость
    ammunitionProtector=0;//защита подстрела мертвой утки снята
    protector=0;//снять предохранитель
    youDied = false;

    SelectLvl();//выбор уровня сложности
    add_amunation();//добавить иконки патронов
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
    $(".utochka").css('background-image','url("utka.gif")');//назнасить анимацию полета
    $(".utochka").show(1000); //показать утку
    DuckPosition = setInterval(DuckPositionInSpace, duck_speed);//положения утки и скорость его иизменения
    timerHunt = setInterval(timer_Hunt, 1000);//обратный отсчет до порожения

   
}

function add_amunation(){// назначить колличество патронов вначале игры
    if(ammunition>maxAmmunition){ammunition=maxAmmunition;}//если больше максимума то максимум
    $('.inventory').children().removeClass("patron");// очистить иконки патронов
    for( var i=0; i<ammunition; i++){
    $('.inventory').children().eq(i).addClass("patron"); 
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
    var randPositionDuck = Math.floor(Math.random() * (1541 - 0)) + 0;

    if(PositionLeft>randPositionDuck){
        $(".utochka").css("transform", "scaleX(-1)");
    } else {
        $(".utochka").css("transform", "scaleX(1)");
    }
    PositionLeft = randPositionDuck;

    $(".utochka").css("left", PositionLeft+"px");
    randPositionDuck = Math.floor(Math.random() * (621 - 0)) + 0;

    PositionTop=randPositionDuck;
    $(".utochka").css("top", PositionTop+"px");
    if(randPositionDuck%3==0){//с вероятность 33% утка крякнет
        playSoundDuckQuack("DuckQuack.mp3"); 
    }
}

//таймер
function timer_Hunt(){
    timer_last--;
    $(".timer_center").html("Таймер "+timer_last);
    if(timer_last<=0){
     ammunition=0;
     gameOver();
    }
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
    var x = $(".patron").length;
    var patronBlock = $(".patron")[x-1];
    $(patronBlock).removeClass("patron");
    if(ammunition<=0){
    // alert("game over"); 
    gameOver(); //гейм овер
    }

}
// тест отмена правой кнопки
// $(".content").bind("contextmenu", DuckKill2);
// function DuckKill2(event){ 
//     var e = event || window.event;
//       e.preventDefault && e.preventDefault();
//       e.stopPropagation && e.stopPropagation();
//       e.cancelBubble = true;
//       e.returnValue = false;
//       return false;
// }

//  клик по утке
$(".utochka").bind("click", DuckKill,);
//победа
function DuckKill(event){
    if (ammunitionProtector==1) {return} //запрет клика по мертвой утке
    
    //забрать 1 патрон
    if(ammunition<=0){//защита от убийства без патронов
        gameOver();
        return;
    }
    
    ammunition--; 
    var patronIndex = $(".patron").length;
    var patronBlock = $(".patron")[patronIndex-1];
    $(patronBlock).removeClass("patron");
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
    lvl++;
    ammunitionProtector=1; //запрет клика на утку(мертвую)
    //пауза в игре до клика начало
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    money += moneyPrize;
    $(".money span").html(money);  
    protector=1; //поднять предохранитель
    playSoundBack("win.mp3");
    
    window.getSelection().removeAllRanges();//снять баг с фокусом магазина
}

//анимация падения
function duckFall(){
    playSoundShot("DuckFalls.mp3");

    $(".utochka").css('background-image','url("duck_fall.gif")');
    $(".utochka").css("top", "810px");
    $("header").html("следующий уровень нажми начать игру"); 

    $(".thisLvlInfo").hide();
    $(".nextLvlInfo").show();
    setTimeout('$(".start").show();', 1000);//анти лаг магазина
    setTimeout('$(".shop").fadeIn(1000)', 1000);
    
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

        $(".content").bind("click", Miss);
        $(".utochka").bind("click", DuckKill);
    }
    if(clickTrigger=="mousedown"){
        $(".content").unbind('mousedown', Miss);
        $(".utochka").unbind('mousedown', DuckKill);

        $(".content").bind("click", Miss);
        $(".utochka").bind("click", DuckKill);
    }
   
    ammunitionProtector = 1;
    youDied = true;
    lvl=1; 
    money=200;
    playSoundBack("Dog_Laughs.mp3");
    $(".utochka").hide(3000); 
    clearInterval(timerHunt);
    clearInterval(DuckPosition);
    $(".start").show(1000);
}
//магазинные товары\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\shop
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
        }
        else{
            $(".content").unbind('click', Miss);
            $(".utochka").unbind('click', DuckKill);
        }
        $(".content").bind("dblclick", Miss);
        $(".utochka").bind("dblclick", DuckKill);
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
        }
        else{
            $(".content").unbind('click', Miss);
            $(".utochka").unbind('click', DuckKill);
        }
        $(".content").bind("mousedown", Miss);
        $(".utochka").bind("mousedown", DuckKill);
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
        $(".utochka").css('transition','left 2s, top 2s');
        $(".utochka").css('height','200px');
        $(".utochka").css('width','200px');
        timer_last=30;
        ammunition=8;
        moneyPrize=50;
        utochkaHp=1;
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