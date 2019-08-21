import React, { useState } from "react"
import logo from "./logo.svg"
import p5 from "p5"
import "./App.css"
import RockPaperScissors from "./models/RockPaperScissors";

function App() {
  let [showStart, setShowStart] = useState(true)

  let game = new RockPaperScissors()

  function handleStart(e) {
    setShowStart(false)
    game.startGame()
  }

  function handleUserChoice(choice) {
    console.log(choice)
  }

  return (
    <div className="App">
      <div className="game-wrapper">
        {showStart && (
          <button onClick={handleStart} className="start-button">
            Start Game
          </button>
        )}
        {!showStart && (
          <>
            <div className="game-buttons">
              <button onClick={() => handleUserChoice(0)}>Rock</button>
              <button onClick={() => handleUserChoice(1)}>Paper</button>
              <button onClick={() => handleUserChoice(2)}>Scissors</button>
            </div>
            <section className="output">{game.leftImage}</section>
          </>
        )}
      </div>
    </div>
  )
}

export default App
