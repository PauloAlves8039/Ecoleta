/**
 * @file: index.tsx
 * @author: Paulo Alves
 * @description: define a criação da página Home.
 * @version 1.0.1 (03/06/2020)
 */

import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo.svg';

/**
 * @description retorna a criação do elementos da página Home.
 */
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;