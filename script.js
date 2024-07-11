

const name1=document.querySelector('.name1')


const player1=prompt("Enter the Name")

name1.innerText=player1

console.log(player1)
const leaderboardData = [
  { name: "Player 1", score: 0 }
];



let winner = "";
let highestScore = -Infinity; 

for (let i = 0; i < leaderboardData.length; i++) {
    if (leaderboardData[i].score > highestScore) {
        highestScore = leaderboardData[i].score;
        winner = leaderboardData[i].name;
    }
}




function displayLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = score;


  leaderboardData.forEach((entry) => { 
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.name}: ${entry.score}`;
    leaderboard.appendChild(listItem);
  });
}


window.onload = displayLeaderboard;

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "images/hangman-0.svg";
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord 
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  const modalText = isVictory ? `You found the word:` : "The correct word was:";
  gameModal.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Congrats!"
    : "Game Over!";
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
       
      }
    });
  } else {
    
    wrongGuessCount++;
    
    document.querySelector(".score").innerText = wrongGuessCount;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
