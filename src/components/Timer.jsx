// Timer.jsx - fix finale: conteggia correttamente ogni secondo incluso quello finale

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';

function Timer({ rounds, work, rest, stations, onRoundChange, onStationChange, onComplete }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(work);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStation, setCurrentStation] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [preparing, setPreparing] = useState(true);
  const [prepTime, setPrepTime] = useState(10); // 10 seconds preparation time

  const timerRef = useRef(null);
  const beepRef = useRef(new Audio('./sounds/beep.mp3'));

  const playBeep = () => {
    beepRef.current.currentTime = 0; // Reset audio to start
    beepRef.current.play().catch(error => console.log('Error playing sound:', error));
  };

  const totalStations = stations.length;
  const totalDuration =
    Number(rounds) * Number(totalStations) * (Number(work) + Number(rest));

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsWorkTime(true);
    setTimeLeft(work);
    setCurrentRound(0);
    setCurrentStation(0);
    setElapsed(0);
    setPreparing(true);
    setPrepTime(10);
    onRoundChange(0);
    onStationChange(0);
  };

  const startTimer = () => {
    setIsRunning(true);
    playBeep(); // Play beep when starting preparation
  };

  useEffect(() => {
    if (!isRunning) return;

    if (preparing) {
      // Handle preparation countdown
      timerRef.current = setInterval(() => {
        setPrepTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setPreparing(false);
            playBeep(); // Play beep when preparation ends
            return 0;
          }
          if (prev <= 4) { // Play beep for last 3 seconds
            playBeep();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }

    // Regular Tabata timer logic
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setElapsed((e) => e + 1);
          playBeep(); // Play beep on transition

          if (isWorkTime) {
            setIsWorkTime(false);
            return rest;
          } else {
            setIsWorkTime(true);
            const nextRound = currentRound + 1;
            if (nextRound >= rounds) {
              const nextStation = currentStation + 1;
              if (nextStation >= totalStations) {
                setTimeout(() => {
                  clearInterval(timerRef.current);
                  setIsRunning(false);
                  onComplete?.();
                }, 0);
                return 0;
              } else {
                setCurrentStation(nextStation);
                setCurrentRound(0);
                onStationChange(nextStation);
                onRoundChange(0);
                return work;
              }
            } else {
              setCurrentRound(nextRound);
              onRoundChange(nextRound);
              return work;
            }
          }
        }

        setElapsed((e) => e + 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, preparing, isWorkTime, currentRound, currentStation]);

  useEffect(() => {
    if (!isRunning && !preparing && elapsed < totalDuration) {
      setElapsed(totalDuration);
    }
  }, [isRunning, preparing, elapsed, totalDuration]);

  useEffect(() => {
    onRoundChange(0);
    onStationChange(0);
    
    // Preload the audio
    beepRef.current.load();
    
    // Cleanup
    return () => {
      beepRef.current.pause();
      beepRef.current = null;
    };
  }, []);

  const formatTime = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <Box textAlign="center">
      {preparing && isRunning ? (
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            p: 2,
            my: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            PREPARATI
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }} gutterBottom>
            {formatTime(prepTime)}
          </Typography>
          <Typography variant="h3">{prepTime}</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Stazione {currentStation + 1} / {stations.length} - Round {currentRound + 1} / {rounds}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Durata totale: {formatTime(totalDuration)} | Trascorso: {formatTime(elapsed)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(elapsed / totalDuration) * 100}
            sx={{ height: 10, borderRadius: 5, my: 2 }}
          />
          <Box
            sx={{
              backgroundColor: isWorkTime ? 'green' : 'goldenrod',
              color: 'white',
              borderRadius: 2,
              p: 2,
              my: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {isWorkTime ? 'LAVORO' : 'PAUSA'}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }} gutterBottom>
              {formatTime(timeLeft)}
            </Typography>
            <Typography variant="h3">{timeLeft}</Typography>
          </Box>
        </>
      )}
      <Box sx={{ mt: 2 }}>
        {!isRunning ? (
          <Button variant="contained" onClick={startTimer} sx={{ mr: 2 }}>
            START
          </Button>
        ) : (
          <Button variant="outlined" color="warning" onClick={() => setIsRunning(false)} sx={{ mr: 2 }}>
            PAUSA
          </Button>
        )}
        <Button variant="outlined" color="error" onClick={resetTimer}>
          RESET
        </Button>
      </Box>
    </Box>
  );
}

export default Timer;
