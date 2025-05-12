// preload.cjs
const { contextBridge } = require('electron');
const Store = require('electron-store');
const store = new Store();

console.log('[PRELOAD] preload loaded');

contextBridge.exposeInMainWorld('store', {
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
});
