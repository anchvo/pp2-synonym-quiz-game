// Game Buttons / Static Variables
let startGameButton = document.getElementById("start-game-btn");
let answerButtons = document.getElementsByClassName("answer-buttons");
let categoryButtons = document.getElementsByClassName("category-buttons");

// DOM Elements / Static Variables
let startArea = document.getElementById("start-area");
let categoriesArea = document.getElementById("game-categories");
let verbsButton = document.getElementById("verbs-button");
let nounsButton = document.getElementById("nouns-button");
let adjectivesButton = document.getElementById("adjectives-button");
let gameMenu = document.getElementById("game-menu");
let gameArea = document.getElementById("game-area");
let userInput = document.getElementById("user-input");
let userCredentials = document.getElementById("user-credentials-box");
let questionBox = document.getElementById("question-box");
let questionSynonym = document.getElementById("question-synonym");
let synonymDescription = document.getElementById("synonym-description");
let scoreBox = document.getElementById("score-box");
let infoBox = document.getElementById("info-box");
let infoProgress = document.getElementById("current-progress");
let tierProgress = document.getElementById("tier-progress");
let triesScore = document.getElementById("tries-score");
let infoOptions = document.getElementById("user-options");
let gameBox = document.getElementById("game-box");
let optionsBox = document.getElementById("options-buttons");
let nextButton = document.getElementById("next-button");
let continueButton = document.getElementById("continue-button");
let feedbackBox = document.getElementById("feedback-box");

// Variables with preset (undefined) value which will be set in functions later and have to be reset for another game loop
// Sets variable for reading the data-type attribute of the category buttons, allowing to pick a different category with each button
let gameType;
// Sets variable to count the different questions and allows to loop through each of them
let currentQuestionIndex = 0;
let currentQuestion;
let currentCategory;
let example;
// Set variable to count the score for finished category tiers
let scoreTiers = 0;
// Set variable to count the score for number of tries
let scoreTries = 0;

// Variables with preset (undefined) value which will be set in functions later but can't be reset
// Set variable as array to put finished categories in
let finishedCategories = [];

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
    gameMenu.classList.remove("hidden");
    categoriesArea.classList.remove("hidden");

    for (let button of categoryButtons) {
        button.addEventListener("click", function () {

            // Sets variable gameType to allow to refer to different categories
            gameType = this.getAttribute("data-type");
            loadGame(gameType);
        })

    }
}

function clearGame() {

    optionsBox.classList.add("hidden");

    gameType;
    currentQuestion;
    currentQuestionIndex = 0;
    answerIndex = 0;
    example;
    currentCategory;
    scoreTiers = 0;
    scoreTries = 0;

    continueGame();
}

function continueGame() {

    infoProgress.classList.add("hidden");

    infoOptions.textContent = "Please choose your next category:";

    if (finishedCategories.includes("Verbs")) {

        categoriesArea.classList.remove("hidden");
        verbsButton.classList.add("hidden");

        if (finishedCategories.includes("Verbs" && "Nouns")) {
            nounsButton.classList.add("hidden");

        } else if (finishedCategories.includes("Verbs" && "Adjectives")) {
            adjectivesButton.classList.add("hidden");
        }

        for (let button of categoryButtons) {
            button.addEventListener("click", function () {

                // Sets variable gameType to allow to refer to different categories
                gameType = this.getAttribute("data-type");
                loadGame(gameType);
            })
        }
    }

    if (finishedCategories.includes("Nouns")) {
        categoriesArea.classList.remove("hidden");
        nounsButton.classList.add("hidden");

        if (finishedCategories.includes("Nouns" && "Verbs")) {
            verbsButton.classList.add("hidden");

        } else if (finishedCategories.includes("Nouns" && "Adjectives")) {
            adjectivesButton.classList.add("hidden");
        }

        for (let button of categoryButtons) {
            button.addEventListener("click", function () {

                // Sets variable gameType to allow to refer to different categories
                gameType = this.getAttribute("data-type");
                loadGame(gameType);
            })
        }
    }

    if (finishedCategories.includes("Adjectives")) {
        categoriesArea.classList.remove("hidden");
        adjectivesButton.classList.add("hidden");

        if (finishedCategories.includes("Adjectives" && "Nouns")) {
            nounsButton.classList.add("hidden");

        } else if (finishedCategories.includes("Adjectives" && "Verbs")) {
            verbsButton.classList.add("hidden");
        }

        for (let button of categoryButtons) {
            button.addEventListener("click", function () {

                // Sets variable gameType to allow to refer to different categories
                gameType = this.getAttribute("data-type");
                loadGame(gameType);
            })
        }
    }


}

/** Removes hidden class from the game area and hides the category buttons, 
 * loading the respective functions for each category questions by reading the game-type chosen with buttons in startGame function
 */
function loadGame(gameType) {

    gameMenu.classList.remove("hidden");
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
 * Loads questions and buttons with answer options of the verbs category into the game board when category is chosen,
 * making them visible for the user
 */
function displayVerbsQuestions() {

    if (currentQuestionIndex >= verbsQuestions.length) {
        currentCategory = "verbs-category";
        finishCategory(currentCategory);
    }

    gameBox.innerHTML = "";

    currentQuestion = verbsQuestions[currentQuestionIndex];
    questionSynonym.innerHTML = currentQuestion.question;

    synonymDescription.innerHTML = currentQuestion.description;

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

    if (answerIndex >= verbsQuestions.length) {
        currentCategory = "verbs-category";
        optionsBox.classList.remove("hidden");
        continueButton.classList.remove("hidden");
        continueButton.addEventListener("click", finishCategory(currentCategory));
    } else if (answerIndex === verbsQuestions[currentQuestionIndex].correctAnswer) {

        // Adds styling to answer button when answer is correct
        answerButton.style.backgroundColor = "#289D8F";
        answerButton.style.border = "none";

        // Adds feedback to the user when answering correctly, displaying the example sentence
        example = verbsQuestions[currentQuestionIndex].example;
        feedbackBox.textContent = `Correct! ${example}`;

        // Increments the Tries each times a answer button is clicked
        incrementTries();

        // Removes hidden class from next button, allowing the user to click it and advance to the next question
        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextVerbsQuestion);

    } else {

        // Adds styling to answer button when answer is incorrect
        answerButton.style.backgroundColor = "#E76F51";
        answerButton.style.border = "none";

        feedbackBox.innerHTML = "Incorrect!";
        // Increments the Tries each times a answer button is clicked
        incrementTries();
        nextButton.classList.add("hidden");

    }
}

/**
 * After pressing the nextButton, the function clears the feedback and hides the button. 
 * It then loads the next question in the verbs category array. 
 * If the array of questions is at an end, the function calls another to show the info and choices at the end of the category.
 */
function setNextVerbsQuestion() {

    feedbackBox.innerHTML = "";
    incrementProgress();
    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayVerbsQuestions();
}

/**
 * Loads questions and buttons with answer options of the nouns category into the game board when category is chosen,
 * making them visible for the user
 */
function displayNounsQuestions() {

    if (currentQuestionIndex >= nounsQuestions.length) {
        currentCategory = "nouns-category";
        finishCategory(currentCategory);
    }

    gameBox.innerHTML = "";

    currentQuestion = nounsQuestions[currentQuestionIndex];
    questionSynonym.innerHTML = currentQuestion.question;

    synonymDescription.innerHTML = currentQuestion.description;

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

        // Adds styling to answer button when answer is correct
        answerButton.style.backgroundColor = "#289D8F";
        answerButton.style.border = "none";

        // Adds feedback to the user when answering correctly, displaying the example sentence
        example = nounsQuestions[currentQuestionIndex].example;
        feedbackBox.textContent = `Correct! ${example}`;
        // Increments the Tries each times a answer button is clicked
        incrementTries();

        // Removes hidden class from next button, allowing the user to click it and advance to the next question
        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextNounsQuestion);

    } else {

        // Adds styling to answer button when answer is incorrect
        answerButton.style.backgroundColor = "#E76F51";
        answerButton.style.border = "none";

        feedbackBox.innerHTML = "Incorrect!";
        // Increments the Tries each times a answer button is clicked
        incrementTries();
        nextButton.classList.add("hidden");

    }
}

/**
 * After pressing the nextButton, the function clears the feedback and hides the button. 
 * It then loads the next question in the nouns category array. 
 * If the array of questions is at an end, the function calls another to show the info and choices at the end of the category.
 */
function setNextNounsQuestion() {

    feedbackBox.innerHTML = "";
    incrementProgress();
    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayNounsQuestions();
}

/**
 * Loads questions and buttons with answer options of the adjectives category into the game board when category is chosen,
 * making them visible for the user
 */
function displayAdjectivesQuestions() {

    if (currentQuestionIndex >= adjectivesQuestions.length) {
        currentCategory = "adjectives-category";
        finishCategory(currentCategory);
    }

    gameBox.innerHTML = "";

    currentQuestion = adjectivesQuestions[currentQuestionIndex];
    questionSynonym.innerHTML = currentQuestion.question;

    synonymDescription.innerHTML = currentQuestion.description;

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

        // Adds styling to answer button when answer is correct
        answerButton.style.backgroundColor = "#289D8F";
        answerButton.style.border = "none";

        // Adds feedback to the user when answering correctly, displaying the example sentence
        example = adjectivesQuestions[currentQuestionIndex].example;
        feedbackBox.textContent = `Correct! ${example}`;
        // Increments the Tries each times a answer button is clicked
        incrementTries();

        // Removes hidden class from next button, allowing the user to click it and advance to the next question
        optionsBox.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        nextButton.addEventListener("click", setNextAdjectivesQuestion);
    } else {

        // Adds styling to answer button when answer is incorrect
        answerButton.style.backgroundColor = "#E76F51";
        answerButton.style.border = "none";

        feedbackBox.innerHTML = "Incorrect!";
        // Increments the Tries each times a answer button is clicked
        incrementTries();
        nextButton.classList.add("hidden");
    }

}

/**
 * After pressing the nextButton, the function clears the feedback and hides the button. 
 * It then loads the next question in the adjectives category array. 
 * If the array of questions is at an end, the function calls another to show the info and choices at the end of the category.
 */
function setNextAdjectivesQuestion() {

    feedbackBox.innerHTML = "";
    optionsBox.classList.add("hidden");
    currentQuestionIndex++;
    displayAdjectivesQuestions();
    incrementProgress();
}

/**
 * Calls the value of the set progress number from the HTML element (0) and adds +1
 */
function incrementProgress() {

    scoreTiers++;
    tierProgress.innerHTML = scoreTiers;

    /* let oldProgress = parseInt(document.getElementById("tier-progress").innerText);
    document.getElementById("tier-progress").innerText = ++oldProgress;*/

}

/**
 * Calls the value of the set tries number from the HTML element (0) and adds +1
 */
function incrementTries() {

    scoreTries++;
    triesScore.innerHTML = scoreTries;

    /* let oldTries = parseInt(document.getElementById("tries-score").innerText);
    document.getElementById("tries-score").innerText = ++oldTries; */

}

/**
 * After finishing the first category, the user can choose which of the two others he wants to do next.
 * Checks which category was chosen before and shows the choice buttons for the other two, then calls the loadGame function
 */
function finishCategory(currentCategory) {

    questionBox.classList.add("hidden");
    scoreBox.classList.add("hidden");
    infoBox.classList.remove("hidden");

    /* Checks if the current category is set for verbs so only the buttons for the other two categories are shown.
    Shows a congratulary message specific to the category to the user.
    */

    if (currentCategory === "verbs-category") {
        finishedCategories.push("Verbs");
        infoProgress.textContent = `Congratulations! 
        You finished all ${scoreTiers} tiers of the Verbs category!`;

        // Removes hidden class from continue button, allowing the user to click it and advance to choosing next category
        optionsBox.classList.remove("hidden");
        nextButton.classList.add("hidden");
        continueButton.classList.remove("hidden");
        continueButton.addEventListener("click", clearGame);

    }

    /* Checks if the current category is set for nouns so only the buttons for the other two categories are shown.
    Shows a congratulary message specific to the category to the user.
    */
    if (currentCategory === "nouns-category") {
        finishedCategories.push("Nouns");
        infoProgress.textContent = `Congratulations! 
        You finished all ${scoreTiers} tiers of the Nouns category!`;

        // Removes hidden class from continue button, allowing the user to click it and advance to choosing next category
        optionsBox.classList.remove("hidden");
        nextButton.classList.add("hidden");
        continueButton.classList.remove("hidden");
        continueButton.addEventListener("click", clearGame);

    }

    /* Checks if the current category is set for adjectives so only the buttons for the other two categories are shown.
    Shows a congratulary message specific to the category to the user.
    */
    if (currentCategory === "adjectives-category") {
        finishedCategories.push("Adjectives");

        infoProgress.textContent = `Congratulations! 
        You finished all ${scoreTiers} tiers of the Adjectives category!`;

        // Removes hidden class from continue button, allowing the user to click it and advance to choosing next category
        optionsBox.classList.remove("hidden");
        nextButton.classList.add("hidden");
        continueButton.classList.remove("hidden");
        continueButton.addEventListener("click", clearGame);

    }
}