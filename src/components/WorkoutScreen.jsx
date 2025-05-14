// WorkoutScreen.jsx - mostra solo l'esercizio corrente per stazione

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
        position: 'relative',
        pt: 2,
      }}
    >
      <IconButton 
        onClick={onBack}
        sx={{
          position: 'absolute',
          left: 16,
          top: 16,
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(0, 200, 83, 0.08)',
          }
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
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
          px: 2,
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
                width: 300,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {station.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {currentExercise?.name || 'Esercizio'}
              </Typography>
              {currentExercise?.gif && (
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    overflow: 'hidden',
                    borderRadius: 2,
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1a1a1a',
                  }}
                >
                  <img
                    src={getGifPath(currentExercise.gif)}
                    alt={currentExercise.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
