// StationList.jsx - compatibile con MUI Grid v1 (no warning)

import Grid from '@mui/material/Grid';
import StationCard from './StationCard';

function StationList({ stations, currentRound }) {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
      {stations.map((station, index) => (
        <Grid key={index} sx={{ flexBasis: { xs: '100%', sm: '48%', md: '30%' } }}>
          <StationCard
            name={station.name}
            exercise={station.exercises[currentRound]}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default StationList;