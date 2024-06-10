import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { VitePluginRadar } from "vite-plugin-radar"
import svgr from "vite-plugin-svgr"
import { default as viteTsConfigPaths } from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd()).VITE_PUBLIC_URL,
  plugins: [
    nodePolyfills(),
    react({ tsDecorators: true }),
    viteTsConfigPaths(),
    svgr({
      include: "**/*.svg",
      svgrOptions: { icon: true, replaceAttrValues: { fill: "currentColor" } },
    }),
    VitePluginRadar({
      analytics: { id: loadEnv(mode, process.cwd()).VITE_GA_ID },
      enableDev: true,
    }),
  ],
  server: { host: true, port: 3000 },
}))
