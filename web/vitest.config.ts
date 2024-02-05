import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: [["lcov", { projectRoot: "./src" }]],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "./utilities/**/*",
        "./mocks/**/*",
        "./dist/**/*",
      ],
    },
  },
});
