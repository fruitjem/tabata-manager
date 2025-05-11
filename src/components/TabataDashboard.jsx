// TabataDashboard.jsx - larghezza fissa per i Select esercizi

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import exerciseOptions from './exercises';

function TabataDashboard({ onStart }) {
  const [rounds, setRounds] = useState(3);
  const [work, setWork] = useState(20);
  const [rest, setRest] = useState(10);
  const [stations, setStations] = useState([
    {
      name: 'Stazione 1',
      exercises: [{ name: '', gif: '' }],
    },
  ]);

  const handleStationChange = (index, value) => {
    const updated = [...stations];
    updated[index].name = value;
    setStations(updated);
  };

  const handleExerciseChange = (stationIndex, exerciseIndex, value) => {
    const updated = [...stations];
    const exercise = exerciseOptions.find((e) => e.name === value);
    updated[stationIndex].exercises[exerciseIndex] = {
      name: exercise.name,
      gif: exercise.gif,
    };
    setStations(updated);
  };

  const addExerciseToStation = (stationIndex) => {
    const updated = [...stations];
    updated[stationIndex].exercises.push({ name: '', gif: '' });
    setStations(updated);
  };

  const removeExerciseFromStation = (stationIndex, exerciseIndex) => {
    const updated = [...stations];
    updated[stationIndex].exercises.splice(exerciseIndex, 1);
    setStations(updated);
  };

  const addStation = () => {
    setStations((prev) => [
      ...prev,
      {
        name: `Stazione ${prev.length + 1}`,
        exercises: [{ name: '', gif: '' }],
      },
    ]);
  };

  const handleStart = () => {
    onStart({ rounds, work, rest, stations });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        minHeight: '100vh',
        width: '100%',
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%', textAlign: 'center', py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Crea il tuo allenamento Tabata
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
          <TextField
            label="Round per stazione"
            type="number"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
          />
          <TextField
            label="Durata LAVORO (s)"
            type="number"
            value={work}
            onChange={(e) => setWork(parseInt(e.target.value))}
          />
          <TextField
            label="Durata RIPOSO (s)"
            type="number"
            value={rest}
            onChange={(e) => setRest(parseInt(e.target.value))}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Stazioni:
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {stations.map((station, sIndex) => (
            <Grid item xs={12} md={6} key={sIndex}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'left' }}>
                <TextField
                  fullWidth
                  label="Nome stazione"
                  value={station.name}
                  onChange={(e) => handleStationChange(sIndex, e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle2" gutterBottom>
                  Esercizi:
                </Typography>
                {station.exercises.map((ex, eIndex) => (
                  <Box key={eIndex} display="flex" alignItems="center" gap={1} mb={1}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Seleziona esercizio</InputLabel>
                      <Select
                        value={ex.name}
                        label="Seleziona esercizio"
                        onChange={(e) =>
                          handleExerciseChange(sIndex, eIndex, e.target.value)
                        }
                      >
                        {exerciseOptions.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton
                      aria-label="rimuovi"
                      onClick={() => removeExerciseFromStation(sIndex, eIndex)}
                      disabled={station.exercises.length <= 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => addExerciseToStation(sIndex)}
                  size="small"
                >
                  + Aggiungi esercizio
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button onClick={addStation} sx={{ mt: 3 }} variant="outlined">
          + Aggiungi Stazione
        </Button>

        <Box mt={4}>
          <Button onClick={handleStart} variant="contained" color="primary">
            Avvia Tabata
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TabataDashboard;
