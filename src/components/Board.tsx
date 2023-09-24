import useApp from "@/context/use";
import Tile from "./Tile";

export default function Board() {
  const { board, difficulty } = useApp();

  // prettier-ignore
  const boardSizeCSS =
    difficulty === "ŁATWY"
      ? "max-w-[30rem] max-h-[30rem]" : 
    difficulty === "ŚREDNI"
      ? "max-w-[45rem] max-h-[45rem]" : 
    "max-w-[55rem] max-h-[55rem]";

  // can be (for tw compiler purpose) grid-cols-10 grid-cols-18 grid-cols-24
  const gridCols = `grid-cols-${board.length}`;

  return (
    <div className={`h-full cursor-default mx-auto aspect-square bg-white grid ${gridCols} ${boardSizeCSS}`}>
      {board.map((tilesArray, i) => tilesArray.map((tile, j) => <Tile key={i + "-" + j} tile={tile} x={i} y={j} />))}
    </div>
  );
}
