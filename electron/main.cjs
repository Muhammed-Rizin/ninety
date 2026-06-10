const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let widgetWindow;

function createWidgetWindow() {
  widgetWindow = new BrowserWindow({
    width: 320,
    height: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    minWidth: 320,
    minHeight: 110,
    maxWidth: 420,
    maxHeight: 460,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  if (isDev) {
    widgetWindow.loadURL('http://localhost:5173');
  } else {
    widgetWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  widgetWindow.once('ready-to-show', () => {
    widgetWindow.show();
  });
}

app.whenReady().then(() => {
  createWidgetWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWidgetWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for resizing
ipcMain.on('widget:resize', (event, width, height) => {
  if (widgetWindow) {
    widgetWindow.setSize(width, height);
  }
});

ipcMain.on('widget:center', () => {
  if (widgetWindow) {
    widgetWindow.center();
  }
});

ipcMain.on('widget:close', () => {
  if (widgetWindow) {
    widgetWindow.close();
  }
});
