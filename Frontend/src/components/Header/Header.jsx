import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import loginIcon from '../../assets/login-icon.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="storybook-header">
      {/* Login icon or Logout button */}
      <div className="login-wrapper">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="login-link">
            <img src={loginIcon} alt="Login" className="login-icon" />
          </NavLink>
        )}
      </div>

      <div className="header-title">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <h1>📖 Interactive StoryBook</h1>
      </div>

      {/* Desktop navigation */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
          <li><NavLink to="/storybook" className={({ isActive }) => isActive ? 'active-link' : ''}>StoryBook</NavLink></li>
          <li><NavLink to="/create-story" className={({ isActive }) => isActive ? 'active-link' : ''}>Create Your Story</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => isActive ? 'active-link' : ''}>Feedback</NavLink></li>

        </ul>
      </nav>

      {/* Mobile menu */}
      <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links" onClick={closeMenu}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
          <li><NavLink to="/storybook" className={({ isActive }) => isActive ? 'active-link' : ''}>StoryBook</NavLink></li>
          <li><NavLink to="/create-story" className={({ isActive }) => isActive ? 'active-link' : ''}>Create Your Story</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => isActive ? 'active-link' : ''}>Feedback</NavLink></li>

          <li>
            {isLoggedIn ? (
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link login-link' : 'login-link'}>Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
