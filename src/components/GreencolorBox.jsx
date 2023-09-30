import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import "./GreencolorBox.css";

const GreencolorBox = ({ gameLevel }) => {
  //const { difficulty } = useParams;
  const [score, setScore] = useState(0);
  const [boxColor, setBoxColor] = useState("red");
  const [timeLeft, setTimeLeft] = useState(40);
  const [winScore, setWinScore] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // New state for game over

  const count = gameLevel === "easy" ? 10 : gameLevel === "medium" ? 15 : 25;
  useEffect(() => {
    setWinScore(count); // Update winScore when difficulty changes
    startGame();
  }, [count]);

  useEffect(() => {
    if (timeLeft === 0 && !isGameWon) {
      // Game over due to timeout
      setIsGameOver(true);
      clearInterval(timerInterval);
    }
  }, [timeLeft, isGameWon]);

  let timerInterval;

  const startGame = () => {
    setWinScore(count); // Set the win score when the game starts
    clearInterval(timerInterval); // Clear any previous intervals
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0 || isGameWon) {
          clearInterval(intervalId); // Clear the interval when time is up or game is won
          checkWin();
        }
        return prevTime - 1;
      });
    }, 1000);
    timerInterval = intervalId; // Store the timer interval
    setInterval(changeColor, getRandomDelay());
    changeColor();
  };
  const getRandomDelay = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  };
  const changeColor = () => {
    const randomColor = Math.random() < 0.5 ? "green" : "red";
    setBoxColor(randomColor);
  };

  const handleBoxClick = () => {
    if (!isGameWon && !isGameOver) {
      if (boxColor === "green") {
        setScore((prevScore) => prevScore + 1);
      } else if (boxColor === "red") {
        gameOver();
      }
    }
  };

  const checkWin = () => {
    if (!isGameWon && score >= winScore) {
      setBoxColor("green");
      setIsGameWon(true);
    } else if (!isGameWon) {
      gameOver();
    }
  };
  const gameOver = () => {
    // setIsGameWon(false);
    setIsGameOver(true);
    setBoxColor("red");
    clearInterval(timerInterval); //Stop the timer interval
    alert("Game Over! you lost!");
  };
  const restartGame = () => {
    setScore(0);
    setTimeLeft(40);
    setIsGameOver(false);
    setIsGameWon(false);
    //setWinScore(getWinScore(difficulty));
    startGame();
  };

  return (
    <div>
      <div
        className="box"
        style={{ backgroundColor: boxColor }}
        onClick={handleBoxClick}
      ></div>
      <p>TimeLeft:{timeLeft}sec</p>
      <p>Youe Score:{score}</p>
      <p>Target Score to Win: {winScore}</p>
      {isGameOver ? (
        <div>
          <p className="loss-message">Game over. You lost!</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : isGameWon ? (
        <p className="win-message">You Win! Game over</p>
      ) : (
        <button onClick={restartGame}>Restart Game</button>
      )}
    </div>
  );
};

export default GreencolorBox;
