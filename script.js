let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

function play(cell) {
    if (cell.innerText !== "" || !gameActive) return;

    cell.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    let cells = document.querySelectorAll(".cell");

    let combinations = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of combinations) {
        let [a,b,c] = combo;

        if (cells[a].innerText &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {

            let winner = cells[a].innerText;

            document.getElementById("status").innerText =
                "Player " + winner + " Wins!";

            if (winner === "X") {
                scoreX++;
                document.getElementById("scoreX").innerText = scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").innerText = scoreO;
            }

            gameActive = false;
            return;
        }
    }

    // Draw detection
    let filled = [...cells].every(cell => cell.innerText !== "");
    if (filled && gameActive) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
    }
}

function resetGame() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.innerText = "");

    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").innerText = "";
}