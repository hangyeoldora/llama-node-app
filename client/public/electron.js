import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from 'url';
import osUtil from 'os-utils';

app.setName('llama-챗봇');

const isDevMode = true;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('__dirname: ', __dirname);
console.log(path.join(__dirname, './preload.js'))
const loadUrl = isDevMode ? 'http://localhost:5173' : `file://${path.join(__dirname, "../build/index.html")}`;
let mainWin;

const createWindow = () => {
  mainWin = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    title: 'llama-챗봇',
    resizable: false,
    webPreferences: {
      devTools: isDevMode,
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false
    },
  });
  mainWin.loadURL(loadUrl);
  // mainWin.webContents.openDevTools();
};

app.whenReady().then(async () => {
  console.log('whenready 실행');
  createWindow();
  await import('./node/index.js');
  (async () => {
    let threads;
    let sysThreads = osUtil.cpuCount();
    for (let i = 1; i < sysThreads; i = i * 2) {
      threads = i;
    }
    if (sysThreads == 4) {
      threads = 4;
    }
    ipcMain.on("cpuUsage", () => {
      osUtil.cpuUsage(function (v) {
        mainWin.webContents.send("cpuUsage", { data: v });
      });
    });
    ipcMain.on("cpuFree", () => {
      osUtil.cpuFree(function (v) {
        mainWin.webContents.send("cpuFree", { data: v });
      });
    });
    
    ipcMain.on("cpuCount", () => {
      mainWin.webContents.send("cpuCount", {
        data: osUtil.cpuCount()
      });
    });
    ipcMain.on("threadUtilized", () => {
      mainWin.webContents.send("threadUtilized", {
        data: threads
      });
    });
    ipcMain.on("freemem", () => {
      mainWin.webContents.send("freemem", {
        data: Math.round(osUtil.freemem() / 102.4) / 10
      });
    });
    ipcMain.on("totalmem", () => {
      mainWin.webContents.send("totalmem", {
        data: osUtil.totalmem()
      });
    });
    ipcMain.on("os", () => {
      mainWin.webContents.send("os", {
        data: platform
      });
    });
  })();
})

app.on('quit', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});
