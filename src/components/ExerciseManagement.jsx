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
    setExercises(repo.getAll());
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

  const handleSubmit = () => {
    if (!formData.name) return;

    if (editingExercise) {
      repo.update(editingExercise.id, formData);
    } else {
      repo.save(formData);
    }

    setExercises(repo.getAll());
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo esercizio?');
    if (confirmed) {
      repo.delete(id);
      setExercises(repo.getAll());
    }
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
        {exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exercise.name}
                </Typography>
                {exercise.gif && (
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      overflow: 'hidden',
                      borderRadius: 2,
                      mt: 1,
                      backgroundColor: '#1a1a1a',
                    }}
                  >
                    <img
                      src={exercise.gif}
                      alt={exercise.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}
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
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
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