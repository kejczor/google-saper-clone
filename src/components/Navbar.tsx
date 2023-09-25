import { fixedDigits } from "@/src/util/functions";
import useApp from "@/src/context/use";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const { remainingFlags, gameTime, resetBoard } = useApp();

  return (
    <header className="bg-lime-700">
      <div className="flex mx-auto max-w-2xl justify-between p-4">
        <Dropdown />
        <div className="flex text-white text-xl space-x-3">
          <div className="flex items-center">
            <img src="./flag_icon.png" width={40} height={40} alt="flag" />
            <span className="w-7">{remainingFlags}</span>
          </div>
          <div className="flex items-center">
            <img src="./clock_icon.png" width={40} height={40} alt="clock" />
            <span>{fixedDigits(gameTime, 3)}</span>
          </div>
        </div>
        <div className="flex">
          {/* TODO implement sound to the game */}
          {/* <button onClick={() => console.log("sound toogle")}>
            {true ? (
              <img src="./speaker_on.png" width={30} height={30} alt="speaker on" />
            ) : (
              <img src="./speaker_off.png" width={30} height={30} alt="speaker off" />
            )}
          </button> */}
          <button onClick={resetBoard}>
            <img src="./close_icon.png" width={30} height={30} alt="close" />
          </button>
        </div>
      </div>
    </header>
  );
}
