import "./App.css";
import { Cell } from "./Cell";
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
      {direction === undefined && (
        <h3 className="message">Press W A S or D to start</h3>
      )}
      <div className="grid">
        {grid.map((cell) => (
          <Cell cell={cell} snake={snake} food={food} />
        ))}
      </div>
      <h2>SCORE: {score}</h2>
    </div>
  );
}
