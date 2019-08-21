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
  startButton: HTMLButtonElement
  gameButtons: HTMLDivElement
  output: HTMLDivElement
  imageList: any[]
  leftImage: string
  rightImage: string

  // time variables
  dt: number
  time: number
  waitTime: number
  wait: boolean

  callbackStep: any

  // ajustments
  botScale: number

  constructor() {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.imageList = []
    this.startButton = document.querySelector(".start-button")
    this.gameButtons = document.querySelector(".game-buttons")
    this.output = document.querySelector(".output")

    this.waitTime = 0
    this.wait = false
    this.callbackStep = () => console.log("no step here yet")

    this.botScale = 0;
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
    
    // hide hand images on new game
    this.clearHands()
  }
  clearHands(): void{
    this.rightImage = ""
    this.leftImage = ""
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
    this.setImageFromChoice(userGuess)
    
    // remove bot image
    this.rightImage = ""
    
    // do computer go after some time
    this.callbackStep = () => this.showComputerMove(userGuess)

    this.waitTime = (Math.random() * 800 ) + 200
    this.wait = true
  }
  showComputerMove(userGuess: guess): void{

    this.botScale = -100;

    let computerGuess: guess = this.getComputerMove()
    this.setImageFromChoice(computerGuess)
    let winner: guess = this.calculateWinner(userGuess, computerGuess)
    if (winner.player === "User") this.userScore++
    if (winner.player === "Computer") this.computerScore++
    this.outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
    this.checkRoundProgress()

    this.callbackStep = () => {
      this.clearHands()
    }
    this.waitTime = 2000
    this.wait = true
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
    this.imageList = [  loadImage('./img/rock.png'), 
                        loadImage('./img/paper.png'), 
                        loadImage('./img/scissors.png')
                      ]
  }
  draw(): void {

    var bobAmount = Math.sin(millis() / 100) * 3

    // get dt time and show framerate
    if(!this.time){
      this.time = millis()
    }else{
      this.dt =  millis() - this.time
      this.time = millis()

      // console.log("Framerate: " + Math.floor((this.dt/60)*100))
    }

    // wait and callback function    
    if(this.waitTime > 0){

      this.waitTime = this.waitTime - this.dt
      console.log(this.waitTime)
      
      if(this.waitTime <= 0){

        // do callback
        console.log("do once")
        this.callbackStep()

        this.wait = false
      }
    }
    
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
        263 + this.botScale,
        263 + this.botScale
      )
    }
    if(this.botScale < 0){
      this.botScale += 10
    }
  }
}

const game = new RockPaperScissors()
