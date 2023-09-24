import { RECORD_TIME_LOCALSTORAGE, SELECTED_DIFFICULTY_LOCALSTORAGE } from "./consts";
import type { difficulty } from "@/src/App";

export const recordTimeStorage = {
  set: (recordTime: number) => {
    localStorage.setItem(RECORD_TIME_LOCALSTORAGE, JSON.stringify(recordTime));
  },
  get: (): number | null => {
    return JSON.parse(localStorage.getItem(RECORD_TIME_LOCALSTORAGE)!);
  },
};

export const selectedDifficultyStorage = {
  set: (lvl: difficulty) => {
    localStorage.setItem(SELECTED_DIFFICULTY_LOCALSTORAGE, JSON.stringify(lvl));
  },
  get: (): difficulty | null => {
    return JSON.parse(localStorage.getItem(SELECTED_DIFFICULTY_LOCALSTORAGE)!);
  },
};
