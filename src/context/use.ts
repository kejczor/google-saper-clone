import { useContext } from "react";

import { AppContext } from "./AppContext";

export default function useApp() {
  return useContext(AppContext);
}
