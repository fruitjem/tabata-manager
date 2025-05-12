// preload.js - opzionale, può essere usato per comunicazioni sicure tra Electron e Web

const { contextBridge } = require('electron');

// Espone funzionalità sicure nel contesto del renderer (facoltativo)
contextBridge.exposeInMainWorld('api', {
  // esempio: versione app
  getAppVersion: () => process.versions.electron
});
