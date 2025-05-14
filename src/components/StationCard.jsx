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
    <Card sx={{ minWidth: 250, minHeight: 360, backgroundColor: '#2b2b2b', color: 'white' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {station.name || 'Stazione'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {exercise?.name || 'Esercizio'}
        </Typography>
        <Box
          mt={2}
          sx={{
            height: 180,
            width: '100%',
            overflow: 'hidden',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
          className='tabataGIF'
            src={getGifPath(resolvedGif)}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 8,
              display: 'block',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default StationCard;
