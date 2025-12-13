import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",

  server: {
    host: true,
    port: 8080,
    fs: {
      allow: [
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "shared"),
        path.resolve(__dirname, "server"),
        path.resolve(__dirname)
      ],
    },
  },

  plugins: [
    react(),
    {
      name: "express-plugin",
      apply: "serve",
      configureServer(vite) {
        const app = createServer();
        vite.middlewares.use(app);
      }
    }
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
