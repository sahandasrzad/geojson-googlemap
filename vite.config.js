import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //   },
    //   manifest: {
    //     name: "filio",
    //     theme_color: "#ff5e3a",
    //     icons: [
    //       {
    //         src: "assets/vue.svg",
    //         sizes: "192x192",
    //         type: "image/svg",
    //       },
    //     ],
    //     background: {
    //       service_worker: "example.worker.js",
    //       type: "module",
    //     },
    //   },
    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //   },
    // }),
  ],
  server: {
    port: 8888 || 5173,
  },
});
