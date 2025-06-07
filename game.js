var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//TO GET THE EXACT CLICKED BUTTON AND PUT IN THE USERCLICKEDPATTERN VARIABLE SEQUENTIALLY. IT ALSO PLAYS SOUND, ANIMATE AND CHECK THE LAST INDEX I.E CHARACTER
$(".btn").on("click", function () {
    var userChosenColor = this.id; //Selects the id of the clicked button
    userClickedPattern.push(userChosenColor); // Puts the id(s) selected into the empty userClickedPattern array created

    playSound(userChosenColor); //Plays sound on every click

    animatePress(userChosenColor); //Animate the particular clicked

    checkAnswer(userClickedPattern.length-1); // This is to determine the last index i.e no of elements counting from 0 as it has been created below

   
});


//THIS IS ACTUALLY THE LAST FUNCTION CREATED TO COMPARE THE USER INPUT WITH THE SYSTEM INPUT AND ALSO SETCONDITIONS FOR GAME OVER

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success")

        if (gamePattern.length === userClickedPattern.length) {
            //This timeout function is created to delay the game by 1000miliseconds before it moves to the next sequence
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("#level-title").text("Game-Over, press any key to restart");
        $("body").addClass("game-over");

        setTimeout (function () {
            $("body").removeClass("game-over");
        }, 200);

        //Startover function called to start the game from level 1
        startOver();
    }

}

// ALL LEVELS ARE SET BACK TO NORMAL. IT WILL START THE GAME OVER WHEN CALLED
function startOver() {
    level = 0;
    gamePattern = [];
    started = false; //This will make the keyboard function again when clicked and restart
}





function nextSequence() {

    userClickedPattern = []; //This wil reset the pattern the player has clicked each time the nextSequence() is called
    level++ //And also increment the level everytime it is called

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //generate random number from 0-3

    var randomChosenColour = buttonColours[randomNumber]; //From the randomnumber generated above, wil be used to select random colors from the buttonColor array
    gamePattern.push(randomChosenColour); //These raandom chosen colors are pushed into the empty "gamePattern" array created

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //This creates the double flash on any randomly selected colors on each level

    playSound(randomChosenColour); // Will play the random selected color sound, as it has been created below

    animatePress(randomChosenColour); //This gives the press or click animation, as it has been created below

}

//Plays sound on any selected clor when called
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
//Animates the cicked button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//This eventlistener is created to allow the game start once the button is clicked and not repeat te function again when button is clicked during the game
$(document).on("keypress", function() {
    if (!started) {
        nextSequence();
        started = true; //without this, the level will continue to increase evrytime a key is pressed. Note we already created the main "started" var to be false, so it has to be true here
    }
    
});

