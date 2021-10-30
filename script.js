'use strict';

const diceBtn = document.querySelector(`.btn--roll`);
const newBtn = document.querySelector(`.btn--new`);
const holdBtn = document.querySelector(`.btn--hold`);
const getBtn = document.querySelector(`.btn--get`);
const scr = document.querySelector(`.window`);

const dice = document.querySelector(`.dice`);

let diceNumber, playing, score, currentScore, activePlayer;

const init = function () {
    dice.classList.add('hidden');
    playing = true;
    score = [0, 0];
    getBtn.classList.add('hidden');
    for (let i = 0; i < score.length; i++) {
        score[i] = 0;
        document.getElementById(`score--${i}`).textContent = 0;
        document.getElementById(`current--${i}`).textContent = 0;
        document.querySelector(`.player--${i}`).classList.remove('player--winner');
    }
    currentScore = 0;
    activePlayer === 1 && togglePlayers();
    activePlayer = 0;
}
init();

diceBtn.addEventListener('click', () => {
    if (playing) {
        diceNumber = generatingNumber();
        dice.classList.remove('hidden');
        dice.src = `./images/dice-${diceNumber}.png`;
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', () => {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        if (score[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            playing = false;
            dice.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

newBtn.addEventListener('click', init);

// To toggle (means opposite reaction eg: (added ? remove: adding)) the classNames
function togglePlayers() {
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
}

// To switch the players
function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    togglePlayers();
}

// To Generate Random Number
function generatingNumber() {
    return Math.trunc(Math.random() * 6) + 1;
}

var wid = window.matchMedia("(max-width: 452px)")

function myFunction(wid) {
    if (wid.matches) {
        scr.classList.add('hidden');
        getBtn.classList.remove('hidden');
    } else {
        scr.classList.remove('hidden');
        getBtn.classList.add('hidden');
    }
}

myFunction(wid) // Call listener function at run time
wid.addListener(myFunction)