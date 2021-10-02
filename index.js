var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        //Call the function to move the game
        nextSequence();
        //Started the game just once
        started = true;
    }
});

//Detect user Clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


//Check the anserws
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {
        $("body").addClass("game-over");
        $("h1").text("Game over! Press any key to restart");
        setTimeout(function() {
                $("body").removeClass("game-over");
            }, 500)
            //Call the function to start over again
        startOver();

    }

}

// Generate the sequences

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


//Start again

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//Play sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animate clicks
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}