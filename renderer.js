const { remote } = require("electron");
const sqlite3 = require("sqlite3").verbose();

const webviewContainer = document.getElementById("webview-container");
const urlInput = document.getElementById("url-input");
const goButton = document.getElementById("go-button");
const webview = document.createElement("webview");
webview.setAttribute("src", "https://example.com"); // Replace with desired URL
webview.setAttribute("style", "width: 100%; height: 100%;");

webviewContainer.appendChild(webview);
const defaultURL = "https://www.google.com";
// Handle new window creation requests
webview.addEventListener("new-window", (e) => {
  const { url } = e;
  const { BrowserWindow } = remote;

  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      webviewTag: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  newWindow.loadURL(url);
});

// Log functionality
const db = new sqlite3.Database("logs.db");

// Create the logs table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function logMessage(message) {
  db.run(`INSERT INTO logs (message) VALUES (?)`, message);
}

// Configure zoom level limits
// const webContents = webview.getWebContents();
// webContents.on("did-finish-load", () => {
//   webContents.setZoomLevelLimits(1, 3);


webview.addEventListener("did-navigate", (e) => {
    const { url } = e;
    logMessage(`Visited URL: ${url}`);
    });

// Log URL whenever a new page is loade}); 

// Navigation functionality
function navigateToURL() {
  const url = document.getElementById("url-input").value.trim();console.log(urlInput.value);
  webview.loadURL("https://"+document.getElementById("url-input").value.trim());
}
goButton.addEventListener('click', () => {
//   const url = urlInput.value.trim();
  navigateToURL();
});

urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    navigateToURL();
  }
});
