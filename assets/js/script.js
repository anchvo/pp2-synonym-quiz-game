// Game Buttons / Variables
let startGameButton = document.getElementById("start-game-button");


// DOM Elements / Variables
let startArea = document.getElementById("start-area");

// Event Listeners
startGameButton.addEventListener('click', startGame);

// Questions Array

// Functions
function startGame() {
    startArea.classList.add('hidden');
    gameArea.classList.remove('hidden');
} 
