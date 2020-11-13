import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ( () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/search/cats'>cats</NavLink></li>
                <li><NavLink to='/search/dogs'>dogs</NavLink></li>
                <li><NavLink to='/search/tacos'>tacos</NavLink></li>
            </ul>
        </nav>
    );
});


export default Nav;