import React from 'react';
import { Box, Typography } from '@mui/material';

function CircularProgressIndicator({
  currentValue,
  maxValue,
  label,
  size = 150, // Dimensione del cerchio
  strokeWidth = 10, // Spessore della linea
  progressColor = '#2ecc71', // Colore della parte piena (verde predefinito)
  bgColor = '#3a3a3a', // Colore dello sfondo del cerchio
  textColor = 'white',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentValue / maxValue) * circumference;

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size}>
        {/* Cerchio di sfondo */}
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Cerchio di progresso */}
        <circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Inizia dall'alto
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <Typography variant="caption" sx={{ display: 'block', textTransform: 'uppercase', opacity: 0.8 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {String(currentValue).padStart(2, '0')}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressIndicator; 