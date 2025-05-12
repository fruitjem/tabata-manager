// WorkoutScreen.jsx - mostra esercizio corretto per ogni round/stazione

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Timer from './Timer';
import StationList from './StationList';

function WorkoutScreen({ stationRounds, work, rest, stations }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);

  console.log('WorkoutScreen stations:', stations);


  // Mappa stazioni con esercizi ripetuti o ciclici in base al numero di round
  const mappedStations = stations.map((station) => {
    const exercises = Array.from({ length: stationRounds }).map((_, i) => {
      const ex = station.exercises[i % station.exercises.length];
      return {
        name: ex.name,
        gif: ex.gif,
      };
    });
    return {
      name: station.name,
      exercises,
    };
  });

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
          totalStations={mappedStations.length}
        />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 960, mt: 4 }}>
        <StationList
          stations={mappedStations}
          currentRound={currentRound}
          currentStation={currentStation}
        />
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
