var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var score = 0;

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
  
});
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if((jumping==0)&&(characterTop<500)){
        character.style.top = (characterTop+3)+"px";
    }
    var holeleft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterleft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
   
    var cTop = -(600-characterTop);  // 그냥 숫자로 비교해보는 마지막 방법

    if(characterTop>500){
        alert("으악!!!  "+score+"cm 비행!!");
        character.style.top = 100 + "px";
        score =0;
    }
    else if(((holeleft>characterleft-20)&&(holeleft<characterleft+20))&&((cTop>holeTop-130)&&(cTop<holeTop))){
        alert("으악!!!  "+score+"cm 비행!!");
        character.style.top = 100 + "px";
        score =0;}
    else{
        score++;
        document.getElementById("score").textContent = "이동거리 : "+score+ "cm    고도 : "+characterTop ;
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){ 
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}