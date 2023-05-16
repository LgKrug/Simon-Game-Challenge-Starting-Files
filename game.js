let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"]
let gameStarted = false;
let level = 0;
let timesPressed = 0;

$(document).keydown(function() {
    if(!gameStarted) {
    gameStarted = true;
    runGame();
    }
});

function runGame() {
   
    nextSequence();
    
    $(".btn").click(function() {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        timesPressed++;

        if(timesPressed == gamePattern.length && checkAnswer() == true) {
            console.log("certo")
            userClickedPattern = [];
            timesPressed = 0;
            level++;
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
        if(!checkAnswer()) {
            console.log("Errado");

            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },300)

            $("#level-title").text("Game Over! Press any key to Restart");

            $(document).keydown(function() {
                starOver();
            });
        }
    });
}




function nextSequence() {
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let randomButton = $("#" + randomChosenColor);
    randomButton.animate({
        opacity: 0
    },150).animate({
        opacity: 100
    },150);
    playSound(randomChosenColor);

    console.log(gamePattern);
}


function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}

function starOver() {
    gamePattern = [];
    userClickedPattern = []; 
    level = 0;
    timesPressed = 0;
    gameStarted = false;
}