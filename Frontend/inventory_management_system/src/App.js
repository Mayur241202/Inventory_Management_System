import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchHandler, setSearchHandler] = useState(() => {});
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  // Re-check auth on location change
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setSearchHandler(() => {});
  };

  // Determine if search should be shown (only on /products page)
  const showSearch = location.pathname === '/products';

  // Check if we should show navbar (hide on login/signup)
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar onSearch={searchHandler} showSearch={showSearch} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
        <Route path="/signup" element={<Signup onSignupSuccess={() => setIsAuthenticated(true)} />} />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <Products onSetSearchHandler={setSearchHandler} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/insertproduct" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <InsertProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/updateproduct/:id" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <UpdateProduct />
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
