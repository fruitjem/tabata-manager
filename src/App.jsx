// App.jsx - aggiunto supporto per "Torna alla Dashboard"

import { useState } from 'react';
import TabataDashboard from './components/TabataDashboard';
import WorkoutScreen from './components/WorkoutScreen';
import LandingPage from './components/LandingPage';
import ExerciseManagement from './components/ExerciseManagement';
import CronometroConfig from './components/CronometroConfig';
import Timer from './components/Timer';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'tabata', 'exercises', 'workout', 'cronometroConfig', 'cronometroScreen'
  const [tabataData, setTabataData] = useState(null);
  const [cronometroData, setCronometroData] = useState(null);

  const handleStartTabata = ({ stations, rounds, work, rest }) => {
    setTabataData({ stations, rounds, work, rest });
    setCurrentView('workout');
  };

  const handleBackToDashboard = () => {
    setCurrentView('tabata');
    setTabataData(null);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleStartCronometro = ({ work, rest }) => {
    setCronometroData({ work, rest });
    setCurrentView('cronometroScreen');
  };

  const handleBackToCronometroConfig = () => {
    setCurrentView('cronometroConfig');
    setCronometroData(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onTabataClick={() => setCurrentView('tabata')}
            onExercisesClick={() => setCurrentView('exercises')}
            onCronometroClick={() => setCurrentView('cronometroConfig')}
          />
        );
      case 'tabata':
        return <TabataDashboard onStart={handleStartTabata} onBack={handleBackToLanding} />;
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
        return <ExerciseManagement onBack={handleBackToLanding} />;
      case 'cronometroConfig':
        return <CronometroConfig onBack={handleBackToLanding} onStartCronometro={handleStartCronometro} />;
      case 'cronometroScreen':
        return (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton onClick={handleBackToCronometroConfig} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" component="h1">
                Cronometro
              </Typography>
            </Box>
            <Timer
              work={cronometroData.work}
              rest={cronometroData.rest}
              rounds={1}
              stations={[{ name: 'Cronometro', exercises: [] }]}
              onComplete={handleBackToCronometroConfig}
              onRoundChange={() => {}}
              onStationChange={() => {}}
              isCronometro={true}
            />
          </Box>
        );
      default:
        return <LandingPage onTabataClick={() => setCurrentView('tabata')} onExercisesClick={() => setCurrentView('exercises')} onCronometroClick={() => setCurrentView('cronometroConfig')} />;
    }
  };

  return renderView();
}

export default App;
