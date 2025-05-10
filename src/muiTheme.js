// muiTheme.js - tema personalizzato per 09K-Tabata

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00c853', // verde brillante per esercizio
    },
    secondary: {
      main: '#2979ff', // blu per pausa
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#e53935',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
