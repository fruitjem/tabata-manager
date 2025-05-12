const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const distPath = path.join(__dirname, 'dist', 'index.html');

  // Log per capire cosa succede
  console.log('Loading file:', distPath);
  console.log('File exists:', fs.existsSync(distPath));

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(distPath);
  win.webContents.openDevTools(); // DevTools attivi
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
