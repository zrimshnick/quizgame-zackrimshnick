console.log("Connected");
///////////////////////////////////////////////////////////////
// importing other js files
import { questions } from "./questions";

///////////////////////////////////////////////////////////////
// Start js for quiz game here
// grab elements in the HTML by id to refer to later in the js
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const endButton = document.getElementById("end-btn");
const restartButton = document.getElementById("restart-btn");
const finalResults = document.getElementById("get-results");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const score = document.getElementById("right-answers");
const container = document.getElementById("container");

// to create score counter (let is for changing variables)
let countRightAnswers = 0;
let countWrongAnswers = 0;

// to make questions appear in random order (as well as in the function startGame)
let shuffledQuestions, currentQuestionIndex;

// these pretty much mean that on "click" of button, it will run a function
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
endButton.addEventListener("click", getResults);
restartButton.addEventListener("click", startGame);

// function to start the game: hides start button, the final results, and restart button randomizes question order, and calls the next question function
function startGame() {
  console.log("Started Game");
  countRightAnswers = 0;
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  finalResults.classList.add("hide");
  restartButton.classList.add("hide");
  countRightAnswers = 0;
  countWrongAnswers = 0;
  document.getElementById("right-answers").innerHTML =
    "Score: " +
    countRightAnswers +
    "/" +
    (countWrongAnswers + countRightAnswers);
  setNextQuestion();
}

// function to move onto next question: calls reset function and the show question function; also shows the score & increases the size of the question container
function setNextQuestion() {
  resetState();
  score.classList.remove("hide");
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  container.classList.add("big");
}

// function to show question: grabs the question and answer choices, and turns each into a button, adding the class of "btn", as well as allowing to click your choice through event listener on "click"
function showQuestion(question) {
  questionElement.innerText =
    countWrongAnswers + countRightAnswers + 1 + ") " + question.question;
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
  // removes "correct" and "wrong" to remove styling for correct/wrong choices
  container.classList.remove("correct");
  container.classList.remove("wrong");
}

// function to select answer: checks through the array to find correct choice and match if you selected it
function selectAnswer(e) {
  const selectedButton = e.target;
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  // checks if there's more question remaining and either hides the next button if there isn't or hides the end game button
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    console.log("Getting Results");
    endButton.classList.remove("hide");
  }
  // adds either correct or wrong to selected answer choice to give it that specific styling from the css as well as increase score by 1
  if ((selectedButton.property = correct)) {
    countRightAnswers++;
    container.classList.add("correct");
  }
  if (!(selectedButton.property = correct)) {
    countWrongAnswers++;
    container.classList.add("wrong");
  }
  // uses right answers and right + wrong with a string to make the score counter
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

// function to bring to new screen showing score, removes correct/wrong property, shows the final results, hides the score, end button, and question container
function getResults() {
  console.log("Getting Results Function");
  container.classList.remove("correct");
  container.classList.remove("wrong");
  finalResults.classList.remove("hide");
  score.classList.add("hide");
  endButton.classList.add("hide");
  questionContainerElement.classList.add("hide");
  // text for showing the final score
  finalResults.innerText =
    "You finished with a score of " +
    countRightAnswers +
    "/" +
    (countWrongAnswers + countRightAnswers) +
    ", or " +
    (countRightAnswers / (countWrongAnswers + countRightAnswers)) * 100 +
    "%";
  restart();
}

// function to restart quiz
function restart() {
  console.log("Restarting Quiz...");
  restartButton.classList.remove("hide");
}
