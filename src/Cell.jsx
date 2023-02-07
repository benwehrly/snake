export const Cell = ({ cell, snake, food }) => {
    const isSnake = snake.includes(cell);
    const isFood = food === cell;
    return (
      <div className={`cell ${isSnake ? "snake" : isFood ? "food" : ""}`} />
    );
  };