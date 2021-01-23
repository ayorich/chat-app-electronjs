const {
  app,
  BrowserWindow,
  Notification,
  Menu,
  Tray,
  // nativeImage,
} = require("electron");
const { ipcMain } = require("electron/main");
const path = require("path");
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, "assets", "images", "react_app_logo.png");
const trayIcon = path.join(__dirname, "assets", "images", "react_icon.png");

// let win = null;
function createSplashWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  win.loadFile("splash.html");
  return win;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#6e707e",
    icon: path.join(__dirname, "assets", "images", "react_icon.png"),
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  // isDev && win.webContents.openDevTools();
  return win;
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
  // try {
  //   require("electron-reloader")(module, {
  //     debug: true,
  //     watchRenderer: true,
  //   });
  // } catch (_) {
  //   console.log("Error");
  // }
}

if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

// let tray = null;
app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);

  const splash = createSplashWindow();
  const mainWindow = createWindow();

  mainWindow.once("ready-to-show", () => {
    // splash.destroy();
    // mainWindow.show();
    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 3000);
  });
  // win.tray = new Tray(nativeImage.createFromPath(trayIcon));
});

ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "notification",
    body: message,
  }).show();
});
ipcMain.on("app-quit", () => {
  app.quit();
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
