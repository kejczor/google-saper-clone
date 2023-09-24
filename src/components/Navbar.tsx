import { fixedDigits } from "@/util/functions";
import useApp from "@/context/use";
import Dropdown from "./Dropdown";

import clockIcon from "@/assets/clock_icon.png";
import closeIcon from "@/assets/close_icon.png";
import flagIcon from "@/assets/flag_icon.png";
import speakerOffIcon from "@/assets/speaker_off.png";
import speakerOnIcon from "@/assets/speaker_on.png";

export default function Navbar() {
  const { remainingFlags, gameTime, resetBoard } = useApp();

  return (
    <header className="bg-lime-700">
      <div className="flex mx-auto max-w-2xl justify-between p-4">
        <Dropdown />
        <div className="flex text-white text-xl space-x-3">
          <div className="flex items-center">
            <img src={flagIcon} width={40} height={40} alt="flag" />
            <span className="w-7">{remainingFlags}</span>
          </div>
          <div className="flex items-center">
            <img src={clockIcon} width={40} height={40} alt="clock" />
            <span>{fixedDigits(gameTime, 3)}</span>
          </div>
        </div>
        <div className="flex">
          <button onClick={() => console.log("sound toogle")}>
            {true ? (
              <img
                src={speakerOnIcon}
                width={30}
                height={30}
                alt="speaker on"
              />
            ) : (
              <img
                src={speakerOffIcon}
                width={30}
                height={30}
                alt="speaker off"
              />
            )}
          </button>
          <button onClick={resetBoard}>
            <img src={closeIcon} width={30} height={30} alt="close" />
          </button>
        </div>
      </div>
    </header>
  );
}
