import { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import { useTheme } from '@mui/material/styles';

function TimerCronometro({ work: initialWork, rest: initialRest, onComplete }) {
  const theme = useTheme();

  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialWork);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const beepRef = useRef(new Audio('./sounds/beep.mp3'));

  const playBeep = () => {
    beepRef.current.currentTime = 0;
    beepRef.current.play().catch(error => console.log('Error playing sound:', error));
  };

  const formatTime = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setIsWorkTime(true);
    setTimeLeft(initialWork);
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    playBeep();
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playBeep();
          if (isWorkTime) {
            setIsWorkTime(false);
            return initialRest;
          } else {
            setIsWorkTime(true);
            return initialWork; // Cronometro continua indefinitamente
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, isWorkTime, initialWork, initialRest]);

  useEffect(() => {
    beepRef.current.load();
    return () => {
      beepRef.current.pause();
      beepRef.current = null;
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        my: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: isWorkTime ? 'success.main' : 'warning.main',
          color: 'white',
          borderRadius: 2,
          p: 3,
          my: 2,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">
          {isWorkTime ? 'LAVORO' : 'PAUSA'}
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          {formatTime(timeLeft)}
        </Typography>
      </Box>

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
  );
}

export default TimerCronometro; 