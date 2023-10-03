const animalWords = [
  'RHINOCEROS',
  'HIPPOPOTAMUS',
  'OCTOPUS',
  'DOLPHIN',
  'CROCODILE',
  'LION',
  'ELEPHANT',
  'GIRAFFE',
  'ZEBRA',
  'TIGER',
  'PENGUIN',
  'KOALA',
  'CHEETAH',
  'PANDA',
  'KANGAROO',
  'CAT'
];

const answerDisplayer = document.getElementById('answerDisplayer');
const userAnswer = document.getElementById('userAnswer');
const enterButton = document.getElementById('enterButton');
const errorMessage = document.getElementById('errorMessage');
const chanceDisplayer = document.getElementById('chanceDisplayer');
const wrongLettersDisplayer = document.getElementById('wrongLettersDisplayer');

let wrongLetters = '';

//in game variable
let userAnswerValue = ''; 
let hiddenWord = animalWords[getRandomNumber(0, animalWords.length)];
const maxGuesses = 6;
let wrongGuesses = 0;

console.log(hiddenWord);

// enterButton.addEventListener('click', getUserInputValue);
enterButton.addEventListener('click', playGame);
enterButton.addEventListener('click', () => {
  userAnswer.innerHTML = '';
});

displayEmptyBoxes();
checkInput();

// function getUserInputValue(){
//   userAnswerValue = userAnswer.value.toUpperCase();
// }

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function playGame(){
  userAnswerValue = userAnswer.value.toUpperCase();
  userAnswer.value = '';

  if(wrongGuesses < maxGuesses){
    let doesExist = false;
    
    if(hiddenWord.includes(userAnswerValue)){
      doesExist = true;
    }
    else{
      if(wrongLetters.includes(userAnswerValue)){
        alert('You picked that letter already! Choose a different one');
      }
      else{
        wrongGuesses++;
        chanceDisplayer.innerHTML = maxGuesses - wrongGuesses;
  
        wrongLetters += ` ${userAnswerValue}`;
        wrongLettersDisplayer.innerHTML = wrongLetters;
      }
    }

    if(doesExist){
      for (let i = 0; i < hiddenWord.length; i++) {
        if (userAnswerValue === hiddenWord[i]) {
          let correctLetters = document.querySelectorAll(`.letter-${userAnswerValue}`);
        
          correctLetters.forEach((element) => {
            element.innerHTML = `${userAnswerValue}`;
          });
        }
      }
    }
  }
  else{
    alert("You lose!")
  }
}

function displayEmptyBoxes(){
  for (let i=0 ;i<=hiddenWord.length -1  ; ++i){
    let divElement = document.createElement('div');

    divElement.classList.add('letter');
    divElement.classList.add(`letter-${hiddenWord[i]}`);
    
    answerDisplayer.appendChild(divElement);
  }
}

function checkInput(){
  userAnswer.addEventListener('input', function(){
    const inputValue = userAnswer.value.trim();

    if (/^[a-zA-Z]$/.test(inputValue)) {
      errorMessage.textContent = '';
      enterButton.disabled = false;
    } else {
      errorMessage.textContent = 'Invalid input. Please enter a single letter.';
      errorMessage.style.color = 'red';
      enterButton.disabled = true;
    }
  }
  );
}
