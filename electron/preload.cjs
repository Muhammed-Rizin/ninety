const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  widget: {
    resize: (width, height) => ipcRenderer.send('widget:resize', width, height),
    center: () => ipcRenderer.send('widget:center'),
    close: () => ipcRenderer.send('widget:close'),
  }
});
