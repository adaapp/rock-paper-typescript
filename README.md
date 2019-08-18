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

* `img` -> directory containing a screenshot of the game and the three images we'll need
* `README.md` -> this document
* `.gitignore` -> a list of files for git to ignore

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
</button>
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
      margin: 0.5rem;
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
let gameScore: number = 0
let counter: number = 0
```

Note how the syntax is identical to JavaScript's, we just specify the type of the variable after the variable's name declaration, and before we assign its value.

Let's compile TypeScript for the first time. If this is the first time you've done this and you've just run the `npm install -g typescript` command, you many need to quit your terminal and open a new one:

`$ tsc ts/game.ts`

It'll take a short moment but afterwards you'll find a file called `game.js` sitting next to the `game.ts` file. Have a look at its contents – pretty underwhelming, right?

Note that we're not using semi-colons at the end of each line in our TypeScript file, and that the compiled JS uses `var` instead of `let`. This ensures we'll support older browsers which is great for accessibility.

Manually running the `tsc` command each time is a pain. We also want the game.js file to end up in the `js/` directory that we linked to our HTML file. Step forward, `tsconfig.json`.

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
This file will read any `.ts` files inside a folder called `ts`. It won't remove comments which means people reading your source code will be able to learn from you (if you haven't already, [read this powerful case from Rachel Andrews on making our projects "learnable"](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/)). It won't look for typescript files in our `img` or `js` directories. And it'll enable source maps  – these help browser-based dev tools help you debug, by showing you the line-numbers in your TypeScript files when you have errors in your compiled JavaScript files.

Best of all, thanks to `"watch": true` it will run in the background so we don't have to keep manually running the compiler. 

Check it's all working by running the following from the root of the project:

`$ tsc`

If you refresh your game now you should see the alert from TypeScript. 

That's the end of the first session.

[View completed branch: 1-ts-setup-end](https://github.com/adaapp/rock-paper-typescript/tree/1-ts-setup-end)

 




