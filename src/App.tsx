import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Board from "./components/Board";
import EndScreen from "./components/EndScreen";
import useApp from "./context/use";

export type difficulty = "ŁATWY" | "ŚREDNI" | "TRUDNY";

export type boardTile = {
  isBuried: boolean;
  holeId: number;
  hasFlag: boolean;
  hasBomb: boolean;
  bombsAround: number;
};

export default function App() {
  const { difficulty, resetBoard, gameState } = useApp();

  useEffect(() => {
    resetBoard();
  }, [difficulty]);

  return (
    <div className="bg-neutral-800 h-screen flex flex-col">
      {(gameState === "LOSE" || gameState === "WIN") && <EndScreen />}
      <Navbar />
      <Board />
    </div>
  );
}
