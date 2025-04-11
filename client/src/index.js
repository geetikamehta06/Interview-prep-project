import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Extend the theme
const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#b3e0ff',
    200: '#80c9ff',
    300: '#4db3ff',
    400: '#1a9cff',
    500: '#0086e6',
    600: '#0068b3',
    700: '#004b80',
    800: '#002d4d',
    900: '#00101a',
  },
  secondary: {
    50: '#f5f0ff',
    100: '#e0d1ff',
    200: '#c7adff',
    300: '#ad89ff',
    400: '#9466ff',
    500: '#7b42ff',
    600: '#6233cc',
    700: '#482599',
    800: '#2f1766',
    900: '#150833',
  },
  success: {
    500: '#48BB78',
  },
  warning: {
    500: '#ECC94B',
  },
  error: {
    500: '#F56565',
  },
};

const fonts = {
  body: 'Poppins, sans-serif',
  heading: 'Poppins, sans-serif',
};

const theme = extendTheme({ colors, fonts });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
); 