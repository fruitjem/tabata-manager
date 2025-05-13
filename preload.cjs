// preload.cjs
const { contextBridge } = require('electron');
const Store = require('electron-store');

const store = new Store();

// Espone le funzioni al renderer
contextBridge.exposeInMainWorld('store', {
  get: (key) => {
    console.log('[PRELOAD] GET key:', key);
    return store.get(key);
  },
  set: (key, value) => {
    console.log('[PRELOAD] SET key:', key, 'value:', value);
    return store.set(key, value);
  },
  delete: (key) => {
    console.log('[PRELOAD] DELETE key:', key);
    return store.delete(key);
  },
});
