console.log("Connected");
///////////////////////////////////////////////////////////////
// importing other js files
import { questions } from "./questions";

///////////////////////////////////////////////////////////////
// Start js for quiz game here

// grab elements in the HTML by id to use later in the js
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const endButton = document.getElementById("end-btn");
const finalResults = document.getElementById("get-results");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// to create score counter
let countRightAnswers = 0;
let countWrongAnswers = 0;

// to make questions appear in random order (as well as in the function startGame)
let shuffledQuestions, currentQuestionIndex;

// on click, start button will move to next screen showing question 1
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
endButton.addEventListener("click", getResults);

// function to start the game: hides start button, randomizes question order, and calls the next question function
function startGame() {
  console.log("Started Game");
  countRightAnswers = 0;
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

// function to bring to new screen showing score
function getResults() {
  console.log("Getting Results Function");
  finalResults.classList.remove("hide");
}

// function to move onto next question: calls reset function and the show question function
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  //showQuestion([currentQuestionIndex]);
}

// function to show question: grabs the question and answer choices, and turns each into a button, adding the class of "btn", as well as allowing to click your choice
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

// function to reset the field: clears the body class of hide, and removes the answer choices
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// function to select answer: checks through the array to find correct choice and match if you selected it, and checks if there's more questions to continue, if not then allow to restart. also counts a correct answer
function selectAnswer(e) {
  const selectedButton = e.target;
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    //startButton.innerText = "Restart";
    //startButton.classList.remove("hide");
    console.log("Getting Results");
    //nextButton.classList.add("hide");
    endButton.classList.remove("hide");
    //getResults();
  }
  if ((selectedButton.property = correct)) {
    countRightAnswers++;
  }
  if (!(selectedButton.property = correct)) {
    countWrongAnswers++;
  }
  document.getElementById("right-answers").innerHTML =
    "Score: " +
    countRightAnswers +
    "/" +
    (countWrongAnswers + countRightAnswers);
}

// function to set a choice as correct or wrong: if the element parameter is correct then set to correct, if not then wrong
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// function to clear a choice: it removers either parameter
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
