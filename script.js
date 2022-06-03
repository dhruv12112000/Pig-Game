'use strict';

//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const current1El = document.querySelector('#current--0');
const current2El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;

//Rolling Dice Functionality
diceEl.classList.add('hidden');

//Variables
let currentScore;
let activePlayer;
let score;
let playing;

//Functions
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // current2El.textContent = 0;
  // currentScore += dice - 1;
  // current2El.textContent = currentScore;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Roll Button Functionality

btnRollEl.addEventListener('click', function () {
  if (playing) {
    //Generate Random Dice Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // console.log(dice);

    //Display Dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;

    //Check If 1 then Switch To Other Player
    if (dice !== 1) {
      //Add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current1El.textContent = currentScore; //CHANGE LATER
      // console.log(currentScore);
    } else {
      //Switch To Next Player
      switchPlayer();
    }
  }
});

//Hold Button Functionality

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //if score>=100
    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      switchPlayer();
    } else {
      //Switch Player
      switchPlayer();
    }
  }
});

//New Game Button Functionality

btnNewEl.addEventListener('click', init);
