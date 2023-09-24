import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: fileURLToPath(new URL("./", import.meta.url)) }],
    },
    base: "/",
  };

  if (command !== "serve") {
    config.base = "/google-saper-clone/";
  }

  return config;
});
