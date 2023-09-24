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
    base: "/google-saper-clone/",
  };

  if (command === "serve") {
    config.base = "/";
  }

  return config;
});
