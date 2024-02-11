import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import istanbul from "vite-plugin-istanbul";
import type { UserConfig } from "vite";

const vuePlugin = () =>
  vue({
    template: {
      compilerOptions: {
        nodeTransforms: [
          (node) => {
            if (process.env.NODE_ENV !== "production") return;
            if (node.type !== 1 /*NodeTypes.ELEMENT*/) return;
            for (let i = 0; i < node.props.length; i++) {
              const prop = node.props[i];
              if (
                !prop ||
                prop.type !== 6 /*NodeTypes.ELEMENT*/ ||
                prop.name !== "data-testid"
              )
                continue;
              node.props.splice(i, 1);
              i--;
            }
          },
        ],
      },
    },
  });

const defaultConfig: () => UserConfig = () => ({
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

// https://vitejs.dev/config/
export default function config(): UserConfig {
  const config = { ...defaultConfig() };

  if (process.env.INSTRUMENT_BUILD) {
    config["build"] = {
      sourcemap: true,
    };
    config.plugins.push(
      istanbul({
        requireEnv: false,
        forceBuildInstrument: true,
        checkProd: false,
      })
    );
  }

  return defineConfig(config);
}
