// WorkoutScreen.jsx - mostra solo l'esercizio corrente per stazione

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Timer from './Timer';

function WorkoutScreen({ stations: initialStations, rounds, work, rest, onBack }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);
  const [stations, setStations] = useState(initialStations);

  const getGifPath = (gifPath) => {
    if (!gifPath) return '';
    
    // Se è un URL base64 o http, usalo direttamente
    if (gifPath.startsWith('data:image') || gifPath.startsWith('http')) {
      return gifPath;
    }
    
    // Se è un percorso locale, aggiungi il prefisso corretto
    const isDev = import.meta.env.MODE === 'development';
    return isDev ? `/${gifPath}` : `./${gifPath}`;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(stations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStations(items);
  };

  // Calculate number of cards per row based on total stations
  const shouldSplitInTwoRows = stations.length > 4;
  const cardsPerRow = shouldSplitInTwoRows ? Math.ceil(stations.length / 2) : stations.length;

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        pt: 2,
      }}
    >
      <IconButton 
        onClick={onBack}
        sx={{
          position: 'absolute',
          left: 16,
          top: 16,
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(0, 200, 83, 0.08)',
          }
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
        <Timer
          rounds={rounds}
          work={work}
          rest={rest}
          stations={stations}
          onRoundChange={setCurrentRound}
          onStationChange={setCurrentStation}
        />
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="workout-stations">
          {(provided) => (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              {stations.map((station, index) => {
                const currentExercise = station.exercises[currentRound % station.exercises.length];
                
                return (
                  <Grid item key={index}>
                    <Draggable
                      key={`station-${index}`}
                      draggableId={`station-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            width: 280,
                            height: 350,
                            p: 2,
                            borderRadius: 2,
                            boxShadow: snapshot.isDragging ? 6 : 3,
                            backgroundColor: snapshot.isDragging ? '#3a3a3a' : '#2a2a2a',
                            color: 'white',
                            transition: 'background-color 0.2s, box-shadow 0.2s',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box {...provided.dragHandleProps} sx={{ cursor: 'grab', color: 'rgba(46, 204, 113, 0.8)', display: 'flex', alignItems: 'center' }}>
                              <DragIndicatorIcon sx={{ fontSize: 22, mt: '2px' }} />
                            </Box>
                            <Typography
                              variant="h6"
                              noWrap
                              sx={{
                                color: 'success.main',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                flex: 1,
                              }}
                            >
                              {station.name}
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            noWrap
                            sx={{
                              mb: 2,
                              fontWeight: 700,
                              color: 'white',
                            }}
                          >
                            {currentExercise?.name || 'Esercizio'}
                          </Typography>
                          {currentExercise?.gif && (
                            <Box
                              sx={{
                                width: '100%',
                                height: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                borderRadius: 2,
                                backgroundColor: '#1a1a1a',
                                mt: 1,
                              }}
                            >
                              <img
                                src={getGifPath(currentExercise.gif)}
                                alt={currentExercise.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  display: 'block',
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Draggable>
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default WorkoutScreen;
