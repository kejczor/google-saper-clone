import { useCallback } from "react";

import type { boardTile } from "@/src/App";
import { COLORS } from "@/src/util/consts";
import useApp from "@/src/context/use";

interface tileProps {
  tile: boardTile;
  x: number;
  y: number;
}

export default function Tile({ tile, x, y }: tileProps) {
  const { digUpTile, toogleFlag } = useApp();
  const { isBuried, bombsAround, hasBomb, hasFlag } = tile;

  const handleRightClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      toogleFlag(x, y);
    },
    [toogleFlag]
  );

  // className variable is used to represent classes
  // of final Tile HTML element, and its name provides
  // access to intellisense snippets of tailwind
  // classes. To keep those snippets classes should
  // be added using
  //    ```className="(classes) " + className```
  //                           ^- remember this space
  let className = "flex aspect-square text-2xl h-full w-full items-center justify-center font-bold ";
  let NodeContent: React.ReactNode;
  if (isBuried) {
    className = "bg-lime-500 " + className;
    if (x % 2 == y % 2) className = "bg-opacity-90 " + className;
  } else {
    if (x % 2 == y % 2) className = "bg-yellow-700 bg-opacity-50 " + className;
    else className = "bg-yellow-800 bg-opacity-50 " + className;
  }
  if (bombsAround || isBuried) {
    className = "hover:bg-opacity-20 " + className;
  }

  if (hasBomb && !isBuried) {
    NodeContent = <div className="w-1/2 h-1/2 rounded-full bg-neutral-700"></div>;
  } else if (hasFlag) {
    NodeContent = <img src="/flag_icon.png" className="h-5/6" />;
  } else if (!isBuried && bombsAround) {
    NodeContent = bombsAround;
    className = COLORS[bombsAround - 1] + " " + className;
  }

  // if (difficulty === "ŁATWY") {
  //   className = "text-3xl " + className;
  // } else if (difficulty === "ŚREDNI") {
  //   className = "text-3xl " + className;
  // } else {
  //   className = "text-xl " + className;
  // }

  return (
    <div onClick={() => digUpTile(x, y)} onContextMenu={handleRightClick} className={className}>
      {NodeContent}
    </div>
  );
}
