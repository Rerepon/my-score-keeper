const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    nameInput: document.querySelector('#p1Name'),
    buttonLabel: document.querySelector('#p1ButtonLabel')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    nameInput: document.querySelector('#p2Name'),
    buttonLabel: document.querySelector('#p2ButtonLabel')
}

const resetButton = document.querySelector('#reset');
const resetNamesButton = document.querySelector('#resetNames');
const winningScoreSelect = document.querySelector('#winningScore');
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (player.score >= winningScore && (player.score - opponent.score) >= 2) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            alert(`${player.nameInput.value || 'プレイヤー'}が勝ちました!`);
        } else if (player.score === winningScore - 1 && opponent.score === winningScore - 1) {
            alert('デュースです！');
        }
    }
}

p1.button.addEventListener('click', function() {
    updateScores(p1, p2);
});
p2.button.addEventListener('click', function() {
    updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);
resetNamesButton.addEventListener('click', resetNames);

p1.nameInput.addEventListener('input', function() {
    p1.buttonLabel.textContent = this.value || 'プレイヤー1';
});

p2.nameInput.addEventListener('input', function() {
    p2.buttonLabel.textContent = this.value || 'プレイヤー2';
});

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

function resetNames() {
    for (let p of [p1, p2]) {
        p.nameInput.value = '';
        p.buttonLabel.textContent = `プレイヤー${p === p1 ? '1' : '2'}`;
    }
}