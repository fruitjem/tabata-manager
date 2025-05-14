// WorkoutScreen.jsx - mostra solo l'esercizio corrente per stazione

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import Timer from './Timer';

function WorkoutScreen({ stations, rounds, work, rest, onBack }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);

  const getGifPath = (gifPath) => {
    if (!gifPath) return '';
    const isDev = import.meta.env.MODE === 'development';
    return isDev ? `/${gifPath}` : `./${gifPath}`;
  };

  // Calculate number of cards per row (ceiling of total/2 to ensure even distribution)
  const cardsPerRow = Math.ceil(stations.length / 2);

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
          width: '100%',
          maxWidth: cardsPerRow * 320, // 320px per card (300px + margins)
          px: 2,
        }}
      >
        <Grid container spacing={2}>
          {[...Array(2)].map((_, rowIndex) => (
            <Grid item xs={12} key={rowIndex}>
              <Grid container spacing={2} justifyContent="center">
                {stations
                  .slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow)
                  .map((station, sIndex) => {
                    const currentExercise =
                      station.exercises[currentRound % station.exercises.length];

                    return (
                      <Grid item key={sIndex}>
                        <Box
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
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
