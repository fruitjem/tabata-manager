// WorkoutScreen.jsx - mostra solo l'esercizio corrente per stazione

import { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Timer from './Timer';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors'; // Importa il colore blu
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';

function WorkoutScreen({ stations: initialStations, rounds, work, rest, onBack }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);
  const [stations, setStations] = useState(initialStations);
  const theme = useTheme();

  // Stato del Timer spostato da Timer.jsx a WorkoutScreen.jsx
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(work);
  const [elapsed, setElapsed] = useState(0);
  const [preparing, setPreparing] = useState(true);
  const [prepTime, setPrepTime] = useState(10); // 10 seconds preparation time
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const beepRef = useRef(new Audio('./sounds/beep.mp3'));

  const playBeep = () => {
    beepRef.current.currentTime = 0; // Reset audio to start
    beepRef.current.play().catch(error => console.log('Error playing sound:', error));
  };

  // Calculate total duration moved from Timer.jsx
  const totalStations = stations.length;
  const totalWorkoutDuration = Number(rounds) * Number(totalStations) * (Number(work) + Number(rest));
  const totalDurationWithPrep = totalWorkoutDuration + 10; // +10s prep time for Tabata

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }
    return `${seconds}s`;
  };

  const totalWorkTime = Number(rounds) * Number(totalStations) * Number(work);
  const totalRestTime = Number(rounds) * Number(totalStations) * Number(rest);

  const maxBarWidth = 75; // Dimezzato da 150 a 75
  const workBarWidth = (totalWorkTime / totalWorkoutDuration) * maxBarWidth;
  const restBarWidth = (totalRestTime / totalWorkoutDuration) * maxBarWidth;

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setIsWorkTime(true);
    setTimeLeft(work);
    setCurrentRound(0);
    setCurrentStation(0);
    setElapsed(0);
    setPreparing(true);
    setPrepTime(10);
    setCurrentRound(0);
    setCurrentStation(0);
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    playBeep(); // Play beep when starting preparation
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  // Main timing useEffect moved from Timer.jsx
  useEffect(() => {
    if (!isRunning) return;

    if (preparing) {
      timerRef.current = setInterval(() => {
        setPrepTime((prev) => {
          const newPrepTime = prev - 1;
          setElapsed((e) => e + 1); // Incrementa elapsed anche durante la preparazione
          if (newPrepTime <= 0) {
            clearInterval(timerRef.current);
            setPreparing(false);
            playBeep(); // Play beep when preparation ends
            return 0;
          }
          if (newPrepTime <= 3) { // Play beep for last 3 seconds
            playBeep();
          }
          return newPrepTime;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }

    // Regular timer logic
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setElapsed((e) => e + 1); // Incrementa elapsed alla fine della fase
          playBeep(); // Play beep on transition

          if (isWorkTime) {
            setIsWorkTime(false);
            return rest;
          } else {
            setIsWorkTime(true);
            // Tabata mode logic
            const nextRound = currentRound + 1;
            if (nextRound >= rounds) {
              const nextStation = currentStation + 1;
              if (nextStation >= totalStations) {
                // Timer complete
                console.log('Workout complete - Final Elapsed:', elapsed + 1, 'Total Duration (with prep):', totalDurationWithPrep);
                setTimeout(() => {
                  clearInterval(timerRef.current);
                  setIsRunning(false);
                  setIsPaused(false);
                  // onComplete?.(); // Commentato perché onComplete non è gestito qui
                  alert('Workout Completed!'); // Placeholder for completion
                }, 0);
                return 0;
              } else {
                setCurrentStation(nextStation);
                setCurrentRound(0);
                setCurrentStation(nextStation);
                setCurrentRound(0);
                return work;
              }
            } else {
              setCurrentRound(nextRound);
              setCurrentRound(nextRound);
              return work;
            }
          }
        }

        setElapsed((e) => e + 1); // Incrementa elapsed per ogni secondo
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, preparing, isWorkTime, currentRound, currentStation, rounds, totalStations, work, rest, elapsed, totalDurationWithPrep]);

  // Preload audio and cleanup (moved from Timer.jsx)
  useEffect(() => {
    setCurrentRound(0);
    setCurrentStation(0);
    
    beepRef.current.load();
    
    return () => {
      beepRef.current.pause();
      beepRef.current = null;
    };
  }, []);

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

      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 1200,
          mx: 'auto', 
          mb: 4,
          gap: { xs: 2, md: 2 },
        }}
      >
        {/* Nuovo Box che conterrà tutti gli elementi del widget del timer con sfondo blu */}
        <Box 
          sx={{
            width: '100%',
            backgroundColor: theme.palette.background.default,
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {preparing ? (
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: 2,
                p: 3,
                my: 2,
                width: '100%', 
                textAlign: 'center',
              }}
            >
              <Typography variant="h4">PREPARATI!</Typography>
              <Typography variant="h2">{prepTime}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
              }}
            >
              <Timer
                work={work}
                rest={rest}
                currentRound={currentRound}
                timeLeft={timeLeft}
                isWorkTime={isWorkTime}
                elapsed={elapsed}
                totalDurationWithPrep={totalDurationWithPrep}
                preparing={preparing}
                prepTime={prepTime}
              />
              {stations[currentStation]?.gifUrl && (
                <Box
                  component="img"
                  src={getGifPath(stations[currentStation].gifUrl)}
                  alt={stations[currentStation].name}
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    height: 'auto',
                    borderRadius: 2,
                    mt: 2,
                  }}
                />
              )}
            </Box>
          )}
          {/* Controllo dei pulsanti del timer */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {!isRunning && !isPaused && (
              <IconButton 
                color="primary" 
                onClick={startTimer} 
                size="large"
                sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                <PlayArrowIcon />
              </IconButton>
            )}
            {isRunning && (
              <IconButton 
                color="secondary" 
                onClick={pauseTimer} 
                size="large"
                sx={{ backgroundColor: 'secondary.main', color: 'white', '&:hover': { backgroundColor: 'secondary.dark' } }}
              >
                <PauseIcon />
              </IconButton>
            )}
            {isPaused && (
              <IconButton 
                color="primary" 
                onClick={startTimer} 
                size="large"
                sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                <PlayArrowIcon />
              </IconButton>
            )}
            {(isRunning || isPaused) && (
              <IconButton 
                color="info" 
                onClick={resetTimer} 
                size="large"
                sx={{ backgroundColor: 'info.main', color: 'white', '&:hover': { backgroundColor: 'info.dark' } }}
              >
                <ReplayIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Legenda (posizionata in alto a destra) */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: maxBarWidth, height: 10, borderRadius: '5px', backgroundColor: 'white' }} />
            <Typography variant="body2">Workout Totale: {formatTime(totalWorkoutDuration)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: workBarWidth, height: 10, borderRadius: '5px', backgroundColor: 'success.main' }} />
            <Typography variant="body2">Lavoro: {formatTime(work)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: restBarWidth, height: 10, borderRadius: '5px', backgroundColor: 'warning.main' }} />
            <Typography variant="body2">Riposo: {formatTime(rest)}</Typography>
          </Box>
          {/* Informazioni stazione e tempo rimanente */}
          <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.secondary.main, // Usiamo il blu del pulsante PAUSA
                fontWeight: 'bold',
                mb: 1
              }}
            >
              Stazione: {stations[currentStation]?.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography 
                variant="body1" 
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 'medium',
                }}
              >
                Tempo Rimanente:
              </Typography>
              <Typography 
                variant="h4" 
                sx={{
                  color: isWorkTime ? 'success.main' : 'warning.main',
                  fontWeight: 'bold',
                }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
          </Box>
        </Box>
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
                // Ensure currentExercise is valid before accessing its properties
                const safeCurrentStation = stations[currentStation];
                const currentExercise = safeCurrentStation?.exercises[currentRound % safeCurrentStation.exercises.length];

                const isCurrent = index === currentStation; // Evidenzia la stazione corrente
                
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
                            backgroundColor: isCurrent ? '#4a4a4a' : snapshot.isDragging ? '#3a3a3a' : '#2a2a2a', // Evidenzia la stazione corrente
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
