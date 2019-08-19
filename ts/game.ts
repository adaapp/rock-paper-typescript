alert("Hello, Pluto! Love, TypeScript")
let userScore: number = 0
let computerScore: number = 0
let counter: number = 0

function startGame(): void {
  userScore = 0
  computerScore = 0
  counter = 0
  outputMessage("The game has begun!")
  hideStartButton()
}

function outputMessage(message: string): void {
  alert(message)
}

function hideStartButton(): void {
  let startButton: HTMLButtonElement = document.querySelector(".start-button")
  startButton.style.display = "none"
}