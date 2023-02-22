// Getting HTML elements
var startButton = document.querySelector(".start-btn");
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
  },
  {
    question: "G _ T",
    choiceA: "E",
    choiceB: "G",
    choiceC: "M",
    choiceD: "T",
    correctAnswer: "E",
  },
  {
    question: "O _",
    choiceA: "O",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "R",
  },
  {
    question: "ST _ P",
    choiceA: "O",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "O",
  },
  {
    question: "C _ ME",
    choiceA: "O",
    choiceB: "Q",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "O",
  },
  {
    question: "H _ T",
    choiceA: "Z",
    choiceB: "A",
    choiceC: "R",
    choiceD: "D",
    correctAnswer: "A",
  },
  {
    question: "O _ R",
    choiceA: "O",
    choiceB: "A",
    choiceC: "P",
    choiceD: "U",
    correctAnswer: "U",
  },
  {
    question: "TH _ T",
    choiceA: "G",
    choiceB: "T",
    choiceC: "A",
    choiceD: "D",
    correctAnswer: "A",
  },
];
// Other variables in
var finalQuestionIndex = quizQuestions.length - 1;
var currentQuestionIndex = 0;
var timerInterval;
var timeLeft = 60;
var score = 0;
var correct;

// Generates the quiz questions and puts the buttons on a on click to the check answer function
function generateQuizQuestions() {
  buttonGrid.style.display = "";
  var currentQuestion = quizQuestions[currentQuestionIndex];
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
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
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
