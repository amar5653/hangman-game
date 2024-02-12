const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");

let currentWord;

const getRandomWord = () => {
   
   //Getting a random word from word list
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
   console.log(word);
   currentWord = word;
   document.querySelector(".hint-text b").innerText = hint;
 wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");

}

const initGame = (button, clickedLetter) => {
  console.log(button, clickedLetter);

  //cheking if clicked letter inculdes in random word
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
if(letter === clickedLetter) {
   const liTag = wordDisplay.querySelectorAll("li");
   liTag[index].innerText= letter;
   liTag[index].classList.add("guessed");
}
    });
    } else {

    }
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

