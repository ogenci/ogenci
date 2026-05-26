import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

const port = Number(process.env.PORT) || 3000;
const basePath = process.env.BASE_PATH || "/";

const articleDir = path.resolve(import.meta.dirname, "src/content/articles");
let birthtimes: Record<string, number> = {};
try {
  birthtimes = Object.fromEntries(
    fs.readdirSync(articleDir)
      .filter(f => f.endsWith(".md"))
      .map(f => [f.replace(/\.md$/, ""), fs.statSync(path.join(articleDir, f)).birthtimeMs])
  );
} catch {
  // articles directory may not exist yet
}

function articleBirthtimesPlugin(): Plugin {
  const replacement = JSON.stringify(birthtimes);
  return {
    name: "article-birthtimes",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("src/lib/articles.ts")) {
        return code.replace("/* BIRTHTIMES */{}", replacement);
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    articleBirthtimesPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
  },
});
