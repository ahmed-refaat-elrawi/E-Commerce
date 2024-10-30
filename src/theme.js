// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Primary color
    },
    secondary: {
      main: '#dc004e',  // Secondary color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    // Customize other typography elements
  },
  spacing: 8,  // Default spacing unit
  // Add other customizations like shape, zIndex, breakpoints, etc.
});

export default theme;
