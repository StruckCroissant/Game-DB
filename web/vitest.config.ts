import path, { dirname } from "path";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  resolve: {
    alias: {
      "@game-db/application-test-driver": path.resolve(
        process.cwd(),
        "test/drivers/vitest/vitest-driver.ts"
      ),
      "@": path.resolve(__dirname, "./src")
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      all: true,
      exclude: [
        "**/__test__/**/*",
        "**/.eslintrc.js",
        "**/*.spec.ts",
        "test/**/*",
      ],
      provider: "c8",
      reporter: ["html", "text"],
      src: [path.resolve("./src")],
    },
    environment: "happy-dom",
    setupFiles: ["./test/drivers/vitest/setup.ts"],
  },
});
