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
  };

  if (process.env.NODE_ENV !== "production") {
    config["build"].sourcemap = true;
    config.plugins.push(
      istanbul({
        exclude: ["node_modules"],
        requireEnv: true,
        forceBuildInstrument: Boolean(process.env.INSTRUMENT_BUILD),
        checkProd: false,
      })
    );
  }

  return defineConfig(config);
}
