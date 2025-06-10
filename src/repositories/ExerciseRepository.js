const STORAGE_KEY = 'savedExercises';

export default class ExerciseRepository {
  constructor() {
    console.log('ExerciseRepository constructor called.');
  }

  getAllRaw() {
    console.log('getAllRaw called.');
    const raw = localStorage.getItem(STORAGE_KEY);
    let parsed = [];
    try {
      parsed = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error parsing localStorage data, returning empty array:', e);
      parsed = [];
    }
    console.log('getAllRaw - returning:', parsed);
    return parsed;
  }

  async getAll() { 
    console.log('getAll called (public API).');
    const currentExercises = this.getAllRaw();
    console.log('getAll - returning existing exercises:', currentExercises);
    return currentExercises; // Ritorna la lista esistente direttamente
  }

  async save(newExercise) {
    console.log('save called with:', newExercise);
    const all = this.getAllRaw();
    let exerciseToSave = { ...newExercise, id: Date.now() };

    if (newExercise.gif && newExercise.gif.startsWith('http')) {
      try {
        const base64 = await this.convertGifToBase64(newExercise.gif);
        exerciseToSave.gif = base64;
      } catch (error) {
        console.error('Error during GIF conversion for save:', error);
      }
    }
    const updated = [...all, exerciseToSave];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('save - saved exercise:', exerciseToSave);
  }

  async update(id, updatedExercise) {
    console.log('update called for ID:', id, 'with:', updatedExercise);
    const all = this.getAllRaw();
    let exerciseToUpdate = { ...updatedExercise, id };

    if (updatedExercise.gif && updatedExercise.gif.startsWith('http')) {
      try {
        const base64 = await this.convertGifToBase64(updatedExercise.gif);
        exerciseToUpdate.gif = base64;
      } catch (error) {
        console.error('Error during GIF conversion for update:', error);
      }
    }
    const updated = all.map(ex => ex.id === id ? exerciseToUpdate : ex);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('update - updated exercise:', exerciseToUpdate);
  }

  async delete(id) {
    console.log('delete called for ID:', id);
    let filtered = this.getAllRaw().filter(ex => ex.id !== id);
    console.log('delete - filtered exercises:', filtered);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('delete - set filtered exercises in localStorage.');
    // NON ripopolare con i default dopo la cancellazione
  }

  async convertGifToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting GIF to base64:', error);
      return url; 
    }
  }
} 