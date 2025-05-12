// StationCard.jsx - fix errore station undefined

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import placeholderGif from '../assets/gifs/placeholder.gif';

function StationCard({ station, round }) {
  if (!station || !station.exercises || station.exercises.length === 0) {
    return null;
  }

  const exercise = station.exercises[round % station.exercises.length];
  const gifToShow = exercise?.gif || placeholderGif;

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
            src={gifToShow}
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
