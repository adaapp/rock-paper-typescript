# Rock, Paper, TypeScript

Over the course of this workshop you'll build a browser-based version of the classic game, Rock, Paper, Scissors.

By doing this we'll recap our knowledge of JavaScript and learn TypeScript too. Never forget that TypeScript is just JavaScript with types.

Every section of the workshop has its own branch where you'll be able to see working code.

This is what we're building:

![Screnshot of Rock, Paper, Scissors game](./img/game-screenshot.png)

## Initial setup

### 1. Clone down this repository:

In a git-enabled terminal window (Git Bash on Windows) run the following command to get your own copy of this workshop:

`git clone [REPO URL] ada-typescript-workshop`

This will create a folder on your computer called `ada-typescript-workshop` – feel free to call it something different.

`cd ada-typescript-workshop`

If you have your editor configured correctly, you can now open this directory in your default code editor:

`code .`

Otherwise, open Visual Studio Code on your computer and choose `Open folder` and navigate to `ada-typescript-workshop` and select it.

The only things in the default branch are the following:

- `img` -> directory containing a screenshot of the game and the three images we'll need
- `README.md` -> this document
- `.gitignore` -> a list of files for git to ignore

**You will be coding along in the root of the project**

### 2. Get the game running in the browser

Before we start writing any TypeScript, let's create the HTML file that's going to contain our buttons and the link to our JavaScript file. Create a file called `index.html` next to this `README.md` file.

In Visual Studio Code, once you've opened your `index.html` file you can use a shortcut to get a basic HTML skeleton. Simply type:

```html
html
```

and press the `tab` key, choosing the `html:5` option from the drop-down. This should give you the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

Change the title to Rock, Paper, Scissors and add a button element inside the body tags:

```html
<body>
  <button>Start Game</button>
</body>
```

Open this HTML file in your default browser and you should see the button.

While we're at it, let's set some default styles. If you do a colour picker of the yellow in the images of the hands, you get `#FEE834`. We'll do these as "inline styles", rather than have an external stylesheet, so the game loads as quickly as possible:

```html
  <title>Rock, Paper, Scissors</title>
  <style>
    body {
      margin: 0;
      background: #FEE834;
      text-align: center;
    }

    button {
      font-size: 1.2rem;
      border: 0.25rem solid black;
      padding: 0.5rem;
      margin: 1rem 0.5rem;
    }
  </style>
</head>
```

If you're interested in learning more about front-end web technologies, be sure to sign up to the Creative Pathway. In the meantime, have a read about relative sizing in CSS using [rems and ems](https://zellwk.com/blog/rem-vs-em/).

#### Let's do some TypeScript already

TypeScript compiles into JavaScript – so we'll start by making sure we can get JavaScript working:

Create a new file called `game.js` with contents `alert("Hello, world!")` in a folder called `js`. From your terminal:

`$ mkdir js`

`$ echo 'alert("Hello, world!")' > js/game.js`

Tell the browser to read and run this code:

```html
</body>
<script src="js/game.js"></script>
</html>
```

Refresh your game in the browser now and you'll see the popup. If you don't, make sure a `js` directory exists with the `game.js` file inside it. Watch out for `<script scr="` instead of `<script src="`!

### 2. Introducing TypeScript

Make sure it's installed on your computer:

`$ npm install -g typescript`

From the root of your project, make a folder called `ts` and add a file with contents `alert("Hello, world! Love, TypeScript")` called `game.ts`:

`$ mkdir ts`

`$ echo 'alert("Hello, world! Love, TypeScript")' > ts/game.ts`

Let's get a bit of the game built as well; for our game to work, we're going to need a few variables:

RPS is generally played as best of three. We'll need a `counter` to keep track, and a `userScore` and `computerScore`. These will all be numbers:

```typescript
alert("Hello, world! Love, TypeScript")
let userScore: number = 0
let computerScore: number = 0
let counter: number = 0
```

Note how the syntax is identical to JavaScript's, we just specify the type of the variable after the variable's name declaration, and before we assign its value.

Let's compile TypeScript for the first time. If this is the first time you've done this and you've just run the `npm install -g typescript` command, you many need to quit your terminal and open a new one:

`$ tsc ts/game.ts`

It'll take a short moment but afterwards you'll find a file called `game.js` sitting next to the `game.ts` file. Have a look at its contents – pretty underwhelming, right?

Note that we're not using semi-colons at the end of each line in our TypeScript file, and that the compiled JS uses `var` instead of `let`. This ensures we'll support older browsers which is great for accessibility.

Manually running the `tsc` command each time is a pain. We also want the game.js file to end up in the `js/` directory that we linked to our HTML file. Step forward, `tsconfig.json`.

__Delete the `game.js` file from the `ts` directory.__

#### tsconfig.json

[Go to the docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and scroll down to the second example. It looks like this at time of writing:

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

We're going paste this into a file called `tsconfig.json` in the root of our project (i.e. next to this README.md file and the index.html file). Do this now please.

We need to tweak it a bit. Let's update the paths to work for us:

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "outFile": "./js/game.js",
    "sourceMap": true,
    "watch": true
  },
  "include": ["ts/**/*"],
  "exclude": ["img", "js"]
}
```

This file will read any `.ts` files inside a folder called `ts`. It won't remove comments which means people reading your source code will be able to learn from you (if you haven't already, [read this powerful case from Rachel Andrews on making our projects "learnable"](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/)). It won't look for typescript files in our `img` or `js` directories. And it'll enable source maps – these help browser-based dev tools help you debug, by showing you the line-numbers in your TypeScript files when you have errors in your compiled JavaScript files.

Best of all, thanks to `"watch": true` it will run in the background so we don't have to keep manually running the compiler.

Check it's all working by running the following from the root of the project:

`$ tsc`

This should open a tsc watch process in your terminal (that you can quite with `ctrl c`). Look inside `js/game.js` – since we specified this as the output directory in `tsconfig.json`, the compiler has compiled the contents of `ts/game.ts` into here. If you refresh your game now you should see the alert from TypeScript.

That's the end of the first session.

[View completed branch: 1-ts-setup-end](https://github.com/adaapp/rock-paper-typescript/tree/1-ts-setup-end)

## Creating our basic game engine

We need to:

1. wire up the button in the HTML to a function in our code that starts the game
2. write a function that randomly chooses one of rock, paper or scissors
3. create new buttons that let the user choose
4. write a function that works out who wins

### 1. Wiring up our button

Create a function called startGame inside `game.ts`. It shouldn't return anything and should reset the scores and counter to zero:

```typescript
function startGame(): void {
  userScore = 0
  computerScore = 0
  counter = 0
  outputMessage("The game has begun!")
  hideStartButton()
}
```

Let's also create a function for showing messages. For now, this can just alert things out, but later on we can make it add a paragraph to the page.

```typescript
function outputMessage(message: string): void {
  alert(message)
}
```

We will be showing or hiding the start button based on the state of our game, so let's give it a class with which we can target it from CSS and JavaScript. We also add an `onclick` attribute and call our new function.

```html
<button class="start-button" onclick="startGame()">Start Game</button>
```

Finally, let's hide the button by defining the `hideStartButton` function:

```typescript
function hideStartButton(): void {
  let startButton: HTMLButtonElement = document.querySelector(".start-button")
  startButton.style.display = "none"
}
```

Notice the `HTMLButtonElement` type here – HTML elements all have their own types.

### 2. Teaching the computer to play (also, interfaces)

We want a function that returns a guess. This will look something like this:

```js
function getComputerMove() {
  let move = Math.floor(Math.random() * 3)
  return {
    move: move,
    user: "Computer"
  }
}
```

That object being returned, we can define an interface for that shape and use this new interface as the type defintion for our function:

```typescript
interface guess {
  move: number, // 0, 1 or 2
  player: string // "User" or "Computer"
}

function getComputerMove(): guess {
  let move = Math.floor(Math.random() * 3)
  return {
    move: move,
    player: "Computer"
  }
}
```

If we want to test our function is working, we can do so by pasting the below snippet at the bottom of our code and looking in the TypeScript console first for compilation errors, and then if it has compiled successfully, in the browser's JavaScript console to see the log of `computerGuess` – this should be an object with the same shape as the interface we defined above, with the move property one of either 0,1 or 2.

```typescript
let computerGuess: guess = getComputerMove()
console.log(computerGuess)
```

Note that our computerGuess variable is an object that also implements the `guess` interface we defined above. Let's put this interface to work for our user's choice now too.

### 3. Letting the user make their choice

Let's add a button for each of rock, paper and scissors:

```html
<div class="game-buttons">
  <button onclick="handleUserChoice(0)">Rock</button>
  <button onclick="handleUserChoice(1)">Paper</button>
  <button onclick="handleUserChoice(2)">Scissors</button>
</div>
```

And set the containing div's display style property to `none` using CSS. Doing it in CSS ensures it's invisible when the browser first loads, before it's had time to run our JavaScript. (We could have hidden it using JS in much the same way as we hid the start button.)

```css
.game-buttons {
  display: none;
}
```

Let's update our `hideStartButton` function to show these buttons:

```typescript
function hideStartButton(): void {
  let startButton: HTMLButtonElement = document.querySelector(".start-button")
  let gameButtons: HTMLDivElement = document.querySelector(".game-buttons")
  startButton.style.display = "none"
  gameButtons.style.display = "block"
}
```

Each of these buttons has a function called `handleUserChoice` in its `onclick` attribute. Let's define this function now:

```typescript
function handleUserChoice(choice: number): void {
  let userGuess: guess = {
    move: choice,
    player: "User"
  }
}
```

As you can see this function takes a single argument, a number between 0 and 2 (where zero stands for "rock", one for "paper" and so on). It doesn't return anything as it's being called by an HTML button element.

The `userGuess` object also implements our `guess` interface.

#### Improving our `outputMessage` function

Currently whenever we log a message it comes through as an alert. This is quite annoying.

Let's add a section to our HTML that'll contain paragraphs of text, and update our `outputMessage` function to append a new paragraph to this section whenever there's an update:

```html
  <section class="output"></section>
</body>
```

We can style this to make any containing paragraphs big and bold and using whichever system we're on's default font:

```css
body {
  /* ... margins, background, etc. */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/*  ... other css goes here */

.output {
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
}
```

We can now update our `outputMessage` function to take advantage of TypeScript's implementation of template literals / string interpolation (better string handling):

```typescript
function outputMessage(message: string): void {
  let output: HTMLDivElement = document.querySelector(".output")
  output.innerHTML += `<p>${message}</p>`
}
```

N.B. There doesn't seem to be an `HTMLSectionElement` type, so we're just using the `HTMLDivElement`. If anyone can explain why this is please share with the group.

### 4. Working out who wins (also, enums)

To complete our basic game functionality, we need to actually work out who wins.

Let's extend our `handleUserChoice` function to call our `getComputerMove` function, and we'll pass these both to a new function that will work out who beats who:

```typescript
function handleUserChoice(choice: number): void {
  let userGuess: guess = {
    move: choice,
    player: "User"
  }
  let computerGuess: guess = getComputerMove()
  outputMessage(`You chose ${userGuess.move}`)
  outputMessage(`Computer chose ${computerGuess.move}`)
}
```

It's fun to use our `outputMessage` function to see the game play out live... but they're just numbers. It's time for `enum's` big entrance.

```typescript
enum moves {
  Rock,
  Paper,
  Scissors
}
```

This is a numeric enum as that's the default enum. If we pop this at the top of our file, and thanks to an enum's ability to give us its value as a string, we can output the words as follows:

```typescript
outputMessage(`You chose ${moves[userGuess.move]}`)
outputMessage(`Computer chose ${moves[computerGuess.move]}`)
```

But enums go further than this. We can use it in our calculateWinner function to determine a winner. At the bottom of our `handleUserChoice` function, let's add a call to a new function, `calculateWinner`:

```typescript
  // ... rest of handleUserChoice function
  outputMessage(`Computer chose ${moves[computerGuess.move]}`)
  let winner: guess = calculateWinner(userGuess, computerGuess)
}

function calculateWinner(guessOne: guess, guessTwo: guess) : guess {
  return {player: "Neither", move: guessOne.move }
}
```

`calculateWinner` takes two guesses (implementations of our `guess` interface), and returns a `guess`.

Look at how we can use the enum to write code that is very easy to understand:

```typescript
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
```

If the moves are the same, we return a guess where the player is "Neither". We then do a swith statement on guessOne's move (we could easily have done it on the other – makes no difference). For each move we write the move that would beat it. If the winning move is present in guessTwo, then guessTwo is the winner.

There are probably more elegant ways of writing this (and if you do come up with something that uses the enum throughout, please do share with the group), but the ability to reason about `moves.Paper` and `moves.Rock`, rather than moves[1] vs moves[0], makes it all much simpler.

This is the beauty of enums.

[View completed branch: 2-game-basics-end](https://github.com/adaapp/rock-paper-typescript/tree/2-game-basics-end)

## Free play

Let's increment our score counters for each player when they win, and output a winner for each move.

```typescript
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
  outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
}
```
Your final stretch task is to create a new function called `checkProgress` that increments the counter, checks if either player's score is 2 (meaning they've won two in a row and the round should end) or whether 3 rounds have passed and declares an ultimate winner if so, hiding the buttons and showing the start button.

You can see my completed code in the branch for this section, but do have a go yourself!

[View completed branch: 3-game-complete-end](https://github.com/adaapp/rock-paper-typescript/tree/3-game-complete-end)

## OOP Refactor

Your task now is to refactor your code to use typescript classes.

This ought to look something like this:

```typescript
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
}
```

We refactor a function into a method by removing the function keyword and prepending `this.` to any function calls, as we are now calling methods on the class rather than global functions:

```typescript
class RockPaperScissors {
  // ... constructor etc.
  startGame(): void {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.clearOutput()
    this.outputMessage("The game has begun!")
    this.hideStartButton()
  }
}
```

Complete the refactor and continue with the workshop once you've got it working. 

You will need to instantiate a game instance at the bottom of your `game.ts` file:

```typescript
const game: RockPaperScissors = new RockPaperScissors()
```

And update the HTML `onclick` attributes to call the class methods:

e.g.

```html
<button onclick="game.handleUserChoice(0)">Rock</button>
```

You can grab a working copy of what the code should look like now from this branch: [4-game-oop-refactor-end](https://github.com/adaapp/rock-paper-typescript/tree/4-game-oop-refactor-end) 

(paste the contents of `working-code/ts/game.ts` into your `ts/game.ts`, and similarly the contents of `index.html`.)

