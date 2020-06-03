/**
 * @file: routes.tsx
 * @author: Paulo Alves
 * @description: responsável pelas configurações das rotas no frontend.
 * @version 1.0.1 (03/06/2020)
 */

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

/**
 * @description responsável pelas atribuições das rotas.
 */
const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
}

export default Routes;