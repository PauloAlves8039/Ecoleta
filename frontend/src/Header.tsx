/**
 * @file: Header.tsx
 * @author: Paulo Alves
 * @description: responsável pela criação do componente header.
 * @version 1.0.1 (03/06/2020)
 */

import React from 'react';

/**
 * Responsável pelas declarações da propriedades do header. 
 * @interface
 */
interface HeaderProps {
    title: string;
}

/**
 * @description retorna a criação do elemento header.
 * @name Header
 * @param props define a referência das propriedades. 
 */
const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{ props.title }</h1>
        </header>
    );
}

export default Header;