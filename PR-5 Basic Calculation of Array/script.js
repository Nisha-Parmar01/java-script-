let cells = document.querySelectorAll(".cell");
let msg = document.getElementById("msg");
let turn = "X";
let gameOver = false;

let win = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = function () {

    if (cells[i].innerText == "" && gameOver == false) {
      cells[i].innerText = turn;

      if (checkWin(turn)) {
        msg.innerText = "🎉 Player " + turn + " Wins!";
        gameOver = true;
      }
      else if (checkDraw()) {
        msg.innerText = "🤝 Draw!";
        gameOver = true;
      }
      else {
        turn = (turn == "X") ? "O" : "X";
        msg.innerText = "Player " + turn + " Turn";
      }
    }
  };
}

function checkWin(player) {
  for (let i = 0; i < win.length; i++) {
    let count = 0;

    for (let j = 0; j < 3; j++) {
      if (cells[win[i][j]].innerText == player) {
        count++;
      }
    }

    if (count == 3) {
      for (let j = 0; j < 3; j++) {
        cells[win[i][j]].classList.add("winner");
      }
      return true;
    }
  }
  return false;
}


function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerText == "") {
      return false;
    }
  }
  return true;
}

function resetGame() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("winner");
  }
  turn = "X";
  gameOver = false;
  msg.innerText = "Player X Turn";
}
