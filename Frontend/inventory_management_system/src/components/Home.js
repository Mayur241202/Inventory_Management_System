import React from 'react';

export default function Home() {
  return (
    <div className="container-fluid p-5" style={{ minHeight: '90vh' }}>
      <div className="welcome-section">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold mb-3" style={{ animation: 'fadeInDown 0.8s ease' }}>
            Welcome to the Inventory Management System
          </h1>
          <p className="lead text-secondary fs-4 mb-4">
            Your ultimate solution for seamless inventory management and product tracking
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="/login" className="btn btn-primary btn-lg px-4">
              <i className="fas fa-sign-in-alt me-2"></i>
              Get Started
            </a>
            <a href="/about" className="btn btn-outline-primary btn-lg px-4">
              <i className="fas fa-info-circle me-2"></i>
              Learn More
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="stat-card text-center">
              <div className="mb-3">
                <i className="fas fa-box-open fa-3x" style={{ color: '#6366f1' }}></i>
              </div>
              <h3 className="gradient-text fw-bold">Easy Management</h3>
              <p className="text-secondary">Effortlessly manage your products</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card text-center">
              <div className="mb-3">
                <i className="fas fa-chart-line fa-3x" style={{ color: '#10b981' }}></i>
              </div>
              <h3 className="gradient-text fw-bold">Real-Time Tracking</h3>
              <p className="text-secondary">Monitor inventory in real-time</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card text-center">
              <div className="mb-3">
                <i className="fas fa-mobile-alt fa-3x" style={{ color: '#ec4899' }}></i>
              </div>
              <h3 className="gradient-text fw-bold">Responsive Design</h3>
              <p className="text-secondary">Access anywhere, anytime</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row g-4 mb-4">
          <div className="col-12">
            <h2 className="text-center fw-bold mb-4 gradient-text">Key Features</h2>
          </div>
          <div className="col-md-6">
            <div className="feature-card">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="fas fa-check-circle fa-2x text-success"></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-2">Easy Product Management</h4>
                  <p className="text-secondary mb-0">
                    Quickly add, edit, or remove products with our intuitive interface. 
                    Manage your entire inventory with just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-card">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="fas fa-search fa-2x" style={{ color: '#6366f1' }}></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-2">Advanced Search</h4>
                  <p className="text-secondary mb-0">
                    Find products instantly by name or barcode. Our powerful search 
                    makes inventory management a breeze.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-card">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="fas fa-database fa-2x" style={{ color: '#f59e0b' }}></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-2">Secure Database</h4>
                  <p className="text-secondary mb-0">
                    Your data is safe with MongoDB's robust security. Enjoy peace of 
                    mind with encrypted and reliable storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-card">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="fas fa-bolt fa-2x text-warning"></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-2">Lightning Fast</h4>
                  <p className="text-secondary mb-0">
                    Built with modern MERN stack for optimal performance. Experience 
                    blazing fast load times and smooth interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5 p-4 bg-light rounded-4">
          <h3 className="fw-bold mb-3">Ready to streamline your inventory?</h3>
          <p className="text-secondary mb-4">Join thousands of businesses managing their inventory efficiently</p>
          <a href="/signup" className="btn btn-success btn-lg px-5">
            <i className="fas fa-rocket me-2"></i>
            Start Free Today
          </a>
        </div>
      </div>
    </div>
  );
}