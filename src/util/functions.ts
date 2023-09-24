import { BOARD_SIZES, BOMBS } from "./consts";
import type { boardTile, difficulty } from "@/src/App";

export function generateBuriedBoard(difficulty: difficulty): boardTile[][] {
  const boardSize = BOARD_SIZES[difficulty];

  return [...Array(boardSize)].map(() =>
    [...Array(boardSize)].map(() => ({
      isBuried: true,
      holeId: -1,
      hasFlag: false,
      hasBomb: false,
      bombsAround: 0,
    }))
  );
}

/**
 * @deprecated
 *
 * Instead use `optimized_generateGameBoard`
 */
export function generateGameBoard(userClickX: number, userClickY: number, difficulty: difficulty) {
  const boardSize = BOARD_SIZES[difficulty];
  const board: boardTile[][] = generateBuriedBoard(difficulty);

  for (let i = 0; i < BOMBS[difficulty]; i++) {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    while (board[x][y].hasBomb || Math.abs(x - userClickX) < 2 || Math.abs(y - userClickY) < 2) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }
    board[x][y].hasBomb = true;

    // counts bombs around
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        if (board[x + j]?.[y + k]) {
          board[x + j][y + k].bombsAround++;
        }
      }
    }
  }

  const toCheck: [number, number][] = [[userClickX, userClickY]];
  while (toCheck.length) {
    const coords = toCheck[0];
    board[coords[0]][coords[1]].isBuried = false;
    toCheck.shift();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (board[coords[0] + i]?.[coords[1] + j]?.bombsAround) {
          board[coords[0] + i][coords[1] + j].isBuried = false;
        } else if (board[coords[0] + i]?.[coords[1] + j]?.isBuried && !board[coords[0] + i]?.[coords[1] + j]?.hasBomb) {
          toCheck.push([coords[0] + i, coords[1] + j]);
        }
      }
    }
  }

  return board;
}

export function optimized_generateGameBoard(userClickX: number, userClickY: number, difficulty: difficulty) {
  const boardSize = BOARD_SIZES[difficulty];
  const board: boardTile[][] = generateBuriedBoard(difficulty);

  for (let i = 0; i < BOMBS[difficulty]; i++) {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    while (board[x][y].hasBomb || Math.abs(x - userClickX) < 2 || Math.abs(y - userClickY) < 2) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }
    board[x][y].hasBomb = true;

    // counts bombs around
    for (let j = -1; j <= 1; j++)
      for (let k = -1; k <= 1; k++) if (board[x + j]?.[y + k]) board[x + j][y + k].bombsAround++;
  }

  // holes are the empty tiles, when some empty tile is being clicked by the user
  // it also digs up other empty tiles nearby and shows the "borders" of the hole
  // which is just a border of bombsAround values surrounding the hole
  const holesAndBorders: [number, number][][] = [];

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const leftTile: boardTile | undefined = board[y][x - 1];
      const topTile: boardTile | undefined = board[y - 1]?.[x];
      const leftTileHoleId = leftTile?.holeId ?? -1;
      const topTileHoleId = topTile?.holeId ?? -1;
      const greaterId = Math.max(leftTileHoleId, topTileHoleId);

      if (board[y][x].hasBomb) continue;

      if (board[y][x].bombsAround) {
        if (greaterId !== -1) holesAndBorders[greaterId].push([y, x]);

        continue;
      }

      if ((topTile?.bombsAround && leftTileHoleId !== -1) || (leftTile?.bombsAround && topTileHoleId !== -1)) {
        board[y][x].holeId = greaterId;
        holesAndBorders[greaterId].push([y, x]);
      }

      if (leftTileHoleId === -1 && topTileHoleId === -1) {
        // new empty area was found so creates a new holeId
        const newHoleId = holesAndBorders.length;
        board[y][x].holeId = newHoleId;
        holesAndBorders[newHoleId] = [[y, x]];
      } else if (leftTileHoleId === -1 || topTileHoleId === -1 || leftTileHoleId === topTileHoleId) {
        // pick the one which has hole id
        board[y][x].holeId = greaterId;
        holesAndBorders[greaterId].push([y, x]);
      } else if (leftTileHoleId !== topTileHoleId) {
        // it found out that two areas have connection with each other so we
        // combine two them into one at index leftTileHoleId and remove the second one
        holesAndBorders[leftTileHoleId] = [
          ...holesAndBorders[leftTileHoleId],
          ...holesAndBorders[topTileHoleId],
          [y, x],
        ];
        holesAndBorders[topTileHoleId].forEach(([y, x]) => {
          if (!board[y][x].bombsAround) board[y][x].holeId = leftTileHoleId;
        });
        board[y][x].holeId = leftTileHoleId;
        delete holesAndBorders[topTileHoleId];
      }

      if (board[y][x].holeId !== -1) {
        // found some connection
        if (board[y - 1]) holesAndBorders[board[y][x].holeId].push([y - 1, x]);
        if (board[y][x - 1]) holesAndBorders[board[y][x].holeId].push([y, x - 1]);
      }
    }
  }

  // finally digs up the hole linked to the tile the user clicked on
  const userClickHoleId = board[userClickX][userClickY].holeId;
  holesAndBorders[userClickHoleId].forEach(([y, x]) => {
    board[y][x].isBuried = false;
  });

  return { board, holesAndBorders };
}

export function fixedDigits(num: number, digitsCount: number) {
  return "0".repeat(digitsCount - String(num).length) + num;
}
