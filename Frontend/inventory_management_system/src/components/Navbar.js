import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onSearch, showSearch = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check auth on mount and whenever storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (logout in other tabs, etc)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Trigger search on every change, including when empty
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white fs-5 fw-medium px-3 hover-link" href="/">
                My Store
              </a>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white fs-5 fw-medium px-3 hover-link" href="/products">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fs-5 fw-medium px-3 hover-link" href="/about">
                    About
                  </a>
                </li>
              </>
            )}
          </ul>
          
          {/* Show search only on Products page and when authenticated */}
          {isAuthenticated && showSearch && (
            <input
              className="form-control me-3 rounded-pill border-0 shadow-sm"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ maxWidth: '250px' }}
            />
          )}

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white fs-5 fw-medium px-3">
                    Welcome, {user?.username}!
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn text-white fs-5 fw-medium px-3"
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white fs-5 fw-medium px-3 hover-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fs-5 fw-medium px-3 hover-link" href="/signup">
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
