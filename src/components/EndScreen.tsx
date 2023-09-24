import useApp from "@/src/context/use";
import { recordTimeStorage } from "@/src/util/storage";

export default function EndScreen() {
  const { resetBoard, gameTime, gameState } = useApp();

  let recordTime = recordTimeStorage.get();

  if (gameState === "WIN" && (!recordTime || gameTime < recordTime)) {
    recordTimeStorage.set(gameTime);
    recordTime = gameTime;
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen bg-black text-white bg-opacity-80 flex justify-center items-center">
      <div>
        <div className="p-7 space-y-2 rounded-xl bg-sky-400">
          <h1 className="text-4xl font-bold text-center">You {gameState.toLowerCase()}</h1>
          <div className="flex justify-center items-center">
            <img src="/clock_icon.png" alt="clock icon" className="h-10" />
            <span className="w-12 text-center">{gameState === "WIN" ? gameTime : "_____"}</span>
          </div>
          <div className="flex justify-center items-center">
            <img src="/trophy_icon.png" alt="" className="h-10" />
            <span className="w-12 text-center">{recordTime ?? "_____"}</span>
          </div>
        </div>
        <button
          onClick={resetBoard}
          className="flex w-full justify-center mt-5 text-2xl items-center bg-lime-800 p-3 rounded-2xl"
        >
          <img src="/refresh_icon.png" alt="refresh icon" className="h-9" />
          Play again
        </button>
      </div>
    </div>
  );
}
