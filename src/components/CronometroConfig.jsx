import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CronometroConfig({ onBack, onStartCronometro }) {
  const [work, setWork] = useState(20);
  const [rest, setRest] = useState(10);

  const handleStart = () => {
    onStartCronometro({ work: Number(work), rest: Number(rest) });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        px: 2,
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 500, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Configura Cronometro
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Durata LAVORO (s)"
          type="number"
          value={work}
          onChange={(e) => setWork(parseInt(e.target.value))}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Durata RIPOSO (s)"
          type="number"
          value={rest}
          onChange={(e) => setRest(parseInt(e.target.value))}
          sx={{ mb: 4 }}
        />

        <Button variant="contained" color="primary" onClick={handleStart}>
          Avvia Cronometro
        </Button>
      </Box>
    </Box>
  );
}

export default CronometroConfig; 