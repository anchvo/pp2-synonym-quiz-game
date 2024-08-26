// Game Buttons / Variables
let startGameButton = document.getElementById("start-game-btn");


// DOM Elements / Variables
let startArea = document.getElementById("start-area");
let gameArea = document.getElementById("game-area");

// Event Listeners
// Sets the startGame function to the event that the startGameButton is clicked
startGameButton.addEventListener("click", startGame);

// Opens the instruction modal openInstructionsModal.addEventListener('click', () => {instructionsModal.showModal();}) 

// Modal
let instructionsModal = document.getElementById("instructions-modal");
let openInstructionsModal = document.getElementById("open-instructions");
let closeInstructionsModal = document.getElementById("close-instructions");

openInstructionsModal.onclick = function () {
    instructionsModal.style.display = "block";
}

closeInstructionsModal.onclick = function () {
    instructionsModal.style.display = "none";
}
// Questions Array

// Functions
function startGame() {
    /** Removes hidden class from game area and adds it to start Area, 
     * making Homepage content invisible and Game content visible
     */
    gameArea.classList.remove("hidden");
    startArea.classList.add("hidden");
}