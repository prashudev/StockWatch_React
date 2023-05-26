import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Root rendering React in StrictMode, ChakraProvider, and an app
root.render(
  <React.StrictMode>
    <ChakraProvider>  
        <App />
        </ChakraProvider>
  </React.StrictMode>
);


