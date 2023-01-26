import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return ( 
        <nav className='navbar'>
            <ul className='navbar-buttons'>
                <li className="navbar-button"><Link to='/'>Store</Link></li>
                <li className='navbar-button'><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
     );
}

export default Navbar;