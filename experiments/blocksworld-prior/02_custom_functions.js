// Here, you can define all custom functions, you want to use and initialize some variables

// You can determine global (random) parameters here

// Declare your variables here

/* For generating random participant IDs */
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function (dec) {
  return ("0" + dec.toString(16))
    .substr(-2);
};
// generateId :: Integer -> String
const generateID = function (len) {
  let arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, this.dec2hex)
    .join("");
};

// Error feedback if participants exceeds the time for responding
const time_limit = function (data, next) {
  if (typeof window.timeout === "undefined") {
    window.timeout = [];
  }
  // Add timeouts to the timeoutarray
  // Reminds the participant to respond after 5 seconds
  window.timeout.push(
    setTimeout(function () {
      $("#reminder")
        .text("Please answer more quickly!");
    }, 5000)
  );
  next();
};

// compares the chosen answer to the value of `option1`
check_response = function (data, next) {
  $("input[name=answer]")
    .on("change", function (e) {
      if (e.target.value === data.correct) {
        alert("Your answer is correct! Yey!");
      } else {
        alert(
          "Sorry, this answer is incorrect :( The correct answer was " +
          data.correct
        );
      }
      next();
    });
};

// custom functions:
let id2Question = {"bg": "<b>Blue will</b> and <b>orange will</b> touch the ground.",
                   "g": "<b>Blue will not</b> and <b>orange will</b> touch the ground.",
                   "b": "<b>Blue will</b> and <b>orange will not</b> touch the ground.",
                   "none": "<b>Blue will not</b> and <b>orange will not</b> touch the ground."
                 };
let _idQuestions = Object.entries(id2Question);
let question2ID = {};
_idQuestions.forEach(function(keyValue){
    question2ID[keyValue[1]] = keyValue[0];
})

// function to randomly order the four utterences, given per trial
function random_utterance(slider_rating_trials=[{}]) {
  for (var i = 0; i < slider_rating_trials.length; i++) {
    let utterances = _.shuffle(Object.values(id2Question));
    slider_rating_trials[i].question1 = utterances[0];
    slider_rating_trials[i].question2 = utterances[1];
    slider_rating_trials[i].question3 = utterances[2];
    slider_rating_trials[i].question4 = utterances[3];
  }
  return slider_rating_trials;
}

repliedAll = function(){
  return ($("#response1").hasClass('replied') &&
          $("#response2").hasClass('replied') &&
          $("#response3").hasClass('replied') &&
          $("#response4").hasClass('replied'));
}
toggleNextIfDone = function (button, condition) {
    if(condition){
      button.removeClass("grid-button");
    }
};

automaticallySelectAnswer = function(responseID) {
    document.getElementById(responseID).value = Math.floor(Math.random() * 101);
    $("#" + responseID).addClass('replied');
}

let key2SelectAnswer = "y";

addShortCut2SelectAnswers = function(button2Toggle){
  let counter = 0;
  document.addEventListener("keydown", event => {
    var keyName = event.key;
    if (counter == 0 && keyName === key2SelectAnswer) {
      automaticallySelectAnswer("response1");
      toggleNextIfDone(button2Toggle, repliedAll())
      counter += 1;
    } else if (counter == 1 && keyName === key2SelectAnswer){
      automaticallySelectAnswer("response2");
      toggleNextIfDone(button2Toggle, repliedAll())
      counter += 1;
    } else if (counter == 2 && keyName === key2SelectAnswer){
      automaticallySelectAnswer("response3");
      toggleNextIfDone(button2Toggle, repliedAll())
      counter += 1;
    } else if(counter == 3 && keyName === key2SelectAnswer){
      automaticallySelectAnswer("response4");
      toggleNextIfDone(button2Toggle, repliedAll())
      counter += 1;
    }
    return keyName;
  });
}
