import React, { useState } from 'react';

export default function Navbar({ title, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search Query:', searchQuery); // For debugging
      onSearch(searchQuery); // Pass the query to the parent component
    } else {
      console.log('Please enter a search term.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger shadow-sm">
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
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2 rounded-pill border-0 shadow-sm"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-light text-danger rounded-pill px-4 shadow-sm fw-bold"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
