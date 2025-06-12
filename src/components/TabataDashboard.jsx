// TabataDashboard.jsx - aggiornato per utilizzare ExerciseRepository

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
  Autocomplete,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExerciseRepository from '../repositories/ExerciseRepository';
import TabataRepository from '../repositories/TabataRepository';

function TabataDashboard({ onStart, onBack, userId }) {
  const tabataRepo = new TabataRepository(userId);
  const exerciseRepo = new ExerciseRepository(userId);

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
  const [availableExercises, setAvailableExercises] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTabata, setEditingTabata] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rounds: 1,
    work: 20,
    rest: 10,
    stations: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setSavedTabatas(tabataRepo.getAll());
      const loadedExercises = await exerciseRepo.getAll();
      setAvailableExercises(loadedExercises);
      console.log('TabataDashboard - Available exercises loaded:', loadedExercises);
    };
    loadData();
  }, [userId]);

  const handleOpenDialog = (tabata = null) => {
    if (tabata) {
      setEditingTabata(tabata);
      setFormData({
        name: tabata.name,
        rounds: tabata.rounds,
        work: tabata.work,
        rest: tabata.rest,
        stations: tabata.stations,
      });
    } else {
      setEditingTabata(null);
      setFormData({
        name: '',
        rounds: 1,
        work: 20,
        rest: 10,
        stations: [],
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTabata(null);
    setFormData({
      name: '',
      rounds: 1,
      work: 20,
      rest: 10,
      stations: [],
    });
    setError('');
  };

  const handleSubmit = () => {
    if (!formData.name || formData.rounds <= 0 || formData.work <= 0 || formData.rest < 0) {
      setError('Per favore, compila tutti i campi obbligatori e assicurati che i valori siano validi.');
      return;
    }
    if (formData.stations.length === 0) {
      setError('Devi aggiungere almeno una stazione al Tabata.');
      return;
    }

    const newTabata = { ...formData, id: editingTabata ? editingTabata.id : Date.now() };
    if (editingTabata) {
      const updatedTabatas = savedTabatas.map((t) =>
        t.id === newTabata.id ? newTabata : t
      );
      tabataRepo.save(newTabata);
      setSavedTabatas(updatedTabatas);
    } else {
      tabataRepo.save(newTabata);
      setSavedTabatas([...savedTabatas, newTabata]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo Tabata?')) {
      tabataRepo.delete(id);
      setSavedTabatas(savedTabatas.filter((t) => t.id !== id));
    }
  };

  const handleStationChange = (index, value) => {
    const updated = [...stations];
    updated[index].name = value;
    setStations(updated);
  };

  const handleExerciseChange = (stationIndex, exerciseIndex, newValue) => {
    const exercise = availableExercises.find((e) => e.name === newValue);
    const updated = [...stations];
    updated[stationIndex].exercises[exerciseIndex] = {
      name: newValue || '',
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

  const removeStation = (stationIndex) => {
    if (stations.length <= 1) {
      return;
    }
    const updatedStations = stations.filter((_, index) => index !== stationIndex);
    setStations(updatedStations);
  };

  function enrichExerciseByName(name) {
    const match = availableExercises.find((e) => e.name === name);
    return {
      name,
      gif: match?.gif || '',
    };
  }

  const handleAddStation = (exercise) => {
    setFormData((prev) => ({
      ...prev,
      stations: [...prev.stations, { id: Date.now() + Math.random(), name: exercise.name, exercises: [exercise] }],
    }));
  };

  const handleRemoveStation = (id) => {
    setFormData((prev) => ({
      ...prev,
      stations: prev.stations.filter((station) => station.id !== id),
    }));
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(stations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStations(items);
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
            <ListItem
              key={t.id}
              disablePadding
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Crea il tuo allenamento Tabata
            </Typography>
          </Box>

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
            Stazioni: (trascina per riordinare)
          </Typography>

          <Grid
            container
            spacing={2}
            justifyContent="center"
          >
            {stations.map((station, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    backgroundColor: 'background.paper',
                    width: '100%',
                    position: 'relative',
                    minWidth: '320px',
                    p: 0,
                  }}
                >
                  {/* Header Section */}
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.03)',
                      borderBottom: (theme) => `1px solid ${
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)'
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TextField
                        size="small"
                        value={station.name}
                        onChange={(e) => handleStationChange(index, e.target.value)}
                        sx={{
                          '& .MuiInputBase-root': {
                            backgroundColor: 'background.paper',
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => removeStation(index)}
                        disabled={stations.length <= 1}
                        size="small"
                        sx={{
                          color: stations.length <= 1 ? 'action.disabled' : 'error.main',
                          '&:hover': {
                            backgroundColor: stations.length <= 1 ? 'transparent' : 'error.dark',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Exercises Section */}
                  <Box sx={{ p: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 2,
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      Esercizi:
                    </Typography>
                    {station.exercises.map((ex, eIndex) => (
                      <Box 
                        key={eIndex} 
                        display="flex" 
                        alignItems="center" 
                        gap={1} 
                        mb={1}
                      >
                        <FormControl sx={{ width: 300 }}>
                          <Autocomplete
                            value={ex.name}
                            onChange={(event, newValue) => 
                              handleExerciseChange(index, eIndex, newValue)
                            }
                            options={availableExercises.map(option => option.name)}
                            renderInput={(params) => (
                              <TextField 
                                {...params} 
                                label="Cerca esercizio"
                                placeholder="Digita per cercare..."
                                size="small"
                              />
                            )}
                            freeSolo
                            autoSelect
                            blurOnSelect
                            openOnFocus
                            selectOnFocus
                            clearOnBlur={false}
                            sx={{ width: '100%' }}
                          />
                        </FormControl>
                        <IconButton
                          aria-label="rimuovi"
                          onClick={() => removeExerciseFromStation(index, eIndex)}
                          disabled={station.exercises.length <= 1}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => addExerciseToStation(index)}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      + Aggiungi esercizio
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Button onClick={addStation} sx={{ mt: 3 }} variant="outlined">
            + Aggiungi Stazione
          </Button>

          <Box mt={4} display="flex" gap={2} justifyContent="center">
            <Button onClick={() => handleOpenDialog()} variant="outlined">
              + Nuovo Tabata
            </Button>
            <Button onClick={handleStart} variant="contained" color="primary">
              Avvia Tabata
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingTabata ? 'Modifica Tabata' : 'Nuovo Tabata'}
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            fullWidth
            label="Nome Tabata"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Rounds"
                type="number"
                value={formData.rounds}
                onChange={(e) => setFormData({ ...formData, rounds: parseInt(e.target.value) })}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Lavoro (s)"
                type="number"
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: parseInt(e.target.value) })}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Riposo (s)"
                type="number"
                value={formData.rest}
                onChange={(e) => setFormData({ ...formData, rest: parseInt(e.target.value) })}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Stazioni del Tabata
          </Typography>
          <Box sx={{ border: '1px solid #333', borderRadius: 1, p: 2, mb: 2 }}>
            {formData.stations.length === 0 ? (
              <Typography variant="body2" color="text.secondary" align="center">Nessuna stazione aggiunta.</Typography>
            ) : (
              formData.stations.map((station, index) => (
                <Box key={station.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: index < formData.stations.length - 1 ? '1px solid #444' : 'none' }}>
                  <Typography>{station.name}</Typography>
                  <IconButton color="error" onClick={() => handleRemoveStation(station.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Esercizi Disponibili
          </Typography>
          <Grid container spacing={1}>
            {availableExercises.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" align="center">Nessun esercizio disponibile. Aggiungine dalla sezione Esercizi.</Typography>
              </Grid>
            ) : (
              availableExercises.map((exercise) => (
                <Grid item xs={6} sm={4} md={3} key={exercise.id}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleAddStation(exercise)}
                    sx={{ mb: 1 }}
                  >
                    {exercise.name}
                  </Button>
                </Grid>
              ))
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annulla</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTabata ? 'Salva' : 'Crea Tabata'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TabataDashboard;
