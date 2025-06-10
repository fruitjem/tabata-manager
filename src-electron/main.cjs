const { app, BrowserWindow } = require('electron');
const path = require('path');


// ✅ Imposta il nome dell'app per garantire un profilo dati persistente
app.setName('09K Tabata');

// ✅ Logga la cartella in cui Electron salva localStorage, IndexedDB, ecc.
console.log('[APP DATA PATH]', app.getPath('userData'));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // In development mode, load from the dev server
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    // Open DevTools in development mode
    win.webContents.openDevTools();
  } else {
    // In production mode, load from the built files
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
