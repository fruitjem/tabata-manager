export default class TabataRepository {
  constructor(userId) {
    if (!userId) {
      throw new Error("TabataRepository requires a userId.");
    }
    this.STORAGE_KEY = `savedTabatas_${userId}`;
  }

  getAll() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  save(newTabata) {
    const all = this.getAll();
    const updated = [...all, newTabata];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  delete(id) {
    const filtered = this.getAll().filter(t => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}
