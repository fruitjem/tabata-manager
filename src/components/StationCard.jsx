// StationCard.jsx - GIF altezza fissa uniforme, crop centrale coerente

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function getGifPath(gifPath) {
  if (!gifPath) return '';
  const isDev = import.meta.env.MODE === 'development';
  return isDev ? `/${gifPath}` : `./${gifPath}`;
}

function StationCard({ station, round }) {
  if (!station || !station.exercises || station.exercises.length === 0) {
    return null;
  }

  const exercise = station.exercises[round % station.exercises.length];
  const resolvedGif = exercise?.gif || 'gifs/placeholder.gif';

  return (
    <Card sx={{ width: 300, backgroundColor: '#2b2b2b', color: 'white' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {station.name || 'Stazione'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {exercise?.name || 'Esercizio'}
        </Typography>
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
            src={getGifPath(resolvedGif)}
            alt={exercise?.name || 'Exercise'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default StationCard;
