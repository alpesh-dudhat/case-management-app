import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    textTransform: 'none',
  },
  palette: {
    text: {
      primary: 'rgba(46, 59, 82, 1)',
    },
  },
  mixins: {
    MuiDataGrid: {
      // pinnedBackground: '#f4f7fc',
      containerBackground: '#f4f7fc',
    },
  },
  overrides: {
    // Style sheet name
    MuiTouchRipple: {
      // Name of the rule
      child: {
        // Some CSS
        backgroundColor: "red"
      }
    }
  } 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
