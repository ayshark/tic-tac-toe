let isGameActive = "yes";
let player = "X";
let winner = "";
const gameStatus = document.getElementById('status');

const o1 = {name: 'hello', age: 12};
const o2 = {name: 'hello', age: 12};
console.log(o1 === o2);

let gameState = ["","","","","","","","",""];

const winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

const turn = () => `${player}'s turn `;
const result = () => `${winner} won`;
const draw = () => `it's a draw`;

function clicked(nu) {
    // document.querySelector("[data-cell-number = '4']").innerHTML = 'X';
    const isCellClicked = nu.getAttribute('data-isClicked');
    if (isCellClicked == 'no' && isGameActive == 'yes') {
        nu.innerHTML = player;
        nu.setAttribute('data-isClicked', 'yes');
        let cellNumber = nu.getAttribute('data-cell-number');
        updateGameState(cellNumber, player);
        if (isGameWon()) {
            declareWinner(player);
        } else {
            if (player == "X") {
                player = "O";
            } else {
                player = "X";
            }
            gameStatus.innerHTML = turn();
        }
    }
    if (!gameState.includes("")) {
        declareDraw();
    }
}

function reset() {
    isGameActive = 'yes';
    const list = document.querySelectorAll(".cell");
    for (let i = 0; i < list.length; i++) {
        list[i].innerHTML = '';
        list[i].setAttribute('data-isClicked', 'no');
    }
    player = "X";
    // document.getElementById('reset').innerHTML = "Restart";
    document.getElementById('status').innerHTML = `Let ${player} begin`;
}

function updateGameState(cellNumber, player) {
    gameState[cellNumber] = player;
    console.log(gameState);
}

function isGameWon() {
    console.log("in isgameown");
    for (let i = 0; i < winningConditions.length; i++) {
        let a = gameState[winningConditions[i][0]];
        let b = gameState[winningConditions[i][1]];
        let c = gameState[winningConditions[i][2]];
        if (a == '' || b == '' || c == '') continue;
        if (gameState[winningConditions[i][0]] == gameState[winningConditions[i][1]] && gameState[winningConditions[i][1]] == gameState[winningConditions[i][2]]) {
            return true;
        }
    }
    return false;
}

function declareWinner(player) {
    winner = player;
    result();
    gameStatus.innerHTML = result();
    isGameActive = "no";
    gameState = ["","","","","","","","",""];
}

function declareDraw() {
    gameStatus.innerHTML = draw();
    isGameActive = "no";
    gameState = ["","","","","","","","",""];
}

