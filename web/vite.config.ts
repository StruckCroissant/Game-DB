import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default function config() {
  const config = {
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
        provider: "istanbul",
        reporter: ["lcov"],
      },
    },
  };

  if (
    process.env.NODE_ENV !== "production" ||
    Boolean(process.env.INSTRUMENT_BUILD)
  ) {
    config["build"] = {
      sourcemap: true,
    };
    config.plugins.push(
      istanbul({
        exclude: ["node_modules"],
        requireEnv: false,
        forceBuildInstrument: true,
        checkProd: false,
      })
    );
  }

  return defineConfig(config);
}
