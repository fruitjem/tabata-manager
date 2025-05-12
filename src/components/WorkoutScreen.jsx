// WorkoutScreen.jsx - aggiunto tasto "Torna alla Dashboard"

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Timer from './Timer';
import StationList from './StationList';

function WorkoutScreen({ stations, rounds, work, rest, onBack }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 4,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        09K-Tabata
      </Typography>

      <Button onClick={onBack} variant="outlined" sx={{ mb: 2 }}>
        🔙 Torna alla Dashboard
      </Button>

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Timer
          stationRounds={rounds}
          work={work}
          rest={rest}
          onRoundChange={setCurrentRound}
          onStationChange={setCurrentStation}
          totalStations={stations.length}
        />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 960, mt: 4 }}>
        <StationList stations={stations} currentRound={currentRound} currentStation={currentStation} />
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
