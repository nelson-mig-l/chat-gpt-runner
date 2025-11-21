import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  root: ".",
  server: {
    open: true
  },
  plugins: [glsl()]
});