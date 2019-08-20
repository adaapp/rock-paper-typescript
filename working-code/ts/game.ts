interface guess {
  move: number // 0, 1 or 2
  player: string // "User" or "Computer"
}

enum moves {
  Rock,
  Paper,
  Scissors
}

class RockPaperScissors {
  userScore: number
  computerScore: number
  counter: number
  startButton: HTMLButtonElement
  gameButtons: HTMLDivElement
  output: HTMLDivElement
  constructor() {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.startButton = document.querySelector(".start-button")
    this.gameButtons = document.querySelector(".game-buttons")
    this.output = document.querySelector(".output")
  }
  startGame(): void {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.clearOutput()
    this.hideStartButton()
  }
  clearOutput(): void {
    this.output.innerHTML = ''
  }
  outputMessage(message: string): void {
    this.output.innerHTML += `<p>${message}</p>`
  }
  hideStartButton(): void {
    this.startButton.style.display = "none"
    this.gameButtons.style.display = "block"
  }
  showStartButton(): void {
    this.startButton.style.display = "inline-block"
    this.gameButtons.style.display = "none"
  }
  getComputerMove(): guess {
    let move = Math.floor(Math.random() * 3)
    return {
      move: move,
      player: "Computer"
    }
  }
  handleUserChoice(choice: number): void {
    let userGuess: guess = {
      move: choice,
      player: "User"
    }
    let computerGuess: guess = this.getComputerMove()
    let winner: guess = this.calculateWinner(userGuess, computerGuess)
    if (winner.player === "User") this.userScore++
    if (winner.player === "Computer") this.computerScore++
    this.outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
    this.checkRoundProgress()
  }
  checkRoundProgress(): void {
    this.counter++
    if (this.userScore === 2 || this.computerScore === 2 || this.counter === 3) {
      this.showStartButton()
      
      this.counter = 0
      if (this.userScore > this.computerScore) this.outputMessage("You won that round!")
      else if (this.userScore === this.computerScore) this.outputMessage("You drew that round")
      else this.outputMessage("You lost that round!")
    }
  }
  calculateWinner(guessOne: guess, guessTwo: guess): guess {
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
}

const game = new RockPaperScissors()
