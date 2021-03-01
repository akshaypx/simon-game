var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function randomgen() {
  var a = Math.floor(Math.random() * 10);
  while (a > 3) {
    a = Math.floor(Math.random() * 10);
  }
  return a;
}
function nextSequence() {
  var randomNumber = randomgen();
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //audio
  audioplay(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //levelup everytime it is called
  level += 1;
  $("h1").text("Level " + level);
}

$(".btn").click(function (event) {
  console.log(event);
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  audioplay(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//plays audio when name of color passed
function audioplay(abcd) {
  var obj = document.createElement("audio");
  obj.src = `./sounds/${abcd}.mp3`;
  obj.play();
}

//animate when a button is pressed
function animatePress(abcd) {
  $("." + abcd).addClass("pressed");
  setTimeout(function () {
    $("." + abcd).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (level === 0) nextSequence();
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    audioplay("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

//restart
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
