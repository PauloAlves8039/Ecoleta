/**
 * @file: index.tsx
 * @author: Paulo Alves
 * @description: define a renderização dos componentes com o arquivo index.html.
 * @version 1.0.1 (03/06/2020)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);