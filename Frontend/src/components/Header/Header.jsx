import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import loginIcon from '../../assets/login-icon.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // read auth info from localStorage and derive display name
  const refreshAuth = () => {
    try {
      const rawAuth = localStorage.getItem('authUser'); // { username, firstName?, lastName? }
      const rawUser = localStorage.getItem('user');      // { email }
      const auth = rawAuth ? JSON.parse(rawAuth) : null;
      const fallback = rawUser ? JSON.parse(rawUser) : null;

      const first = (auth?.firstName || '').trim();
      const last  = (auth?.lastName  || '').trim();
      const email = (auth?.username || fallback?.email || '').trim();

      const name = (first || last) ? `${first} ${last}`.trim() : email;
      setDisplayName(name || null);
      setIsLoggedIn(Boolean(auth || fallback));
    } catch {
      setDisplayName(null);
      setIsLoggedIn(false);
    }
  };

  // refresh on mount and whenever the route changes
  useEffect(() => {
    refreshAuth();
    // also listen to cross-tab changes (optional)
    const onStorage = (e) => {
      if (e.key === 'authUser' || e.key === 'user') refreshAuth();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authUser');
    setIsLoggedIn(false);
    setDisplayName(null);
    navigate('/login');
  };

  return (
    <header className="storybook-header">
      {/* Right-side user area */}
      <div className="login-wrapper">
        {isLoggedIn ? (
          <div className="user-pill">
            {/* You can keep using the same icon as an avatar */}
            <img src={loginIcon} alt="" className="login-icon" />
            {displayName && <span className="user-name" style={{ marginLeft: 8 }}>{displayName}</span>}
            <button className="logout-button" onClick={handleLogout} style={{ marginLeft: 12 }}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="login-link" title="Login">
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
