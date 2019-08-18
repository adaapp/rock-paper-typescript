let userScore: number = 0
let computerScore: number = 0
let counter: number = 0
let startButton: HTMLButtonElement = document.querySelector(".start-button")
let gameButtons: HTMLDivElement = document.querySelector(".game-buttons")
let output: HTMLDivElement = document.querySelector(".output")

interface guess {
  move: number // 0, 1 or 2
  player: string // "User" or "Computer"
}

enum moves {
  Rock,
  Paper,
  Scissors
}

function startGame(): void {
  userScore = 0
  computerScore = 0
  counter = 0
  clearOutput()
  outputMessage("The game has begun!")
  hideStartButton()
}

function clearOutput(): void {
  output.innerHTML = ''
}

function outputMessage(message: string): void {
  output.innerHTML += `<p>${message}</p>`
}

function hideStartButton(): void {
  startButton.style.display = "none"
  gameButtons.style.display = "block"
}

function showStartButton(): void {
  startButton.style.display = "inline-block"
  gameButtons.style.display = "none"
}

function getComputerMove(): guess {
  let move = Math.floor(Math.random() * 3)
  return {
    move: move,
    player: "Computer"
  }
}

function handleUserChoice(choice: number): void {
  let userGuess: guess = {
    move: choice,
    player: "User"
  }
  let computerGuess: guess = getComputerMove()
  let winner: guess = calculateWinner(userGuess, computerGuess)
  if (winner.player === "User") userScore++
  if (winner.player === "Computer") computerScore++
  outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
  checkRoundProgress()
}

function checkRoundProgress(): void {
  counter++
  if (userScore === 2 || computerScore === 2 || counter === 3) {
    showStartButton()
    
    counter = 0
    if (userScore > computerScore) outputMessage("You won that round!")
    else if (userScore === computerScore) outputMessage("You drew that round")
    else outputMessage("You lost that round!")
  }
}

function calculateWinner(guessOne: guess, guessTwo: guess): guess {
  if (guessOne.move == guessTwo.move)
    return { player: "Neither", move: guessOne.move }

  switch (guessOne.move) {
    case moves.Rock:
      if (guessTwo.move === moves.Paper) return guessTwo
      break
    case moves.Paper:
      if (guessTwo.move === moves.Scissors) return guessTwo
      break
    case moves.Scissors:
      if (guessTwo.move === moves.Rock) return guessTwo
      break
    default:
      return guessOne
  }
  return guessOne
}
let computerGuess: guess = getComputerMove()
console.log(computerGuess)
