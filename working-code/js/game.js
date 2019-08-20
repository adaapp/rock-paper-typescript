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
        this.startButton = document.querySelector(".start-button");
        this.gameButtons = document.querySelector(".game-buttons");
        this.output = document.querySelector(".output");
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
        var userGuess = {
            move: choice,
            player: "User"
        };
        var computerGuess = this.getComputerMove();
        var winner = this.calculateWinner(userGuess, computerGuess);
        if (winner.player === "User")
            this.userScore++;
        if (winner.player === "Computer")
            this.computerScore++;
        this.outputMessage(winner.player + " wins with " + moves[winner.move]);
        this.checkRoundProgress();
    };
    RockPaperScissors.prototype.checkRoundProgress = function () {
        this.counter++;
        if (this.userScore === 2 || this.computerScore === 2 || this.counter === 3) {
            this.showStartButton();
            this.counter = 0;
            if (this.userScore > this.computerScore)
                this.outputMessage("You won that round!");
            else if (this.userScore === this.computerScore)
                this.outputMessage("You drew that round");
            else
                this.outputMessage("You lost that round!");
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
    return RockPaperScissors;
}());
var game = new RockPaperScissors();
//# sourceMappingURL=game.js.map