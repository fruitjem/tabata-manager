// StationList.jsx - log stazioni per debug e render fallback

import React from 'react';
import Grid from '@mui/material/Grid';
import StationCard from './StationCard';

function StationList({ stations, currentRound }) {
  console.log('Rendering StationList with stations:', stations);

  return (
    <Grid container spacing={2} justifyContent="center">
      {stations && stations.length > 0 ? (
        stations.map((station, index) => (
          <Grid key={index}>
            <StationCard station={station} round={currentRound} />
          </Grid>
        ))
      ) : (
        <p style={{ color: 'white' }}>Nessuna stazione disponibile.</p>
      )}
    </Grid>
  );
}

export default StationList;
