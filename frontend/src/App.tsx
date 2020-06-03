/**
 * @file: App.tsx
 * @author: Paulo Alves
 * @description: responsável pelo ponto de entrada da aplicação.
 * @version 1.0.1 (03/06/2020)
 */

import React from 'react';
import './App.css';

import Routes from './routes'

/**
 * Responsável pela chamada de componentes de aplicação.
 * @function
 * @name App
 */
function App() {
  
  return (
    <Routes />
  );
}

export default App;