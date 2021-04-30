var colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#03a9f4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b", "#ff9800", "#795548", "#9e9e9e", "#607d8b", "#827717", "#212121"];

var isStartedGame = false; // oyun basladi mi ? --> level zorlugu secildigi anda true olur.

var correctTick = 0; // her dogru renk seciminde artar.

var whichPalette = ""; // kaca kaclik game paleti oldugunu tutar.
var paletteIndis = 0;  // 9luk palet --> 81 , 16lik palet --> 256 , 25lik palet --> 625

var randomColor = "#ffffff"; // random secilecek rengi tutar.

var buttonColor; // butona ait rengi tutar.

determineRandomColor();

$('.gamePlay').hide(); // giris ekranini gizler.
$('.finishGameScreen').hide(); // oyun sonu ekranini gizler.

setInterval(counterForGame, 1000); // sayaci baslatir.

addColorPalette("gamePlayColorPalette_9x9", 9); // 9x9luk renk paleti ekler.
addColorPalette("gamePlayColorPalette_16x16", 16); // 16x16lik renk paleti ekler.
addColorPalette("gamePlayColorPalette_25x25",25); // 25x25lik renk paleti ekler.

fillColorButton(81, "gamePlayColorPalette_9x9"); // 9x9luk paletin icini renkler ile doldurur.
fillColorButton(256, "gamePlayColorPalette_16x16"); // 16x16lik paletin icini renkler ile doldurur.
fillColorButton(625, "gamePlayColorPalette_25x25"); // 25x25lik paletin icini renkler ile doldurur.

let time = 60; // sayac 60 saniyeye ayarlanir.
const countDownEl = document.getElementById("counter"); // sayacin bulunndugu html etiketini tutar.

/**
 * oyun düzeni burada olusur.
 * time bittiginde oyun biter.
 * time 0 olmadikca oynamaya devam ettirir.
 */
function counterForGame(){

    countDownEl.innerHTML = "Time : " + time;
    if(time != 0 && isStartedGame){
        time--;
    }
    else if(time == 0){
        finishGame();
    }
    
}

/**
 * zaman doldugunda calisir.
 * oyunun oynandigi paleti gizler.
 * oyun sonu ekranini gorunur yapar.
 * sayaci yeniden 60 yapar.
 */
function finishGame(){
    $('.gamePlay').hide();
    $('.finishGameScreen').show();
    $('.finishGameScreenResultContent').text(correctTick);
    isStartedGame = false;
    time = 60;
}

/**
 * 9x9 luk oyun zorlugu secildiginde calisir.
 * 16x16lik, 25x25lik paletleri, gameDifficult ve startedMessage divlerini gizler.
 * 9x9luk paleti gorunur yapar.
 */
function divShow9x9(){
    $('.gameDifficulty').hide();
    $('.startedMessage').hide();
    $('.gamePlay').show();
    $('.gamePlayColorPalette_9x9').show();
    $('.gamePlayColorPalette_16x16').hide();
    $('.gamePlayColorPalette_25x25').hide();
    whichPalette = "gamePlayColorPalette_9x9";
    paletteIndis = 81;
    isStartedGame = true;

}

/**
 * 16x16 lik oyun zorlugu secildiginde calisir.
 * 9x9luk, 25x25lik paletleri, gameDifficult ve startedMessage divlerini gizler.
 * 16x16lik paleti gorunur yapar.
 */
function divShow16x16(){
    $('.gameDifficulty').hide();
    $('.startedMessage').hide();
    $('.gamePlay').show();
    $('.gamePlayColorPalette_16x16').show();
    $('.gamePlayColorPalette_9x9').hide();
    $('.gamePlayColorPalette_25x25').hide();
    whichPalette = "gamePlayColorPalette_16x16";
    paletteIndis = 256;
    isStartedGame = true;
}

/**
 * 25x25 lik oyun zorlugu secildiginde calisir.
 * 16x16lik, 9x9luk paletleri, gameDifficult ve startedMessage divlerini gizler.
 * 25x25lik paleti gorunur yapar.
 */
function divShow25x25(){
    $('.gameDifficulty').hide();
    $('.startedMessage').hide();
    $('.gamePlay').show();
    $('.gamePlayColorPalette_25x25').show();
    $('.gamePlayColorPalette_9x9').hide();
    $('.gamePlayColorPalette_16x16').hide();
    whichPalette = "gamePlayColorPalette_25x25";
    paletteIndis = 625;
    isStartedGame = true;
}

/**
 * Secilecek random rengi belirler.
 * Bu secilen rengi gamePlayBottomRight divine atar.
 */
function determineRandomColor(){
    var randomNum =  Math.floor(Math.random() * 14);
    randomColor = colors[randomNum];
    $('.gamePlayBottomRight').css("background-color", randomColor);
}

/**
 * Array'in elemanlarini karsitirir.
 * @param {*} array --> renklerin hex kodlarini icerir.
 * @returns --> karistirilmis array i return eder.
 */
function shuffleColors(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

/**
 * Butonlari renkler ile doldurur.
 * @param {*} index --> 9x9luk paletin ici dolacaksa indis 81 olur. 16x16 = 256 , 25x25 = 625.
 * @param {*} divClassName --> kaca kaclik palet oldugunu anlariz ve butonun idsini bulurken kullaniriz.
 * shuffleColors() fonksiyonunu cagirir.
 */
function fillColorButton(index, divClassName){
   
    shuffleColors(colors);

    count = 0;
    for(i = 0; i < index; i++){
        $("#"+i + divClassName).css('background-color',colors[count]);
        count++;
        if(count == 16){
            count = 0;
            shuffleColors(colors);
        }
    }
}

/**
 * rgb rengi hex koda cevirir.
 * @param {*} rgb --> rgb color.
 * @returns --> hex code.
 */
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

/**
 * butona basinca button rengini yakalar ve dogru ise correctTick'i artirir.
 * yeni randomColor belirler ve tum kutularin renklerini degistirir.
 */
function buttonTickAndPlay(){

    const countDownEl = document.getElementById("temp");

    $(".test").click(function(evt){
        buttonColor = rgb2hex($(this).css("background-color"));
        
        if(randomColor == buttonColor){
            correctTick++;
            countDownEl.innerHTML = "NEXT : " + correctTick;
            determineRandomColor();   
            fillColorButton(paletteIndis, whichPalette);
        }
    });
    
}

buttonTickAndPlay();

/**
 * girilen indis kadarlik bir matris seklinde renk paleti ekler.
 * @param {*} divClassName --> eklenecek div. Ve bu div ismi her bir butona id verilirken kullanilir.
 * @param {*} index --> 9x9 = 9 , 16x16 = 16 , 25x25 = 25.
 */
function addColorPalette(divClassName,index){
    $("." + divClassName).append("<table>");
    counter = 0;
    for(i = 0; i < index; i++){
        $("." + divClassName).append("<tr>");
        for(j = 0; j < index; j++){
            $("." + divClassName).append("<td><input type='button' class='test' id='"+ counter + divClassName +"'></td>");
            counter++;
        }
        $("." + divClassName).append("</tr>");
    }

    $("." + divClassName).append("</table>");
}

/**
 * oyun basinda yapilan isleri bastan yapar.
 * Oyunu yeniden başlatır.
 * finishGameScreen divini gizler.
 * gameDifficulty ve startedMessage divlerini gorunur yapar.
 */
function retryGame(){

    const countDownEl = document.getElementById("temp");
    countDownEl.innerHTML = 0;
    
    $('.finishGameScreen').hide();
    $('.gameDifficulty').show();
    $('.startedMessage').show();
    correctTick = 0;
    randomColor = "#ffffff";
    determineRandomColor();

}
