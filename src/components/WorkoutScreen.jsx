// WorkoutScreen.jsx - pulsanti senza icone

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Timer from './Timer';
import StationList from './StationList';

const stations = [
  {
    name: 'Stazione 1',
    exercises: [
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
    ],
  },
  {
    name: 'Stazione 2',
    exercises: [
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
      { name: 'Push-Up', gif: '/gifs/pushUp.gif' },
    ],
  },
];

function WorkoutScreen() {
  const [currentRound, setCurrentRound] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 4,
      }}
    >
      {!isFullscreen && (
        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={enterFullscreen}>
            Fullscreen
          </Button>
        </Box>
      )}

      <Typography variant="h3" align="center" gutterBottom>
        09K-Tabata
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Timer
          totalRounds={3}
          work={20}
          rest={10}
          onRoundChange={setCurrentRound}
        />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 960, mt: 4 }}>
        <StationList stations={stations} currentRound={currentRound} />
      </Box>
    </Box>
  );
}

export default WorkoutScreen;
