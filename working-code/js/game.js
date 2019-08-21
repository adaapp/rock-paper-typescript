var moves;
(function (moves) {
    moves[moves["Rock"] = 0] = "Rock";
    moves[moves["Paper"] = 1] = "Paper";
    moves[moves["Scissors"] = 2] = "Scissors";
})(moves || (moves = {}));
var RockPaperScissors = /** @class */ (function () {
    function RockPaperScissors() {
        this.userScore = 0;
        this.computerScore = 0;
        this.counter = 0;
        this.imageList = [];
        this.startButton = document.querySelector(".start-button");
        this.gameButtons = document.querySelector(".game-buttons");
        this.output = document.querySelector(".output");
        this.waitTime = 0;
        this.wait = false;
        this.callbackStep = function () { return console.log("no step here yet"); };
        this.botScale = 0;
    }
    RockPaperScissors.prototype.startGame = function () {
        this.userScore = 0;
        this.computerScore = 0;
        this.counter = 0;
        this.clearOutput();
        this.hideStartButton();
    };
    RockPaperScissors.prototype.clearOutput = function () {
        this.output.innerHTML = '';
        // hide hand images on new game
        this.clearHands();
    };
    RockPaperScissors.prototype.clearHands = function () {
        this.rightImage = "";
        this.leftImage = "";
    };
    RockPaperScissors.prototype.outputMessage = function (message) {
        this.output.innerHTML += "<p>" + message + "</p>";
    };
    RockPaperScissors.prototype.hideStartButton = function () {
        this.startButton.style.display = "none";
        this.gameButtons.style.display = "block";
    };
    RockPaperScissors.prototype.showStartButton = function () {
        this.startButton.style.display = "inline-block";
        this.gameButtons.style.display = "none";
    };
    RockPaperScissors.prototype.getComputerMove = function () {
        var move = Math.floor(Math.random() * 3);
        return {
            move: move,
            player: "Computer"
        };
    };
    RockPaperScissors.prototype.handleUserChoice = function (choice) {
        var _this = this;
        var userGuess = {
            move: choice,
            player: "User"
        };
        this.setImageFromChoice(userGuess);
        // remove bot image
        this.rightImage = "";
        // do computer go after some time
        this.callbackStep = function () { return _this.showComputerMove(userGuess); };
        this.waitTime = (Math.random() * 800) + 200;
        this.wait = true;
    };
    RockPaperScissors.prototype.showComputerMove = function (userGuess) {
        var _this = this;
        this.botScale = -100;
        var computerGuess = this.getComputerMove();
        this.setImageFromChoice(computerGuess);
        var winner = this.calculateWinner(userGuess, computerGuess);
        if (winner.player === "User")
            this.userScore++;
        if (winner.player === "Computer")
            this.computerScore++;
        this.outputMessage(winner.player + " wins with " + moves[winner.move]);
        this.checkRoundProgress();
        this.callbackStep = function () {
            _this.clearHands();
        };
        this.waitTime = 2000;
        this.wait = true;
    };
    RockPaperScissors.prototype.checkRoundProgress = function () {
        this.counter++;
        if (this.userScore === 2 || this.computerScore === 2 || this.counter === 3) {
            this.showStartButton();
            this.counter = 0;
            if (this.userScore > this.computerScore)
                this.outputMessage("You won that round! <br><span class='emoji win'>🥳</span>");
            else if (this.userScore === this.computerScore)
                this.outputMessage("You drew that round.<br><span class='emoji'>😐</span>");
            else
                this.outputMessage("You lost that round!<br><span class='emoji'>😢</span>");
        }
    };
    RockPaperScissors.prototype.calculateWinner = function (guessOne, guessTwo) {
        if (guessOne.move == guessTwo.move)
            return { player: "Neither", move: guessOne.move };
        switch (guessOne.move) {
            case moves.Rock:
                if (guessTwo.move === moves.Paper)
                    return guessTwo;
                break;
            case moves.Paper:
                if (guessTwo.move === moves.Scissors)
                    return guessTwo;
                break;
            case moves.Scissors:
                if (guessTwo.move === moves.Rock)
                    return guessTwo;
                break;
            default:
                return guessOne;
        }
        return guessOne;
    };
    RockPaperScissors.prototype.setImageFromChoice = function (choice) {
        if (choice.player === "User") {
            this.leftImage = this.imageList[choice.move];
        }
        else {
            this.rightImage = this.imageList[choice.move];
        }
    };
    RockPaperScissors.prototype.preload = function () {
        this.imageList = [loadImage('./img/rock.png'),
            loadImage('./img/paper.png'),
            loadImage('./img/scissors.png')
        ];
    };
    RockPaperScissors.prototype.draw = function () {
        var bobAmount = Math.sin(millis() / 100) * 3;
        // get dt time and show framerate
        if (!this.time) {
            this.time = millis();
        }
        else {
            this.dt = millis() - this.time;
            this.time = millis();
            // console.log("Framerate: " + Math.floor((this.dt/60)*100))
        }
        // wait and callback function    
        if (this.waitTime > 0) {
            this.waitTime = this.waitTime - this.dt;
            console.log(this.waitTime);
            if (this.waitTime <= 0) {
                // do callback
                console.log("do once");
                this.callbackStep();
                this.wait = false;
            }
        }
        if (this.leftImage) {
            image(this.leftImage, 100, window.innerHeight / 2 - 263 + 100 + bobAmount, 263, 263);
        }
        if (this.rightImage) {
            image(this.rightImage, window.innerWidth - 263 - 100, window.innerHeight / 2 - 263 + 100 + bobAmount, 263 + this.botScale, 263 + this.botScale);
        }
        if (this.botScale < 0) {
            this.botScale += 10;
        }
    };
    return RockPaperScissors;
}());
var game = new RockPaperScissors();
function preload() {
    game.preload();
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}
function draw() {
    background('#FEE834');
    game.draw();
}
//# sourceMappingURL=game.js.map