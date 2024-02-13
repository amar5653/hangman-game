const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const hangmanImage = document.querySelector(".hangman-box img");
const playAgainBtn = document.querySelector(".play-again");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {

  //resetting all the game and UI elements
  correctLetters = [];
  wrongGuessCount=0;
  hangmanImage.src= `images/hangman-${wrongGuessCount}.svg`;
   guessText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
   keyboard.querySelectorAll("button").forEach(btn=> btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  gameModal.classList.remove("showModal");
}


const getRandomWord = () => {
   
   //Getting a random word from word list
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
   currentWord = word;
   document.querySelector(".hint-text b").innerText = hint;
   resetGame();

  
}

const gameOver = (isVictory) => {

  //After 600ms of game complete showing modal with relevant details
  setTimeout(()=> {
    const modalText = isVictory ? `You found the word: ` : `The Correct word was: `;
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
        gameModal.classList.add("showModal");
  }, 300);
}

const initGame = (button, clickedLetter) => {
  console.log(button, clickedLetter);

  //cheking if clicked letter inculdes in random word
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
if(letter === clickedLetter) {
  correctLetters.push(letter);
   const liTag = wordDisplay.querySelectorAll("li");
   liTag[index].innerText= letter;
   liTag[index].classList.add("guessed");
  
}
    });
    } else {

      //If clicked letter does not exist in guessedword then add the wrong guesscount and hangman image
      wrongGuessCount++;
      hangmanImage.src= `images/hangman-${wrongGuessCount}.svg`;

    }

    button.disabled = true;
    guessText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameover function if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
    
}

//Creating keyboard buttons and adding event listener
for( let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);

    button.addEventListener("click", e=>
      initGame(e.target, String.fromCharCode(i))
    );



}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

