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
            >
              {stations.map((station, index) => {
                const currentExercise = station.exercises[currentRound % station.exercises.length];
                
                return (
                  <Grid item xs={12} sm={stations.length > 4 ? 6 : 12} key={index}>
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
                            p: 2,
                            borderRadius: 2,
                            boxShadow: snapshot.isDragging ? 6 : 3,
                            backgroundColor: snapshot.isDragging ? '#3a3a3a' : '#2a2a2a',
                            color: 'white',
                            transition: 'background-color 0.2s, box-shadow 0.2s',
                            width: '100%',
                            minWidth: '320px',
                            position: 'relative',
                          }}
                        >
                          <Box
                            {...provided.dragHandleProps}
                            sx={{
                              position: 'absolute',
                              left: 8,
                              top: 8,
                              cursor: 'grab',
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&:hover': {
                                color: 'white',
                              },
                            }}
                          >
                            <DragIndicatorIcon />
                          </Box>
                          
                          <Box sx={{ pl: 4 }}>
                            <Typography variant="h6">
                              {station.name}
                            </Typography>
                            
                            <Typography variant="subtitle1" gutterBottom>
                              {currentExercise?.name || 'Esercizio'}
                            </Typography>
                            
                            {currentExercise?.gif && (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  overflow: 'hidden',
                                  borderRadius: 2,
                                  mt: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: '#1a1a1a',
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
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
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
