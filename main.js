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
//     const errorText = document.getElementById("error")
//     const img = document.getElementById("preview");
    
//     img.src = "";
//     errorText.textContent = "";

//     const file = event.target.files[0]
//     const maxSize = 1024 * 1024 * 2
//     const imageTypes = ["image/jpg", "image/png", "image/pdf"]
    
//     console.log("type", file.type);
//     console.log("size", file.size);

//     if (file.size > maxSize) {
//         errorText.textContent = "The file is too big";
//         return;
//     }
    
//     if (!imageTypes.includes(file.type)) {
        
//         alert("Upload picture");
//         return;
//     }
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
        
        
//         img.src = event.target.result;

//     };

//     reader.readAsDataURL(event.target.files[0]);

// });

// document.getElementById("file_input").addEventListener("change", (event) => {
//   const file = event.target.files[0]

//     if (!file) {
//     alert("Upload picture");
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const text = document.getElementById("text");

//     text.textContent = event.target.result;
//   };

//   reader.readAsText(event.target.files[0]);
// });


