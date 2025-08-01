let score = 0;
let currentMole = null;

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('.score');

for (let i = 0; i < holes.length; i++) {
    const mole = document.createElement('div');
    mole.style.display = 'none';
    mole.className = 'mole';
    mole.id = i;

    mole.addEventListener('click', () => {
        mole.style.backgroundImage = 'url("./images_dead.png")';
        score = score + 1;

        scoreDisplay.textContent = score;

        setTimeout(() => {
            mole.style.display = 'none';
            currentMole = null;

            showRandomMole();
            mole.style.backgroundImage = 'url("./images/mole.png")'
        }, 500);
    });

    holes[i].appendChild(mole);
}

function showRandomMole() {
    if(currentMole === null) {
        const moleIndex = Math.floor(Math.random() * 9);
        currentMole = moleIndex
        const moles = document.querySelectorAll('.mole');
        moles(moleIndex).style.display = 'block';
    }
}

showRandomMole();
