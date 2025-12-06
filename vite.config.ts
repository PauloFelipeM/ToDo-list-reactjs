import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwincss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwincss(), svgr()],
});
