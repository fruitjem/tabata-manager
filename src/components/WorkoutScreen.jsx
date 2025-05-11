// WorkoutScreen.jsx - corretto flusso stazione/round + rinominato stationRound

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Timer from './Timer';
import StationList from './StationList';

const stations = [
  {
    name: 'Stazione 1',
    exercises: [
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
    ],
  },
  {
    name: 'Stazione 2',
    exercises: [
      { name: 'Jumping Jack', gif: '/gifs/pushUp.gif' },
      { name: 'Jumping Jack', gif: '/gifs/pushUp.gif' },
      { name: 'Jumping Jack', gif: '/gifs/pushUp.gif' },
    ],
  },
];

function WorkoutScreen() {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);
  const stationRounds = 3;
  const work = 20;
  const rest = 10;

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

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Timer
          stationRounds={stationRounds}
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