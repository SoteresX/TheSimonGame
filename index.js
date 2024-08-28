$(".start-button").on("click", function(){ if(start == false){
    startGame();
    $(".start-button").addClass("hide");
}    
});





function startGame(){
    $("#game-over-text").addClass("hide");
    correct = 0;
    level = 1;
    i = 0 ;
    boxOrder = [];
    start = true;
    $("#level-title").html("Level " + level);
    var number = Math.floor(Math.random()*4+1);
    boxOrder.push(number);
    console.log(boxOrder, "boxOrder");
    showWhichButton(number);
    soundEffects(number);
}

function soundEffects(number){
    switch(number){
        case 1:
            audio = new Audio("./sounds/green.mp3");
            break;
        case 2:
            audio = new Audio("./sounds/red.mp3");
            break;
        case 3:
            audio = new Audio("./sounds/yellow.mp3");
            break;
        case 4:
            audio = new Audio("./sounds/blue.mp3");
            break;
        case 5:
            audio = new Audio("./sounds/wrong.mp3");
            break;
    }
    audio.play();
    
}

function showWhichButton(number){
    console.log(number);
    switch(number){
        case 1:
            $("#green").animate(animation1, animation2);
            setTimeout(function(){$("#green").animate({opacity: 1});})
            break;
        case 2:
            $("#red").animate(animation1, animation2);
            setTimeout(function(){$("#red").animate({opacity: 1});})
            break;  
        case 3:
            $("#yellow").animate(animation1, animation2);
            setTimeout(function(){$("#yellow").animate({opacity: 1});})
            break;
        case 4:
            $("#blue").animate(animation1, animation2);
            setTimeout(function(){$("#blue").animate({opacity: 1});})
            break;
    }
}

$(".btn").on("click", function(event){
    if(start == true){
        buttonNumber = buttonIdToNumber(event.target.id);
        buttonAnimation(event.target.id);
        soundEffects(buttonNumber);
        totalBoxes = boxOrder.length
        console.log(totalBoxes, "totalBoxes");
        console.log(i, "i");

        if(buttonNumber == boxOrder[i]){
            console.log("Correct");
            console.log(boxOrder);
            correct += 1;
            
            i+=1;
            if (correct == totalBoxes){
                $("#level-title").css("color", "green");
                setTimeout(function(){$("h1").css("color", "#FEF2BF");}, 100);
                soundEffects(6);
                level += 1;
                $("#level-title").html("Level " + level);
                var number = Math.floor(Math.random()*4+1);
                boxOrder.push(number);
                console.log(boxOrder);
                correct = 0 ;
                console.log("Level up");
                setTimeout(function(){showWhichButton(number);}, 500);
                setTimeout(function(){soundEffects(number);},500);
                i = 0;
                
            }
            
            
        }
        else{
            gameOver(event.target.id);
            $("#level-title").css("color", "darkred");
            setTimeout(function(){$("h1").css("color", "#FEF2BF");}, 100);
            soundEffects(5);
            start = false;
            
        }
        console.log(buttonNumber);
    }
});

function gameOver(buttonId){
    console.log("Game Over");
    $("#level-title").html("Game over");
    $("#game-over-text").removeClass("hide");
    $("body").addClass("red");
    $("#" + buttonId).addClass("game-over");
    $(".start-button").html("Restart");
    $(".start-button").css("font-size", "40px");
    $(".start-button").removeClass("hide");
    setTimeout(function(){$("body").removeClass("red");}, 200);

}

function buttonIdToNumber(buttonId){
    var buttonNumber;
    if(buttonId == "green"){
        buttonNumber = 1;
    }
    else if(buttonId == "red"){
        buttonNumber = 2;
    }
    else if(buttonId == "yellow"){
        buttonNumber = 3;
    }
    else{
        buttonNumber = 4;
    }
    return buttonNumber;
}

function buttonAnimation(buttonId){
    $("#" + buttonId).addClass("pressed");
    setTimeout(function(){$("#" + buttonId).removeClass("pressed");}, 100);
}

var level = 1;
var boxOrder = [];
var start = false;
var totalBoxes = 0;
var correct = 0;
var i = 0;

const animation1 = {
    opacity: 0.0
}

const animation2 = {
    opacity: 1.0,
    duration: 10
}