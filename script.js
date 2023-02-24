// Getting HTML elements
var startButton = document.getElementById("start-btn");
var questionElement = document.querySelector(".questions");
var userInitials = document.querySelector("#initials");
var userHighScore = document.querySelector("#highscore-score");
var sumbitBtn = document.querySelector("#submitScore");
var buttonGrid = document.querySelector(".btn-grid");
var quizTimer = document.querySelector("#timer");
var buttonA = document.querySelector(".btn-a");
var buttonB = document.querySelector(".btn-b");
var buttonC = document.querySelector(".btn-c");
var buttonD = document.querySelector(".btn-d");
var containerEL = document.querySelector(".container");
var container = document.querySelector("#question-box");
var highscorePage = document.querySelector("#highscore-header");
const msg = new SpeechSynthesisUtterance();
highscorePage.style.display = "none";
userInitials.style.display = "none";
sumbitBtn.style.display = "none";

// Quiz questions object
var quizQuestions = [
  {
    question: "A _ ",
    choiceA: "A",
    choiceB: "D",
    choiceC: "S",
    choiceD: "F",
    correctAnswer: "S",
    sound: "As",
  },
  {
    question: "G _ T",
    choiceA: "E",
    choiceB: "G",
    choiceC: "M",
    choiceD: "T",
    correctAnswer: "E",
    sound: "Get",
  },
  {
    question: "O _",
    choiceA: "O",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "R",
    sound: "Or",
  },
  {
    question: "ST _ P",
    choiceA: "O",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "O",
    sound: "Stop",
  },
  {
    question: "C _ ME",
    choiceA: "O",
    choiceB: "Q",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "O",
    sound: "Come",
  },
  {
    question: "H _ T",
    choiceA: "Z",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "A",
    sound: "Hat",
  },
  {
    question: "O _ R",
    choiceA: "O",
    choiceB: "A",
    choiceC: "P",
    choiceD: "U",
    correctAnswer: "U",
    sound: "Our",
  },
  {
    question: "TH _ T",
    choiceA: "G",
    choiceB: "T",
    choiceC: "A",
    choiceD: "D",
    correctAnswer: "A",
    sound: "That",
  },
  {
    question: "C _ T", 
    choiceA: "A",
    choiceB: "U",
    choiceC: "I",
    choiceD: "P",
    correctAnswer: "U",
    sound: "Cut",
  },

  {
    question: "I _ ",
    choiceA: "E",
    choiceB: "T",
    choiceC: "F",
    choiceD: "S",
    correctAnswer: "T",
    sound: "It",
  },

  {
    question: "R _ D",
    choiceA: "I",
    choiceB: "A",
    choiceC: "O",
    choiceD: "E",
    correctAnswer: "E",
    sound: "Red",
  },

  {
    question: "WH _ N",
    choiceA: "G",
    choiceB: "A",
    choiceC: "E",
    choiceD: "N",
    correctAnswer: "E",
    sound: "When",
  },

  {
    question: "FR _ M",
    choiceA: "O",
    choiceB: "E",
    choiceC: "A",
    choiceD: "U",
    correctAnswer: "O",
    sound: "From",
  },

  {
    question: "MU _ T",
    choiceA: "I",
    choiceB: "O",
    choiceC: "A",
    choiceD: "S",
    correctAnswer: "S",
    sound: "Must",
  },
];
// Other variables in
var finalQuestionIndex = quizQuestions.length - 1;
var currentQuestionIndex = 0;
var timerInterval;
var timeLeft = 60;
var score = 0;
var correct;

const sayWord = (msg) => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "Hello World";
  window.speechSynthesis.speak(msg);
}
let speech = new SpeechSynthesisUtterance();
  let sound = document.getElementById("btn-sound")

// Generates the quiz questions and puts the buttons on a on click to the check answer function
function generateQuizQuestions() {
  buttonGrid.style.display = "";
  var currentQuestion = quizQuestions[currentQuestionIndex];
  let speech = new SpeechSynthesisUtterance();
  let sound = document.getElementById("btn-sound")
  
  // sound.addEventListener("click", () => {
  //   voice = []
    speech.text = currentQuestion.sound
  //   voice.push(speech.txt)
  //   console.log(voice)
  //   window.speechSynthesis.speak(speech)
    function playSound() {
      speech.text = currentQuestion.sound
      window.speechSynthesis.speak(speech)
    }
  
  sound.onclick = playSound
  questionElement.innerHTML = currentQuestion.question;
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonA.onclick = checkAnswer;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonB.onclick = checkAnswer;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonC.onclick = checkAnswer;
  buttonD.innerHTML = currentQuestion.choiceD;
  buttonD.onclick = checkAnswer;

  
}
// function to check the answer.
function checkAnswer(answer) {
  answer = answer.target.innerText;
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
  // if answer is correct add 5 to the score and call the generateQuizQuestion function
  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score = score + 5;
    alert("That Is Correct!");
    generateQuizQuestions();
    //display in the results div that the answer is correct.
  } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
    alert("That Is Incorrect.");
    generateQuizQuestions();
  }
  //display in the results div that the answer is wrong.
  if (currentQuestionIndex === finalQuestionIndex) {
    alert("You Have Completed All The Questions, Click Ok To See How You Did!");
    endGame();
  } else {
    currentQuestionIndex++;
    generateQuizQuestions();
  }
}

// function to start the quiz
function startGame() {
  let answerButtons = document.getElementById("answer-buttons")
  startButton.style.display = "none";
  highscorePage.style.display = "none";
  answerButtons.style.display = "block";
  answerButtons.classList.remove("d-none")
  answerButtons.style.fontSize = "30px"
  // questionElement.style.display = "none";
  generateQuizQuestions();
  // logic to start the Timer
}

// function to sace the scores to local storage
function saveScores() {
  // adds a event listener to the click of the submit button.
  sumbitBtn.addEventListener("click", function () {
    // defined var = userName to the value of the text input
    var userName = document.querySelector("#initials").value;
    // Using JSON parse to getITtem of the "savedScored" or || creates a empty array
    var savedScores =
      JSON.parse(window.localStorage.getItem("savedScores")) || [];
    // defines newUserScore as score being the literal score of the count being taken
    const newUserScore = {
      score: score,
      name: userName,
    };
    // pushes the created array to the savedScores
    savedScores.push(newUserScore);
    // stringigy the array
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    console.log(userInitials);
    sumbitBtn.style.display = "none";
    userInitials.style.display = "none";
    console.log(savedScores)
  });
}

// function to end the game and display the highscore inout etc
function endGame() {
  container.style.display = "none";
  // highscorePage.style.display = "block";
  // userInitials.style.display = "block";
  // sumbitBtn.style.display = "block";
  buttonGrid.style.display = "none";
  containerEL.style.display = "none";
  alert(" Congrats! Your score is " + score);
  location.reload();
  // saveScores();
}
// starts the game on a click of the start button
startButton.addEventListener("click", startGame);

// Need to create a start button
// Need Words to create answer to
// Need a basic form to gather input
// Need a to check if answer === correct answer

// On start of the game start button needs to disaper
// 1st question needs to be displayed on screen with multiple choice answer
// Check if answer is correct
// If answer is correct next question, if answer is not correct ask again
