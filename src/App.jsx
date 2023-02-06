import "./App.css";
import { useControls } from "./hooks/useControls";
import { useGame } from "./hooks/useGame";
import { grid } from "./constants";

export default function App() {
  const { direction } = useControls();
  const { snake, food } = useGame(direction, grid);
  const score = snake.length;
  return (
    <div className="App">
      <h1>SNAKE</h1>
      <div className="grid">
        {grid.map((cell) => (
          <Cell cell={cell} snake={snake} food={food} />
        ))}
      </div>
      <h2>SCORE: {score}</h2>
    </div>
  );
}

const Cell = ({ cell, snake, food }) => {
  const isSnake = snake.includes(cell);
  const isFood = food === cell;
  return <div className={`cell ${isSnake ? "snake" : isFood ? "food" : ""}`} />;
};
