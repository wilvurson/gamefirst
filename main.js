let score = 0;
let currentMole = null;
let gameRunning = false;
let timeLeft = 10;
let moleInterval = null;
let countdownInterval = null;

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('.score_num');
const startButton = document.querySelector('.start_box');
const timerBar = document.querySelector('.timer_bar');
const timerStart = document.querySelector('.time_box .number:first-child');
const restartButton = document.querySelector('.restart_button')
const moles = [];

holes.forEach((hole, i) => {
    const mole = document.createElement('div');
    mole.className = 'mole';
    mole.style.display = 'none';
    mole.id = i;
    hole.appendChild(mole);
    moles.push(mole);

    mole.addEventListener('click', () => {
        if (!gameRunning || parseInt(mole.id) !== currentMole) return;

        mole.style.backgroundImage = 'url("./images/mole_dead.png")';
        score++;
        scoreDisplay.textContent = score;

        setTimeout(() => {
            mole.style.display = 'none';
            currentMole = null;
            showRandomMole();
        }, 500);
    });
});

function showRandomMole() {
    if (!gameRunning || currentMole !== null) return;

    const index = Math.floor(Math.random() * moles.length);
    const mole = moles[index];
    currentMole = index;

    mole.style.backgroundImage = 'url("./images/mole.png")';
    mole.style.display = 'block';
}

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timerStart.textContent = timeLeft;
    timerBar.style.width = '0%';


    moleInterval = setInterval(showRandomMole, 800);


    countdownInterval = setInterval(() => {
        timeLeft--;
        timerStart.textContent = timeLeft;
        timerBar.style.width = `${((10 - timeLeft) / 10) * 100}%`;

        if (timeLeft <= 0) {
            stopGame();
        }
    }, 1000);
}

function stopGame() {
    clearInterval(moleInterval);
    clearInterval(countdownInterval);
    moles.forEach(mole => mole.style.display = 'none');
    currentMole = null;
    gameRunning = false;
    timerBar.style.width = '100%';
    timerStart.textContent = 0;
    finalScore.textContent = score;
    gameOverBoard.classList.remove('hidden');
}

startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', () => {
    game_over_board.classList.add('hidden');
    startGame();
});
