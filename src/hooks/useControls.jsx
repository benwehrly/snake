import { useState, useEffect } from "react";

export const useControls = () => {
  const [currentKey, setCurrentKey] = useState("");

  const direction =
    currentKey === "w"
      ? "up"
      : currentKey === "a"
      ? "left"
      : currentKey === "s"
      ? "down"
      : currentKey === "d"
      ? "right"
      : currentKey === "p"
      ? undefined
      : undefined;

  const yKeys = ["w", "s"];
  const xKeys = ["a", "d"];

  useEffect(() => {
    function handleKeyPress(e) {
      const keys = "pawsd".split("");
      //prevent moving opposite direction
      if (yKeys.includes(currentKey) && yKeys.includes(e.key)) return;
      if (xKeys.includes(currentKey) && xKeys.includes(e.key)) return;
      if (keys.includes(e.key)) {
        setCurrentKey(e.key);
      }
    }

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [currentKey]);

  return {
    direction,
  };
};
