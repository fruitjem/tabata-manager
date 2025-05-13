// TabataDashboard.jsx - aggiunta eliminazione con conferma

import { useState, useEffect } from 'react';
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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import exerciseOptions from './exercises';
import TabataRepository from '@/repositories/TabataRepository';

const repo = new TabataRepository();

function TabataDashboard({ onStart }) {
  const [tabataName, setTabataName] = useState('');
  const [rounds, setRounds] = useState(3);
  const [work, setWork] = useState(20);
  const [rest, setRest] = useState(10);
  const [stations, setStations] = useState([
    {
      name: 'Stazione 1',
      exercises: [{ name: '', gif: '' }],
    },
  ]);
  const [savedTabatas, setSavedTabatas] = useState([]);

  useEffect(() => {
    setSavedTabatas(repo.getAll());
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo Tabata?');
    if (confirmed) {
      repo.delete(id);
      setSavedTabatas(repo.getAll());
    }
  };

  const handleStationChange = (index, value) => {
    const updated = [...stations];
    updated[index].name = value;
    setStations(updated);
  };

  const handleExerciseChange = (stationIndex, exerciseIndex, value) => {
    const exercise = exerciseOptions.find((e) => e.name.trim().toLowerCase() === value.trim().toLowerCase());
    const updated = [...stations];
    updated[stationIndex].exercises[exerciseIndex] = {
      name: value,
      gif: exercise?.gif || '',
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

  const saveTabata = () => {
    if (!tabataName) return;
    const newTabata = {
      id: Date.now(),
      name: tabataName,
      rounds,
      work,
      rest,
      stations,
    };
    repo.save(newTabata);
    setSavedTabatas(repo.getAll());
    setTabataName('');
  };

  const handleStart = () => {
    console.log('Launching tabata with stations:', stations);
    onStart({ rounds, work, rest, stations });
  };

  const loadTabata = (tabata) => {
    setTabataName(tabata.name);
    setRounds(tabata.rounds);
    setWork(tabata.work);
    setRest(tabata.rest);
    setStations(tabata.stations);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Box sx={{ width: 250, bgcolor: '#1e1e1e', p: 2 }}>
        <Typography variant="h6" color="white" align="center" gutterBottom>
          Tabata salvati
        </Typography>
        <Divider sx={{ mb: 1, bgcolor: '#444' }} />
        <List>
          {savedTabatas.map((t) => (
            <ListItem key={t.id} disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(t.id)}>
                  <DeleteIcon sx={{ color: 'white' }} />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => loadTabata(t)}>
                <ListItemText primary={t.name} primaryTypographyProps={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

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
        <Box sx={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Crea il tuo allenamento Tabata
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
            <TextField
              label="Nome Tabata"
              value={tabataName}
              onChange={(e) => setTabataName(e.target.value)}
            />
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

          <Box mt={4} display="flex" gap={2} justifyContent="center">
            <Button onClick={saveTabata} variant="outlined">
              Salva Tabata
            </Button>
            <Button onClick={handleStart} variant="contained" color="primary">
              Avvia Tabata
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TabataDashboard;