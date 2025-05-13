// WorkoutScreen.jsx - mostra solo l'esercizio corrente per stazione

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Timer from './Timer';

function WorkoutScreen({ stations, rounds, work, rest, onBack }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);

  const getGifPath = (gifPath) => {
    if (!gifPath) return '';
    const isDev = import.meta.env.MODE === 'development';
    return isDev ? `/${gifPath}` : `./${gifPath}`;
  };

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
          rounds={rounds}
          work={work}
          rest={rest}
          stations={stations}
          onRoundChange={setCurrentRound}
          onStationChange={setCurrentStation}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        {stations.map((station, sIndex) => {
          const currentExercise =
            station.exercises[currentRound % station.exercises.length];

          return (
            <Box
              key={sIndex}
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#2a2a2a',
                color: 'white',
                maxWidth: 300,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {station.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {currentExercise?.name || 'Esercizio'}
              </Typography>
              {currentExercise?.gif && (
                <img
                  src={getGifPath(currentExercise.gif)}
                  alt={currentExercise.name}
                  style={{ width: '100%', borderRadius: 8, marginTop: 8 }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
