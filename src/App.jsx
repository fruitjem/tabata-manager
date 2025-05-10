import { useEffect } from 'react';
import WorkoutScreen from './components/WorkoutScreen';

function App() {
  useEffect(() => {
    let timeout;

    const resetCursor = () => {
      document.body.classList.remove('idle');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.add('idle');
      }, 2000); // nasconde il cursore dopo 2 secondi
    };

    window.addEventListener('mousemove', resetCursor);
    window.addEventListener('keydown', resetCursor);

    resetCursor();

    return () => {
      window.removeEventListener('mousemove', resetCursor);
      window.removeEventListener('keydown', resetCursor);
    };
  }, []);

  return (
    <div>
      <WorkoutScreen />
    </div>
  );
}

export default App;
