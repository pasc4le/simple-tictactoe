let ticTacToe = new Array(9).fill(0);
let axis = new Array(8).fill(0);
let currentPlayer = 1;
let totalMoves = 0;
let playingGame = true;
const elGrid = document.querySelector(".grid");
const elWrapper = document.querySelector("#wrapper");

const getConfettiElement = () => {
  const confetti = document.createElement("lottie-player");
  confetti.classList.add("confetti");
  confetti.src = "https://assets3.lottiefiles.com/packages/lf20_obhph3sh.json";
  confetti.speed = 1;
  confetti.background = "transparent";
  confetti.autoplay = true;
  confetti.style = "width: 300px; height: 300px;";
  return confetti;
};

const countMove = (index, player) => {
  const row = index % 3;
  const column = Math.floor(index / 3);
  axis[row] += player;
  axis[3 + column] += player;
  if (column == row) axis[6] += player;
  if (column == 2 - row) axis[7] += player;
  console.log(axis);
};

const showWinner = (winner) => {
  const elWinner = document.createElement("p");
  elWinner.classList.add("winner");
  elWinner.innerHTML = "The winner is " + winner.toUpperCase();
  document.querySelector("body").appendChild(getConfettiElement());
  elWrapper.appendChild(elWinner);
  elGrid.classList.add("disabled");
  playingGame = false;
};

const checkWin = () => {
  if (totalMoves < 3) return false;
  for (let i = 0; i < axis.length; i++) {
    if (axis[i] == -3) return showWinner("o");
    else if (axis[i] == 3) return showWinner("x");
  }
  for (let i = 0; i < ticTacToe.length; i++)
    if (ticTacToe[i] != -1 || ticTacToe[i] != 1) return false;
  return showWinner("xo");
};

const playMove = (index) => {
  if (ticTacToe[index] != 0 || !playingGame) return;
  totalMoves++;

  countMove(index, currentPlayer);
  ticTacToe[index] = currentPlayer;
  currentPlayer = currentPlayer == 1 ? -1 : 1;
  updateGrid();
  checkWin();
};

const updateGrid = () => {
  elGrid.innerHTML = "";
  ticTacToe.forEach((value, index) => {
    const box = document.createElement("div");
    box.innerHTML = value == 1 ? "x" : value == -1 ? "o" : "";
    box.onclick = () => playMove(index);
    elGrid.append(box);
  });
};

updateGrid();

