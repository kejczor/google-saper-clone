import { ReactNode, createContext, useEffect, useState } from "react";

import type { difficulty, boardTile } from "@/src/App";
import { generateBuriedBoard, optimized_generateGameBoard } from "@/src/util/functions";
import { BOMBS } from "@/src/util/consts";
import { selectedDifficultyStorage } from "@/src/util/storage";

type gameStates = "PLAY" | "NOT_STARTED" | "FREEZE" | "LOSE" | "WIN";

export interface AppContext {
  difficulty: difficulty;
  board: boardTile[][];
  holesAndBorders: [number, number][][];
  remainingFlags: number;
  gameState: gameStates;
  gameTime: number;

  setDifficulty: React.Dispatch<React.SetStateAction<difficulty>>;
  digUpTile: (x: number, y: number) => void;
  toogleFlag: (x: number, y: number) => void;
  resetBoard: () => void;
}

export const AppContext = createContext<AppContext>({} as AppContext);

let gameTimeIntervalId: NodeJS.Timeout;

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [difficulty, setDifficulty] = useState<difficulty>(selectedDifficultyStorage.get() ?? "ŁATWY");
  const [board, setBoard] = useState<boardTile[][]>([]);
  const [holesAndBorders, setHolesAndBorders] = useState<[number, number][][]>([]);
  const [remainingFlags, setRemainingFlags] = useState<number>(BOMBS[difficulty]);
  const [gameState, setGameState] = useState<gameStates>("NOT_STARTED");
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    if (gameState === "PLAY") {
      gameTimeIntervalId = setInterval(() => setGameTime((gameTime) => gameTime + 1), 1000);
      return () => clearInterval(gameTimeIntervalId);
    }
  }, [gameState]);

  function resetBoard() {
    setBoard(generateBuriedBoard(difficulty));
    setGameState("NOT_STARTED");
    setRemainingFlags(BOMBS[difficulty]);
    setGameTime(0);
  }

  function startGame(x: number, y: number) {
    const { board, holesAndBorders } = optimized_generateGameBoard(x, y, difficulty);
    setBoard(board);
    setHolesAndBorders(holesAndBorders);
    setGameState("PLAY");
  }

  function checkGameState(x: number, y: number, board: AppContext["board"]) {
    const buriedTiles = board.reduce(
      (totalBuried, row) => totalBuried + row.filter(({ isBuried }) => isBuried).length,
      0
    );

    if (board[x][y].hasBomb) {
      setGameState("LOSE");
      clearInterval(gameTimeIntervalId);
    } else if (buriedTiles === BOMBS[difficulty]) {
      setGameState("WIN");
      clearInterval(gameTimeIntervalId);
    }
  }

  function digUpTile(x: number, y: number) {
    if (gameState === "PLAY" && !board[x][y].hasFlag) {
      setBoard((board) => {
        board = [...board];
        const userClickHoleId = board[x][y].holeId;
        if (holesAndBorders[userClickHoleId]?.length) {
          holesAndBorders[userClickHoleId].forEach(([y, x]) => {
            board[y][x].isBuried = false;
          });
        } else {
          board[x][y].isBuried = false;
        }

        checkGameState(x, y, board);
        return board;
      });
    } else if (gameState === "NOT_STARTED") {
      startGame(x, y);
    }
  }

  function toogleFlag(x: number, y: number) {
    if (gameState === "PLAY" && board[x][y].isBuried) {
      const hasFlag = board[x][y].hasFlag;
      setBoard((board) => {
        board = [...board];
        board[x][y].hasFlag = !hasFlag;
        return board;
      });
      setRemainingFlags((flags) => flags + (hasFlag ? 1 : -1));
    }
  }

  return (
    <AppContext.Provider
      value={{
        difficulty,
        board,
        holesAndBorders,
        remainingFlags,
        gameState,
        gameTime,
        setDifficulty,
        digUpTile,
        toogleFlag,
        resetBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
