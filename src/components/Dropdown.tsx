import { useEffect, useRef, useState } from "react";

import type { difficulty } from "@/src/App";
import useApp from "@/src/context/use";
import { BOARD_SIZES } from "@/src/util/consts";
import { selectedDifficultyStorage } from "@/src/util/storage";

export default function Dropdown() {
  const { difficulty, setDifficulty } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    document.addEventListener(
      "click",
      ({ target }) =>
        target !== window &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(target as Element) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Element) &&
        setIsDropdownOpen(false),
      {
        once: true,
        capture: true,
      }
    );
  }, [isDropdownOpen]);

  return (
    <div className="relative h-full w-24">
      <button
        ref={dropdownButtonRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`absolute z-10 bg-white shadow-lg transition-transform duration-500  flex justify-center p-2 w-24 font-bold ${
          isDropdownOpen ? "rounded-md scale-110" : "rounded-md"
        }`}
      >
        {difficulty}
        <span className={`flex items-center ml-1 duration-500 ${isDropdownOpen && "rotate-180"}`}>&#x25BE;</span>
      </button>
      <div
        className={`absolute w-24 h-40 overflow-hidden transition-transform duration-500 origin-top ${
          !isDropdownOpen && "scale-y-0"
        }`}
      >
        <div
          ref={dropdownRef}
          className={`absolute w-24 transition-transform duration-500 bg-slate-200 rounded-b-md top-10 p-2 divide-y-2 divide-black divide-opacity-10 ${
            !isDropdownOpen && "-translate-y-28 scale-75"
          }`}
        >
          {(Object.keys(BOARD_SIZES) as difficulty[]).map((diff) => (
            <button
              className="block w-full p-1"
              key={diff}
              onClick={() => {
                setDifficulty(diff);
                selectedDifficultyStorage.set(diff);
                setIsDropdownOpen(false);
              }}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
