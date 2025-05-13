// StationCard.jsx - fix errore station undefined + gestione GIF compatibile con Electron

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
    <Card sx={{ minWidth: 250, backgroundColor: '#2b2b2b', color: 'white' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {station.name || 'Stazione'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {exercise?.name || 'Esercizio'}
        </Typography>
        <Box mt={2}>
          <img
            src={getGifPath(resolvedGif)}
            alt={exercise?.name || 'esercizio'}
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default StationCard;