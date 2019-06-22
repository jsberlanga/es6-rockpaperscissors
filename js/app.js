const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");

const scoreBoard = {
  player: 0,
  computer: 0
};

function play(e) {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  scoreBoard[winner]++;

  showWinner(winner, computerChoice);
}

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3 + 1);
  return random > 1 ? (random > 2 ? "scissors" : "paper") : "rock";
}

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";

  if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  }

  if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      return "computer";
    } else {
      return "player";
    }
  }

  if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  modal.style.display = "inline-block";

  result.innerHTML = `
      <h1 class="text--win" >${
        winner !== "draw"
          ? winner === "computer"
            ? "The computer wins"
            : "You win!"
          : `There was a draw!`
      }</h1>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1, computerChoice.length)}</strong></p>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    `;

  score.innerHTML = `<p>Player: ${scoreBoard.player}</p>
  <p>Computer: ${scoreBoard.computer}</p>`;

  // return setTimeout(() => {
  //   modal.style.display = "none";
  // }, 1000);
}

choices.forEach(choice => {
  choice.addEventListener("click", play);
});

function clearModal(e) {
  console.log(e.target);
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

function restartGame() {
  scoreBoard.player = 0;
  scoreBoard.computer = 0;

  score.innerHTML = `
  <p>Player: ${scoreBoard.player}</p>
  <p>Computer: ${scoreBoard.computer}</p>
  `;
}

window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
