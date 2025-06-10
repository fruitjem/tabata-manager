import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExerciseRepository from '../repositories/ExerciseRepository';

const repo = new ExerciseRepository();

function ExerciseManagement({ onBack }) {
  const [exercises, setExercises] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gif: '',
  });

  useEffect(() => {
    const loadExercises = async () => {
      const loadedExercises = await repo.getAll();
      setExercises(loadedExercises);
      console.log('ExerciseManagement - Initial exercises loaded:', loadedExercises);
    };
    loadExercises();
  }, []);

  const handleOpenDialog = (exercise = null) => {
    if (exercise) {
      setEditingExercise(exercise);
      setFormData({ name: exercise.name, gif: exercise.gif });
    } else {
      setEditingExercise(null);
      setFormData({ name: '', gif: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingExercise(null);
    setFormData({ name: '', gif: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name) return;

    if (editingExercise) {
      await repo.update(editingExercise.id, formData);
    } else {
      await repo.save(formData);
    }

    const updatedExercises = await repo.getAll();
    console.log('handleSubmit - Type of updatedExercises before setting state:', typeof updatedExercises, updatedExercises);
    setExercises(updatedExercises);
    handleCloseDialog();
  };

  const handleDelete = async (id) => {
    console.log('handleDelete called for ID:', id);
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo esercizio?');
    console.log('Confirmation:', confirmed);
    if (confirmed) {
      console.log('Exercises BEFORE deletion (from state):', exercises);
      
      await repo.delete(id); 
      console.log('Exercises AFTER repo.delete (might not be updated yet):', repo.getAllRaw());
      
      const updated = await repo.getAll(); 
      console.log('handleDelete - Type of updated before setting state:', typeof updated, updated);

      setExercises(updated);
      console.log('State set to updated exercises.');
    }
  };

  const renderGifPreview = (gif) => {
    if (!gif) return null;

    // Se è un URL base64
    if (gif.startsWith('data:image')) {
      return (
        <CardMedia
          component="img"
          image={gif}
          alt="Exercise preview"
          sx={{
            height: 200,
            objectFit: 'cover',
            backgroundColor: '#1a1a1a',
          }}
        />
      );
    }

    // Se è un URL remoto
    if (gif.startsWith('http')) {
      return (
        <CardMedia
          component="img"
          image={gif}
          alt="Exercise preview"
          sx={{
            height: 200,
            objectFit: 'cover',
            backgroundColor: '#1a1a1a',
          }}
        />
      );
    }

    // Se è un percorso locale
    return (
      <CardMedia
        component="img"
        image={gif}
        alt="Exercise preview"
        sx={{
          height: 200,
          objectFit: 'cover',
          backgroundColor: '#1a1a1a',
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Gestione Esercizi
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 4 }}
      >
        + Nuovo Esercizio
      </Button>

      <Grid container spacing={3}>
        {console.log('ExerciseManagement - Mapping exercises (type, content):', typeof exercises, exercises)}
        {Array.isArray(exercises) ? (
          exercises.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                Non ci sono esercizi disponibili. Crea il primo!
              </Typography>
            </Grid>
          ) : (
            exercises.map((exercise) => {
              console.log('Rendering exercise:', exercise);
              return (
                <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {exercise.name}
                      </Typography>
                      {renderGifPreview(exercise.gif)}
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => handleOpenDialog(exercise)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(exercise.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ mt: 4, color: 'error.main' }}>
              Caricamento esercizi...
            </Typography>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingExercise ? 'Modifica Esercizio' : 'Nuovo Esercizio'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nome Esercizio"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL GIF"
              value={formData.gif}
              onChange={(e) => setFormData({ ...formData, gif: e.target.value })}
              helperText="Inserisci l'URL dell'immagine GIF dell'esercizio"
            />
            {formData.gif && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Anteprima:
                </Typography>
                {renderGifPreview(formData.gif)}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annulla</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingExercise ? 'Salva' : 'Aggiungi'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ExerciseManagement; 