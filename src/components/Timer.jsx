// Timer.jsx - Questo componente è ora specifico per il Tabata

import { Box, Typography } from '@mui/material';

function Timer({
  isWorkTime,
  timeLeft,
  currentRound,
  totalDurationWithPrep,
  elapsed,
  preparing,
  prepTime,
  work,
  rest,
}) {
  const formatTime = (seconds) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const timerSize = 250; // Dimensione complessiva del widget
  const strokeWidthOuter = 10; // Spessore dell'anello esterno (totale)
  const strokeWidthInner = 15; // Spessore dell'anello interno (fase)
  const radiusOuter = (timerSize - strokeWidthOuter) / 2;
  const radiusInner = radiusOuter - strokeWidthOuter - 10; // Spazio tra i due anelli

  const circumferenceOuter = 2 * Math.PI * radiusOuter;
  const circumferenceInner = 2 * Math.PI * radiusInner;

  // Progresso dell'anello esterno (TOTALE)
  const progressOuter = totalDurationWithPrep > 0 ? (elapsed / totalDurationWithPrep) * circumferenceOuter : 0;

  // Progresso dell'anello interno (LAVORO/PAUSA)
  const currentPhaseTotalTime = isWorkTime ? work : rest;
  const progressInner = currentPhaseTotalTime > 0 ? (timeLeft / currentPhaseTotalTime) * circumferenceInner : 0;
  const innerColor = isWorkTime ? '#2ecc71' : 'goldenrod'; // Verde per lavoro, Giallo per pausa
  const outerColor = 'white'; // Colore dell'anello totale (come nell'immagine)
  const outerBgColor = '#3a3a3a'; // Sfondo dell'anello totale

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
      {/* Widget circolare combinato */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={timerSize} height={timerSize}>
          {/* Sfondo cerchio esterno (TOTALE) */}
          <circle
            stroke={outerBgColor}
            fill="transparent"
            strokeWidth={strokeWidthOuter}
            r={radiusOuter}
            cx={timerSize / 2}
            cy={timerSize / 2}
          />
          {/* Cerchio esterno (TOTALE) */}
          {totalDurationWithPrep > 0 && (
            <circle
              stroke={outerColor}
              fill="transparent"
              strokeWidth={strokeWidthOuter}
              r={radiusOuter}
              cx={timerSize / 2}
              cy={timerSize / 2}
              strokeDasharray={circumferenceOuter}
              strokeDashoffset={circumferenceOuter - progressOuter}
              strokeLinecap="round"
              transform={`rotate(-90 ${timerSize / 2} ${timerSize / 2})`}
            />
          )}
          {/* Sfondo cerchio interno (LAVORO/PAUSA) */}
          <circle
            stroke={outerBgColor} // Stesso sfondo del cerchio esterno per coerenza
            fill="transparent"
            strokeWidth={strokeWidthInner}
            r={radiusInner}
            cx={timerSize / 2}
            cy={timerSize / 2}
          />
          {/* Cerchio interno (LAVORO/PAUSA) */}
          <circle
            stroke={innerColor}
            fill="transparent"
            strokeWidth={strokeWidthInner}
            r={radiusInner}
            cx={timerSize / 2}
            cy={timerSize / 2}
            strokeDasharray={circumferenceInner}
            strokeDashoffset={circumferenceInner - progressInner}
            strokeLinecap="round"
            transform={`rotate(-90 ${timerSize / 2} ${timerSize / 2})`}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {preparing ? (
            <Typography variant="h6" sx={{ display: 'block', textTransform: 'uppercase', opacity: 0.8, mb: -1 }}>
              PREPARATI
            </Typography>
          ) : (
            <> 
              <Typography variant="h6" sx={{ display: 'block', textTransform: 'uppercase', opacity: 0.8, mb: -1 }}>
                ROUND
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {String(currentRound + 1).padStart(2, '0')}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Timer;
