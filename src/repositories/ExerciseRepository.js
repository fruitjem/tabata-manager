const STORAGE_KEY = 'savedExercises';

export default class ExerciseRepository {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  save(newExercise) {
    const all = this.getAll();
    const updated = [...all, { ...newExercise, id: Date.now() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  update(id, updatedExercise) {
    const all = this.getAll();
    const updated = all.map(ex => ex.id === id ? { ...updatedExercise, id } : ex);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  delete(id) {
    const filtered = this.getAll().filter(ex => ex.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
} 