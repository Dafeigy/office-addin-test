import { fileURLToPath, URL } from 'node:url'
 /// <reference types="@types/office-js" />
 /// <reference types="@types/office-runtime" />
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from "vite-plugin-static-copy";


import fs from "fs";
import path from "path";
import { homedir } from "os";
// Configuration
const devPort = 9090;
// Calculated
const _homeDir = homedir();




// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // vueDevTools(), 
    viteStaticCopy({
       targets: [
         {
           src: "manifest.xml",
           dest: "",
         },
       ],
     })
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
     server: {
     host: true,
     port: devPort,
     https: {
       key: fs.readFileSync(
         path.resolve(`${_homeDir}/.office-addin-dev-certs/localhost.key`)
       ),
       cert: fs.readFileSync(
         path.resolve(`${_homeDir}/.office-addin-dev-certs/localhost.crt`)
       ),
       ca: fs.readFileSync(
         path.resolve(`${_homeDir}/.office-addin-dev-certs/ca.crt`)
       ),
     },
   },
})
