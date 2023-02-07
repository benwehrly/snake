import { useState, useEffect } from "react";
export const useGame = (direction, grid) => {
  const [snake, setSnake] = useState([110]);
  const snakeHead = snake[0];
  const vacantCells = grid.filter((cell) => !snake.includes(cell));
  const randomIdx = Math.floor(Math.random() * vacantCells.length);
  const newFoodPosition = vacantCells[randomIdx];
  const [food, setFood] = useState(newFoodPosition);
  const newSnake = [...snake];
  const isPlaying = direction !== undefined;
  const isCollision = new Set(snake).size !== snake.length;
  const isMunching = snakeHead === food;
  const border = {
    top: snakeHead < 20,
    bottom: snakeHead >= 380,
    left: snakeHead % 20 === 0,
    right: (snakeHead + 1) % 20 === 0,
  };

  useEffect(() => {
    let id;
    function handleMovement() {
      if (direction === "up") {
        if (border.top) newSnake.unshift(snakeHead + 380);
        else newSnake.unshift(snakeHead - 20);
      }
      if (direction === "down") {
        if (border.bottom) newSnake.unshift(snakeHead - 380);
        else newSnake.unshift(snakeHead + 20);
      }
      if (direction === "left") {
        if (border.left) newSnake.unshift(snakeHead + 19);
        else newSnake.unshift(snakeHead - 1);
      }
      if (direction === "right") {
        if (border.right) newSnake.unshift(snakeHead - 19);
        else newSnake.unshift(snakeHead + 1);
      }
    }

    id = setInterval(() => {
      if (isPlaying) {
        handleMovement();
        if (isMunching) setFood(newFoodPosition);
        else newSnake.pop();
        if (isCollision) setSnake([snakeHead]);
        else setSnake(newSnake);
      }
    }, 50);
    return () => clearInterval(id);
  }, [direction, snakeHead, snake, food, isCollision]);

  useEffect(() => {
    console.log(snake);
  });

  return {
    snake,
    food,
  };
};
