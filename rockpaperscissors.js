let rockChoice = document.querySelector("#rock");
let paperChoice = document.querySelector("#paper");
let scissorsChoice = document.querySelector("#scissors");
let outputBox = document.querySelector("#output");
let winnerBox = document.querySelector("#winner");
let userScoreElement = document.querySelector("#humanScore");
let compScoreElement = document.querySelector("#computerScore");
function getComputerChoice() {
  let computerChoices = ["Rock", "Paper", "Scissors"]; // possible choices
  let compRandom = Math.floor(Math.random() * 3); // random location for compChoices array
  let finalChoice = computerChoices[compRandom]; // set the random number array, selects comp option
  return finalChoice.toLowerCase();
}

scissorsChoice.addEventListener("click", function (event) {
  let userChoice = "scissors";
  let computerChoice = getComputerChoice();
  playRound(computerChoice, userChoice);
});

paperChoice.addEventListener("click", function (event) {
  let userChoice = "paper";
  let computerChoice = getComputerChoice();
  playRound(computerChoice, userChoice);
});

rockChoice.addEventListener("click", function (event) {
  let userChoice = "rock";
  let computerChoice = getComputerChoice();
  playRound(computerChoice, userChoice);
});

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let computerChoices = ["Rock", "Paper", "Scissors"]; // possible choices
  let compRandom = Math.floor(Math.random() * 3); // random location for compChoices array
  let finalChoice = computerChoices[compRandom]; // set the random number array, selects comp option
  return finalChoice.toLowerCase();
}

function playRound(computerFinalPick, userFinalPick) {
  outputBox.textContent = `The computer chose ${computerFinalPick}`;
  if (computerFinalPick === userFinalPick) {
    winnerBox.textContent = "It's a draw!!";
    humanScore++;
    computerScore++;
  } else if (computerFinalPick === "paper" && userFinalPick === "rock") {
    winnerBox.textContent = `Computer wins paper beats rock!`;
    computerScore++;
  } else if (computerFinalPick === "scissors" && userFinalPick === "paper") {
    winnerBox.textContent = "Computer wins scissors beats paper!";
    computerScore++;
  } else if (computerFinalPick === "rock" && userFinalPick === "scissors") {
    winnerBox.textContent = "Computer wins rock beats scissors!";
    computerScore++;
  } else if (userFinalPick === "paper" && computerFinalPick === "rock") {
    winnerBox.textContent = "User wins paper beats rock!";
    humanScore++;
  } else if (userFinalPick === "scissors" && computerFinalPick === "paper") {
    winnerBox.textContent = "User wins scissors beats paper!";
    humanScore++;
  } else if (userFinalPick === "rock" && computerFinalPick === "scissors") {
    winnerBox.textContent = "User wins rock beats scissors!";
    humanScore++;
  }
  userScoreElement.textContent = humanScore;
  compScoreElement.textContent = computerScore;
  if (humanScore === 5) {
    winnerBox.textContent = "HUMAN WINS!!!!";
    humanScore = 0;
    computerScore = 0;
    userScoreElement.textContent = humanScore;
    compScoreElement.textContent = computerScore;
  } else if (computerScore === 5) {
    winnerBox.textContent = "COMPUTER WINS!!!!";
    humanScore = 0;
    computerScore = 0;
    userScoreElement.textContent = humanScore;
    compScoreElement.textContent = computerScore;
  }
}
