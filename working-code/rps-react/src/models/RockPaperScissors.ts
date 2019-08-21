// Define types for P5 built-in functions
declare function loadImage(imgPath: string): void
declare function image(imgPath: string, xPos: number, yPos: number, width: number, height: number): void;
declare function millis(): number;

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
  imageList: any[]
  leftImage: string
  rightImage: string
  constructor() {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.imageList = []
    this.leftImage = ''
    this.rightImage = ''
  }
  startGame(): void {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.clearOutput()
    this.hideStartButton()
  }
  clearOutput(): void {
     
  }
  outputMessage(message: string): void {
     
  }
  hideStartButton(): void {
 
  }
  showStartButton(): void {
 
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
    this.setImageFromChoice(userGuess)
    let computerGuess: guess = this.getComputerMove()
    this.setImageFromChoice(computerGuess)
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
  setImageFromChoice(choice: guess): void {
    if (choice.player === "User") {
      this.leftImage = this.imageList[choice.move]
    } else {
      this.rightImage = this.imageList[choice.move]
    }
  }
  preload(): void {
    this.imageList = [loadImage('./img/rock.png'), loadImage('./img/paper.png'), loadImage('./img/scissors.png')]
  }
  draw(): void {
    var bobAmount = Math.sin(millis() / 60) * 3
    console.log(this.leftImage)
    if (this.leftImage) {
      image(
        this.leftImage,
        100,
        window.innerHeight / 2 - 263 + 100 + bobAmount,
        263,
        263
      )
    }

    if (this.rightImage) {
      image(
        this.rightImage,
        window.innerWidth - 263 - 100,
        window.innerHeight / 2 - 263 + 100 + bobAmount,
        263,
        263
      )
    }
  }
}

export default RockPaperScissors
