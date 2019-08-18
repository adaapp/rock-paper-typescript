var userScore = 0;
var computerScore = 0;
var counter = 0;
var moves;
(function (moves) {
    moves[moves["Rock"] = 0] = "Rock";
    moves[moves["Paper"] = 1] = "Paper";
    moves[moves["Scissors"] = 2] = "Scissors";
})(moves || (moves = {}));
function startGame() {
    userScore = 0;
    computerScore = 0;
    counter = 0;
    outputMessage('The game has begun!');
    hideStartButton();
}
function outputMessage(message) {
    var output = document.querySelector('.output');
    output.innerHTML += "<p>" + message + "</p>";
}
function hideStartButton() {
    var startButton = document.querySelector(".start-button");
    var gameButtons = document.querySelector(".game-buttons");
    startButton.style.display = "none";
    gameButtons.style.display = "block";
}
function getComputerMove() {
    var move = Math.floor(Math.random() * 3);
    return {
        move: move,
        player: "Computer"
    };
}
function handleUserChoice(choice) {
    var userGuess = {
        move: choice,
        player: "User"
    };
    var computerGuess = getComputerMove();
    outputMessage("You chose " + moves[userGuess.move]);
    outputMessage("Computer chose " + moves[computerGuess.move]);
    var winner = calculateWinner(userGuess, computerGuess);
    if (winner.player === "User")
        userScore++;
    if (winner.player === "Computer")
        computerScore++;
    outputMessage(winner.player + " wins with " + winner.move);
}
function calculateWinner(guessOne, guessTwo) {
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
}
var computerGuess = getComputerMove();
console.log(computerGuess);
//# sourceMappingURL=game.js.map