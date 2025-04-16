import React, { useState } from 'react';
import '../components_css/Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src="/img_hero/logo_web.png" style={{width: '22%'}} alt="Logo" /></div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
        <li><Link to="keniarace" smooth={true} duration={500}>Kenia Race</Link></li>
        <li><Link to="sopaletras" smooth={true} duration={500}>Sopa De Letras</Link></li>
        <li><Link to="tetris" smooth={true} duration={500}>Tetris</Link></li>
        <li><Link to="Android" smooth={true} duration={500}>Asteroids</Link></li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
