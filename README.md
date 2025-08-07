## 使用Vue开发Office插件

创建项目建议使用`create vue`进行初始化，并添加Office插件生态支持。在开始前，需要安装yo office

1. **新建Vue项目**：

   ```bash
   npm create vue@latest
   ```

   随后在`package.json`中添加额外的依赖：

   ```json
   {
     "devDependencies": {
       "@types/office-js": "^1.0.363",
       "@types/office-runtime": "^1.0.35",
       "@vitejs/plugin-vue": "^6.0.1",
       "office-addin-debugging": "^5.0.14",
       "office-addin-dev-certs": "^1.12.0",
       "office-addin-manifest": "^1.12.8",
       "vite": "^7.0.6",
       "vite-plugin-static-copy": "^3.1.1",
       "vite-plugin-vue-devtools": "^8.0.0"
     }
   }
   ```

   完成依赖项编写后，使用`npm install` 安装。

2. **Office Web Add-In 适配**：

   首先，需要修改`src/main.js`或`src/main.ts`的挂载逻辑：

   ```diff
   - createApp(App).mount("#app");
   + Office.onReady(() => {
   +   createApp(App).mount("#app");
   + });
   ```

   后续的操作我均以js版本进行说明。完成挂载逻辑后需要在项目根目录的渲染页`index.html`中的`<head>`标签对中添加`Office.js`的运行时:

   ```html
   <!-- Office JavaScript API -->
   <script
     type="text/javascript"
     src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"
   ></script>
   ```

   接下来是使用`yo office`命令生成清单文件：

   ```bash
   yo office
   ? Choose a project type: Office Add-in project containing the manifest only
   ? What do you want to name your add-in? My Office Add-in
   ? Which Office client application would you like to support? Word
   ```

   清单文件`manifest.xml`将会在第二部输入的`My Office Add-in`项目文件夹中，将它移动到Vue项目的根目录，然后`My Office Add-in`文件夹就可以删除了。在得到Web Add-in的清单文件后，对开发者而言还需要设置运行参数。打开`package.json`，修改`script`中的内容：

   ```bash
   
     "scripts":{
       "start": "office-addin-debugging start manifest.xml --dev-server vite",
       "start:desktop": "office-addin-debugging start manifest.xml desktop --dev-server vite",
       "start:web": "office-addin-debugging start manifest.xml web --dev-server vite",
       "stop": "office-addin-debugging stop manifest.xml",
       "manifest:validate": "office-addin-manifest validate manifest.xml",
       "manifest:update-guid": "office-addin-manifest modify manifest.xml --guid",
       "certs:install": "office-addin-dev-certs install ",
       "certs:verify": "office-addin-dev-certs verify",
       "certs:uninstall": "office-addin-dev-certs uninstall"
     }
   
   ```

   然后，修改`vite.config.js`以适配 `vite-plugin-static-copy` 插件复制 `manifest.xml` 进行开发:

   ```diff
     import { fileURLToPath, URL } from "node:url";
   + import fs from "fs";
   + import path from "path";
   + import { homedir } from "os";
     
     import { defineConfig } from "vite";
     import vue from "@vitejs/plugin-vue";
   + import { viteStaticCopy } from "vite-plugin-static-copy";
     
   + // Configuration
   + const devPort = 8989;
     
   + // Calculated
   + const _homeDir = homedir();
     
     // https://vitejs.dev/config/
     export default defineConfig({
       plugins: [
         vue(),
   +     viteStaticCopy({
   +       targets: [
   +         {
   +           src: "manifest.xml",
   +           dest: "",
   +         },
   +       ],
   +     }),
       ],
       resolve: {
         alias: {
           "@": fileURLToPath(new URL("./src", import.meta.url)),
         },
       },
   +   server: {
   +     host: true,
   +     port: devPort,
   +     https: {
   +       key: fs.readFileSync(
   +         path.resolve(`${_homeDir}/.office-addin-dev-certs/localhost.key`)
   +       ),
   +       cert: fs.readFileSync(
   +         path.resolve(`${_homeDir}/.office-addin-dev-certs/localhost.crt`)
   +       ),
   +       ca: fs.readFileSync(
   +         path.resolve(`${_homeDir}/.office-addin-dev-certs/ca.crt`)
   +       ),
   +     },
   +   },
     });
   ```

   最后，修改`manifest.xml`文件，主要是替换所有的`localhost:3000`中的端口改为`vite.config.js`中以`devPort`变量定义的端口即可。


## Web Add-In 部署

下周写

## TODO

- [ ] 文本搜索优化：官方提供的Office.js的搜索接口可用性极低，~~官方文档不知道叽里咕噜地说什么并且提供的示例较少同时不适配当前业务场景~~，需要另外寻找可行的、可靠的文本定位方法。
- [ ] 文本段落定位不符预期：接上条，采取本方法对批注部分内容进行文本搜索使用了遍历。当遍历得到的结果似乎有问题，目前的情况是**实际返回的段落ID比理想的段落ID要小**。
- [ ] 文档补全：预期产出《现代Web框架下的Office插件开发》技术路线文档


## 参考资料

1. [Office-Addin-Vue3-Vite-TS/NOTES.md at main · sigmarising/Office-Addin-Vue3-Vite-TS](https://github.com/sigmarising/Office-Addin-Vue3-Vite-TS/blob/main/NOTES.md)