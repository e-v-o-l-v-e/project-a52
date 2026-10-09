import { defineConfig } from "vite";

export default defineConfig({
  // index.html out file will start with a relative path for script
  base: "./",
  server: {
    port: 3001,
  },
  build: {
    // disable this for low bundle sizes
    sourcemap: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "kaplay",
              test: /kaplay/,
            },
          ],
        },
      },
    },
  },
});
