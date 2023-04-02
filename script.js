$(document).ready(function () {
  let gamePattern = [];
  let userClickPattern = [];
  let btnColors = ["red", "blue", "green", "yellow"];
  let level = 0;

  function nextSequence() {
    let randomNum = Math.floor(Math.random() * 4);
    console.log(randomNum);
    let randomChosenColor = btnColors[randomNum];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("gamePattern=" + gamePattern);
    let returningBtn = $("#" + randomChosenColor);
    console.log(returningBtn);
    $(returningBtn).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    $("h1").text(
      $("h1")
        .text()
        .replace($("h1").text(), "level " + level)
    );
    level = level + 1;
  }
  $(document).keypress(nextSequence);

  $(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    console.log(userChosenColor);
    userClickPattern.push(userChosenColor);
    console.log("userClickPattern=" + userClickPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let lastAnswer = userClickPattern.length - 1;
    if (!checkAnswer(lastAnswer)) {
      playSound("wrong");
      gameOver();
    } else {
      if (gamePattern.length == userClickPattern.length) {
        userClickPattern = [];
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    }
  });

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
      return true;
    } else {
      return false;
    }
  }

  function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

  function startOver() {
    gamePattern = [];
    userClickPattern = [];
    level = 0;

    $("h1").text(
      $("h1")
        .text()
        .replace($("h1").text(), "Game Over, Press Any Key to Restart. ")
    );
  }
});
