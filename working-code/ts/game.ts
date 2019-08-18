let userScore: number = 0
let computerScore: number = 0
let counter: number = 0

interface guess {
  move: number, // 0, 1 or 2
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
  outputMessage('The game has begun!')
  hideStartButton()
}

function outputMessage(message: string): void {
  let output: HTMLDivElement = document.querySelector('.output')
  output.innerHTML += `<p>${message}</p>`
}

function hideStartButton(): void {
  let startButton: HTMLButtonElement = document.querySelector(".start-button")
  let gameButtons: HTMLDivElement = document.querySelector(".game-buttons")
  startButton.style.display = "none"
  gameButtons.style.display = "block"
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
  outputMessage(`You chose ${moves[userGuess.move]}`)
  outputMessage(`Computer chose ${moves[computerGuess.move]}`)
  let winner: guess = calculateWinner(userGuess, computerGuess)
  if (winner.player === "User") userScore++
  if (winner.player === "Computer") computerScore++
  outputMessage(`${winner.player} wins with ${winner.move}`)
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