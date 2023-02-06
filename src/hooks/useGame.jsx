import { useState, useEffect } from "react";
export const useGame = (direction, grid) => {
  const [snake, setSnake] = useState([110]);
  const snakeHead = snake[0];
  const isCollision = new Set(snake).size !== snake.length;
  const vacantCells = grid.filter((cell) => !snake.includes(cell));
  const randomIdx = Math.floor(Math.random() * vacantCells.length);
  const newFoodPosition = vacantCells[randomIdx];
  const [food, setFood] = useState(newFoodPosition);

  useEffect(() => {
    let id;
    id = setInterval(() => {
      if (direction) {
        const newSnake = [...snake];

        const limit = {
          top: snakeHead < 20,
          bottom: snakeHead >= 380,
          left: snakeHead % 20 === 0,
          right: (snakeHead + 1) % 20 === 0,
        };
        if (direction === "up") {
          if (limit.top) {
            newSnake.unshift(snakeHead + 380);
          } else newSnake.unshift(snakeHead - 20);
        }
        if (direction === "down") {
          if (limit.bottom) {
            newSnake.unshift(snakeHead - 380);
          } else newSnake.unshift(snakeHead + 20);
        }
        if (direction === "left") {
          if (limit.left) {
            newSnake.unshift(snakeHead + 19);
          } else newSnake.unshift(snakeHead - 1);
        }
        if (direction === "right") {
          if (limit.right) {
            newSnake.unshift(snakeHead - 19);
          } else newSnake.unshift(snakeHead + 1);
        }
        if (snakeHead !== food) {
          newSnake.pop();
        } else {
          setFood(newFoodPosition);
        }
        if (isCollision) {
          console.log("collision!");
          setSnake([snakeHead]);
        } else {
          setSnake(newSnake);
        }
      }
    }, 80);
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
