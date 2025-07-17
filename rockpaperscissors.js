let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let computerChoices = ["Rock", "Paper", "Scissors"]; // possible choices
  let compRandom = Math.floor(Math.random() * 3); // random location for compChoices array
  let finalChoice = computerChoices[compRandom]; // set the random number array, selects comp option
  return finalChoice.toLowerCase();
}

function getHumanChoice() {
  let userAnswer = prompt(
    `Please select from the following options:\n "rock", "paper", "scissors"`
  );
  return userAnswer.toLowerCase();
}

function playRound(computerFinalPick, userFinalPick) {
  console.log(`The computer chose ${computerFinalPick}`);
  if (computerFinalPick === userFinalPick) {
    console.log("It's a draw!!");
    humanScore++;
    computerScore++;
  } else if (computerFinalPick === "paper" && userFinalPick === "rock") {
    console.log("Computer wins paper beats rock!");
    computerScore++;
  } else if (computerFinalPick === "scissors" && userFinalPick === "paper") {
    console.log("Computer wins scissors beats paper");
    computerScore++;
  } else if (computerFinalPick === "rock" && userFinalPick === "scissors") {
    console.log("Computer wins rock beats scissors");
    computerScore++;
  } else if (userFinalPick === "paper" && computerFinalPick === "rock") {
    console.log("User wins paper beats rock!");
    humanScore++;
  } else if (userFinalPick === "scissors" && computerFinalPick === "paper") {
    console.log("User wins scissors beats paper");
    humanScore++;
  } else if (userFinalPick === "rock" && computerFinalPick === "scissors") {
    console.log("User wins rock beats scissors");
    humanScore++;
  }
}

for (let i = 0; i < 5; i++) {
  let computerPick = getComputerChoice();
  let userPick = getHumanChoice();
  playRound(computerPick, userPick);
  console.log(
    "Human Score: " + humanScore + "\n" + "Computer Score: " + computerScore
  );
}

if (humanScore > computerScore) {
  console.log("The human won :o");
} else if (computerScore > humanScore) {
  console.log("The computer wins! :o");
} else {
  console.log("The game is a draw!!");
}
