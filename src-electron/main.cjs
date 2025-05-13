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

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
