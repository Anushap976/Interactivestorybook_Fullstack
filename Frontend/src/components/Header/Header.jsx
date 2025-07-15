import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // State to track whether the mobile/iPad menu is open
  const [menuOpen, setMenuOpen] = useState(false);
// Toggle menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="storybook-header">
      <div className="header-title">
        {/* Hamburger: mobile/iPad only , shown via css @media query*/}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <h1>📖 Interactive StoryBook</h1>
      </div>

      {/* Desktop nav */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
          <li><NavLink to="/storybook" className={({ isActive }) => isActive ? 'active-link' : ''}>StoryBook</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => isActive ? 'active-link' : ''}>Feedback</NavLink></li>
        </ul>
      </nav>

      {/* Mobile/iPad side menu */}
      <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links" onClick={closeMenu}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
          <li><NavLink to="/storybook" className={({ isActive }) => isActive ? 'active-link' : ''}>StoryBook</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => isActive ? 'active-link' : ''}>Feedback</NavLink></li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;
