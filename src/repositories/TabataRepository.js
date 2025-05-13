const STORAGE_KEY = 'savedTabatas';

export default class TabataRepository {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  save(newTabata) {
    const all = this.getAll();
    const updated = [...all, newTabata];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  delete(id) {
    const filtered = this.getAll().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}
