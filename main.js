const { app, BrowserWindow, Notification } = require("electron");
const { ipcMain } = require("electron/main");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "notification",
    body: message,
  }).show();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//chromium-> web engine for rendering UI

//webpack-> is a module builder, main purpose is to bundle JS files for usage in a broswer
//babel-> is a JS compiler
