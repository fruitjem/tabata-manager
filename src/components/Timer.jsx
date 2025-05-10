// Timer.jsx - aggiornato con MUI

import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const beep = new Audio('/beep.mp3');

function Timer({ totalRounds, work, rest, onRoundChange }) {
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(work);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [preparing, setPreparing] = useState(true);
  const [prepTimeLeft, setPrepTimeLeft] = useState(3);

  const [elapsedTime, setElapsedTime] = useState(0);
  const totalDuration = (work + rest) * totalRounds;

  useEffect(() => {
    if (!isRunning || !preparing) return;

    const prepInterval = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(prepInterval);
          setPreparing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(prepInterval);
  }, [isRunning, preparing]);

  useEffect(() => {
    if (!isRunning || preparing) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          beep.play();

          if (!isWorkPhase) {
            const nextRound = round + 1;
            if (nextRound >= totalRounds) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            setRound(nextRound);
          }

          setIsWorkPhase(!isWorkPhase);
          return isWorkPhase ? rest : work;
        }
        return prev - 1;
      });

      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, preparing, round, isWorkPhase]);

  useEffect(() => {
    onRoundChange(round);
  }, [round]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRound(0);
    setIsWorkPhase(true);
    setTimeLeft(work);
    setPreparing(true);
    setPrepTimeLeft(3);
    setElapsedTime(0);
    onRoundChange(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const progress = Math.min((elapsedTime / totalDuration) * 100, 100);
  const phaseColor = isWorkPhase ? 'success' : 'info';

  return (
    <Box textAlign="center" mb={4}>
      <Typography variant="h5" gutterBottom>
        Round {round + 1} / {totalRounds}
      </Typography>
      <Typography variant="subtitle1">
        Durata totale: {formatTime(totalDuration)} | Trascorso: {formatTime(elapsedTime)}
      </Typography>

      <Box my={2}>
        <LinearProgress variant="determinate" value={progress} color={phaseColor} sx={{ height: 10, borderRadius: 2 }} />
      </Box>

      {preparing ? (
        <Typography variant="h3" color="warning.main">PREPARATI: {prepTimeLeft}</Typography>
      ) : (
        <Typography variant="h4" color={isWorkPhase ? 'success.main' : 'info.main'}>
          {isWorkPhase ? 'Esercizio' : 'Pausa'}: {timeLeft}s
        </Typography>
      )}

      <Box mt={2}>
        <Button variant="contained" color={isRunning ? 'warning' : 'success'} onClick={handleStartPause}>
          {isRunning ? 'Pausa ⏸️' : 'Start ▶️'}
        </Button>
        <Button variant="outlined" color="error" onClick={handleReset} sx={{ ml: 2 }}>
          Reset 🔁
        </Button>
      </Box>
    </Box>
  );
}

export default Timer;
