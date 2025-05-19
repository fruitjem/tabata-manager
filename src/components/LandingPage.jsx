import { Box, Button, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';

function LandingPage({ onTabataClick, onExercisesClick }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        p: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        09K Tabata
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={onTabataClick}
          startIcon={<FitnessCenterIcon />}
          sx={{
            minWidth: 200,
            minHeight: 100,
            fontSize: '1.2rem',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          TABATA
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={onExercisesClick}
          startIcon={<ListAltIcon />}
          sx={{
            minWidth: 200,
            minHeight: 100,
            fontSize: '1.2rem',
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
        >
          Esercizi
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage; 