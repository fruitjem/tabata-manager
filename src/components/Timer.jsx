// Timer.jsx - formato MM:SS.CC con etichette H M S

import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const beep = new Audio('/beep.mp3');

function Timer({ totalRounds, work, rest, onRoundChange }) {
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(work * 1000); // in ms
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
        if (prev <= 10) {
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
          return isWorkPhase ? rest * 1000 : work * 1000;
        }
        return prev - 10;
      });

      setElapsedTime((prev) => prev + 10);
    }, 10);

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
    setTimeLeft(work * 1000);
    setPreparing(true);
    setPrepTimeLeft(3);
    setElapsedTime(0);
    onRoundChange(0);
  };

  const formatTimeParts = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return { minutes, seconds, centis };
  };

  const { minutes, seconds, centis } = formatTimeParts(timeLeft);

  const progress = Math.min((elapsedTime / (totalDuration * 1000)) * 100, 100);
  const phaseColor = isWorkPhase ? 'success' : 'info';

  return (
    <Box textAlign="center" mb={4}>
      <Typography variant="h5" gutterBottom>
        Round {round + 1} / {totalRounds}
      </Typography>
      <Typography variant="subtitle1">
        Durata totale: {Math.floor(totalDuration / 60)}m {totalDuration % 60}s |
        Trascorso: {Math.floor((elapsedTime / 1000) / 60)}m {Math.floor((elapsedTime / 1000) % 60)}s
      </Typography>

      <Box my={2}>
        <LinearProgress variant="determinate" value={progress} color={phaseColor} sx={{ height: 10, borderRadius: 2 }} />
      </Box>

      <Box sx={{
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        px: 4,
        py: 2,
        my: 2,
        display: 'inline-block'
      }}>
        <Typography variant="h2" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
          {minutes}:{seconds}.{centis}
        </Typography>
        <Typography variant="caption" display="block" sx={{ color: '#aaa', mt: 1 }}>
          HH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SS
        </Typography>
      </Box>

      {preparing && (
        <Typography variant="h4" color="warning.main">
          PREPARATI: {prepTimeLeft}
        </Typography>
      )}

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color={isRunning ? 'warning' : 'success'} onClick={handleStartPause}>
          {isRunning ? 'Pausa' : 'Start'}
        </Button>
        <Button variant="outlined" color="error" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Timer;