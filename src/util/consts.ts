export const BOARD_SIZES = {
  ŁATWY: 10,
  ŚREDNI: 18,
  TRUDNY: 24,
} as const;

export const BOMBS = {
  ŁATWY: 10,
  ŚREDNI: 40,
  TRUDNY: 99,
} as const;

export const COLORS = [
  "text-sky-500",
  "text-fuchsia-600",
  "text-orange-500",
  "text-yellow-800",
  "text-teal-900",
] as const;

export const RECORD_TIME_LOCALSTORAGE = "SAPER-RECORD-TIME";
export const SELECTED_DIFFICULTY_LOCALSTORAGE = "SAPER-SELECTED-DIFFICULTY";
