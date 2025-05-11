// App.jsx

import { useState } from 'react';
import { Box } from '@mui/material';
import TabataDashboard from './components/TabataDashboard';
import WorkoutScreen from './components/WorkoutScreen';

function App() {
  const [config, setConfig] = useState(null);

  const handleStart = (userConfig) => {
    setConfig(userConfig);
  };

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: 2,
      }}
    >
      {config ? (
        <WorkoutScreen
          stationRounds={config.rounds}
          work={config.work}
          rest={config.rest}
          stations={config.stations}
        />
      ) : (
        <TabataDashboard onStart={handleStart} />
      )}
    </Box>
  );
}

export default App;
