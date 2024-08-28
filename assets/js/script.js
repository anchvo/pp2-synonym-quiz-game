// Game Buttons / Variables
let startGameButton = document.getElementById("start-game-btn");
let answerButtons = document.getElementsByClassName("answer-buttons");
let categoryButtons = document.getElementsByClassName("category-buttons");


// DOM Elements / Variables
let startArea = document.getElementById("start-area");
let categoriesArea = document.getElementById("game-categories");
let gameArea = document.getElementById("game-area");
let userInput = document.getElementById("user-input");
let userCredentials = document.getElementById("user-credentials-box");
let questionBox = document.getElementById("question-box");
let scoreBox = document.getElementById("score-box");
let gameBox = document.getElementById("game-box");
let optionsBox = document.getElementById("options-buttons")
let nextButton = document.getElementById("next-button");
let retryButton = document.getElementById("retry-button");
let feedbackBox = document.getElementById("feedback-box");

// Sets Variable to count the different questions and allows to loop through each of them
let currentQuestionIndex = 0;

// Event Listeners
// Sets the startGame function to the event that the startGameButton is clicked
startGameButton.addEventListener("click", startGame);

// Modal for How to Play instructions with open and close functions
let instructionsModal = document.getElementById("instructions-modal");
let openInstructionsModal = document.getElementById("open-instructions");
let closeInstructionsModal = document.getElementById("close-instructions");

openInstructionsModal.onclick = function () {
    instructionsModal.style.display = "block";
}

closeInstructionsModal.onclick = function () {
    instructionsModal.style.display = "none";
}

// Functions

/** Removes hidden class from the category buttons and hiding previous content,
 * allowing the user to choose the category. Adds listening event for clicking on a category button,
 * and loading the loadGame function.
 */
function startGame() {

    startArea.classList.add("hidden");
    categoriesArea.classList.remove("hidden");

    for (let button of categoryButtons) {
        button.addEventListener("click", function () {

            // Sets variable gameType to allow to refer to different categories
            let gameType = this.getAttribute("data-type");
            loadGame(gameType);
        })

    }
}
/** Removes hidden class from the game area and hides the category buttons, 
 * loading the respective functions for each category questions by reading the game-type chosen with buttons in startGame function
 */
function loadGame(gameType) {

    gameArea.classList.remove("hidden");
    optionsBox.classList.add("hidden");
    categoriesArea.classList.add("hidden");

    if (gameType === "verbs") {
        displayVerbsQuestions();
    } else if (gameType === "nouns") {
        displayNounsQuestions();
    } else if (gameType === "adjectives") {
        displayAdjectivesQuestions();
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Loads questions and answers of the verbs category into the game board when category is chosen,
 * making them visible for the user
 */
function displayVerbsQuestions() {

    gameBox.innerHTML = "";

    let currentQuestion = verbsQuestions[currentQuestionIndex];
    questionBox.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let answerButton = document.createElement("button");
        answerButton.classList.add("answer-buttons");
        answerButton.innerHTML = answer;
        answerButton.addEventListener("click", () => {
            checkVerbsAnswer(answerButton);
        });

        gameBox.appendChild(answerButton);
    })
}

/**
 * Checks if the chosen answer button of the current question in the verbs category is correct or not,
 * adds feedback for each result to the user and creates buttons to either continue to next question or try again
 */
function checkVerbsAnswer(answerButton) {

    // optionsBox.innerHTML = "";

    let answer = answerButton.innerHTML;
    let answerIndex = verbsQuestions[currentQuestionIndex].answers.indexOf(answer);

    if (answerIndex === verbsQuestions[currentQuestionIndex].correctAnswer) {
        feedbackBox.innerHTML = "Correct!";

        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextVerbsQuestion);

    } else {
        feedbackBox.innerHTML = "Incorrect!";

        /** 
        let retryButton = document.createElement("button");
        retryButton.classList.add("options-buttons");
        retryButton.innerHTML = "Try Again";

        optionsBox.appendChild(retryButton);

        */
    }
}

function setNextVerbsQuestion() {

    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayVerbsQuestions();
}

/**
 * Loads questions and answers of the nouns category into the game board when category is chosen,
 * making them visible for the user
 */
function displayNounsQuestions() {

    gameBox.innerHTML = "";

    let currentQuestion = nounsQuestions[currentQuestionIndex];
    questionBox.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let answerButton = document.createElement("button");
        answerButton.classList.add("answer-buttons");
        answerButton.innerHTML = answer;
        answerButton.addEventListener('click', () => {
            checkNounsAnswer(answerButton);
        });

        gameBox.appendChild(answerButton);
    })
}

/**
 * Checks if the chosen answer button of the current question in the nouns category is correct or not,
 * adds feedback for each result to the user and creates buttons to either continue to next question or try again
 */
function checkNounsAnswer(answerButton) {
    let answer = answerButton.innerHTML;
    let answerIndex = nounsQuestions[currentQuestionIndex].answers.indexOf(answer);

    if (answerIndex === nounsQuestions[currentQuestionIndex].correctAnswer) {
        feedbackBox.innerHTML = "Correct!";

        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextNounsQuestion);

    } else {
        feedbackBox.innerHTML = "Incorrect!";

        /** 
        let retryButton = document.createElement("button");
        retryButton.classList.add("options-buttons");
        retryButton.innerHTML = "Try Again";

        optionsBox.appendChild(retryButton);

        */
    }
}

function setNextNounsQuestion() {

    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayNounsQuestions();
}

/**
 * Loads questions and answers of the adjectives category into the game board when category is chosen,
 * making them visible for the user
 */
function displayAdjectivesQuestions() {

    gameBox.innerHTML = "";

    let currentQuestion = adjectivesQuestions[currentQuestionIndex];
    questionBox.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let answerButton = document.createElement("button");
        answerButton.classList.add("answer-buttons");
        answerButton.innerHTML = answer;
        answerButton.addEventListener('click', () => {
            checkAdjectivesAnswer(answerButton);
        });

        gameBox.appendChild(answerButton);
    })
}

/**
 * Checks if the chosen answer button of the current question in the adjectives category is correct or not,
 * adds feedback for each result to the user and creates buttons to either continue to next question or try again
 */
function checkAdjectivesAnswer(answerButton) {
    let answer = answerButton.innerHTML;
    let answerIndex = adjectivesQuestions[currentQuestionIndex].answers.indexOf(answer);

    if (answerIndex === adjectivesQuestions[currentQuestionIndex].correctAnswer) {
        feedbackBox.innerHTML = "Correct!";

        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextAdjectivesQuestion);
    } else {
        feedbackBox.innerHTML = "Incorrect!";
        nextButton.classList.add("hidden");

        /*
        optionsBox.classList.remove("hidden");
        retryButton.classList.remove("hidden");
        retryButton.addEventListener("click"), function () {
            feedbackBox.innerHTML = "";
        }
        */
    }

}

function setNextAdjectivesQuestion() {

    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayAdjectivesQuestions();
}