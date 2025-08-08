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
    gameOverBoard.classList.add('hidden');
    startGame();
});

// document.getElementById("file").addEventListener("change", (event) => {
//     const errorText = document.getElementById("error");
//     const img = document.getElementById("preview");
//     const textElement = document.getElementById("text");


//     img.src = "";
//     errorText.textContent = "";
//     textElement.textContent = "";

//     const file = event.target.files[0];
//     const maxSize = 1024 * 1024 * 2;
//     const imageTypes = ["image/jpeg", "image/png"];

//     if (!file) return;

//     if (file.size > maxSize) {
//         errorText.textContent = "The file is too big";
//         return;
//     }
    
//     if (!imageTypes.includes(file.type)) {
//         alert("Please upload a JPG or PNG image");
//         return;
//     }
    
//     const reader = new FileReader();
//     reader.onload = (e) => {
//         img.src = e.target.result;
//     };

//     reader.readAsDataURL(file);
// });

// document.getElementById("file_input").addEventListener("change", (event) => {
//     const textElement = document.getElementById("text");
//     const img = document.getElementById("preview");
//     const errorText = document.getElementById("error");


//     textElement.textContent = "";
//     img.src = "";
//     errorText.textContent = "";

//     const file = event.target.files[0];
//     if (!file) {
//         alert("Please upload a text file");
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         textElement.textContent = e.target.result;
//     };

//     reader.readAsText(file);
// });




