New additions into game.ts

- Global timing variables and function
    - framerate log using dt (delta time)
    - global callback function called callbackStep which is called by setting it to a function and then setting time a number for this.waitTime = 2000 (e.g. 2s) and this.wait = true
    - random amount of time to wait till the bot makes it's move
    - timed scale variable added to bot image called botScale - this scales the bot when it first appears until its at max height
- function to remove hand images clearHands()
- css changes to buttons