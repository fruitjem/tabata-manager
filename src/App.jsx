// App.jsx - aggiunto supporto per "Torna alla Dashboard"

import { useState } from 'react';
import TabataDashboard from './components/TabataDashboard';
import WorkoutScreen from './components/WorkoutScreen';
import LandingPage from './components/LandingPage';
import ExerciseManagement from './components/ExerciseManagement';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'tabata', 'exercises', 'workout'
  const [tabataData, setTabataData] = useState(null);

  const handleStartTabata = ({ stations, rounds, work, rest }) => {
    setTabataData({ stations, rounds, work, rest });
    setCurrentView('workout');
  };

  const handleBackToDashboard = () => {
    setCurrentView('tabata');
    setTabataData(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onTabataClick={() => setCurrentView('tabata')}
            onExercisesClick={() => setCurrentView('exercises')}
          />
        );
      case 'tabata':
        return <TabataDashboard onStart={handleStartTabata} />;
      case 'workout':
        return (
          <WorkoutScreen
            stations={tabataData.stations}
            rounds={tabataData.rounds}
            work={tabataData.work}
            rest={tabataData.rest}
            onBack={handleBackToDashboard}
          />
        );
      case 'exercises':
        return <ExerciseManagement onBack={() => setCurrentView('landing')} />;
      default:
        return <LandingPage onTabataClick={() => setCurrentView('tabata')} onExercisesClick={() => setCurrentView('exercises')} />;
    }
  };

  return renderView();
}

export default App;
