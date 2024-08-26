// Game Buttons / Variables
let startGameButton = document.getElementById("start-game-btn");


// DOM Elements / Variables
let startArea = document.getElementById("start-area");
let gameArea = document.getElementById("game-area");

// Event Listeners
startGameButton.addEventListener("click", startGame);

// Questions Array

// Functions
function startGame() {
    gameArea.classList.remove("hidden");
    startArea.classList.add("hidden");
    
} 
