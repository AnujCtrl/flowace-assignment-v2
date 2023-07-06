const { app, BrowserWindow } = require("electron");
const log = require("electron-log");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true, // Allow window.open() to create new windows
      webviewTag: true, // Enable <webview> tag
      contextIsolation: false, // Disable context isolation
      enableRemoteModule: true, // Enable remote module
    },
  });
  mainWindow.loadFile("index.html");

  // Log URL whenever a new page is loaded
  mainWindow.webContents.on("did-navigate", (event, url) => {
    console.log(event);
    log.info(`Visited URL: ${event.url}`);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
