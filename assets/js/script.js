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
let feedbackBox = document.getElementById("feedback-box");

// Sets Variable to count the different questions and allows to loop through each of them
let currentQuestionIndex = 0;

// Event Listeners
// Sets the startGame function to the event that the startGameButton is clicked
startGameButton.addEventListener("click", startGame);

// Modal with open and close functions
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
 * allowing the user to choose the category
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


    function loadGame(gameType) {

        gameArea.classList.remove("hidden");
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
     * Loads questions and answers of the verb category into the game board,
     * making them visible for the user
     */
    function displayVerbQuestions() {

        let currentQuestion = verbsQuestions[currentQuestionIndex];
        questionBox.innerHTML = currentQuestion.question;



        currentQuestion.answers.forEach(item => {
            let answerButton = document.createElement("button");
            answerButton.innerHTML = answer;
            answerButton.classList.add("answer-buttons");
        });

        gameBox.appendChild(answerButton);
    }