import React from 'react';

export default function About() {
  return (
    <div className="container-fluid p-5" style={{ minHeight: '90vh' }}>
      <div className="welcome-section">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <div className="mb-4">
            <i className="fas fa-info-circle fa-5x" style={{ color: '#6366f1' }}></i>
          </div>
          <h1 className="display-3 fw-bold mb-3">
            About the Inventory Management System
          </h1>
          <p className="lead text-secondary fs-4 mb-4">
            Discover how our powerful MERN stack solution simplifies inventory management for businesses of all sizes
          </p>
        </div>

        {/* What is IMS Section */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="p-5 bg-gradient rounded-4" style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))' 
            }}>
              <h2 className="fw-bold mb-4 gradient-text">
                <i className="fas fa-question-circle me-3"></i>
                What is the Inventory Management System?
              </h2>
              <p className="fs-5 text-secondary mb-0 lh-lg">
                The Inventory Management System (IMS) is a cutting-edge, full-stack web application designed to 
                help businesses manage their inventory seamlessly. Built with modern technologies and best practices, 
                IMS eliminates the complexities of traditional inventory systems with its intuitive interface and 
                robust backend. From tracking products to updating stock levels in real-time, IMS makes inventory 
                management effortless and efficient for small businesses, startups, and growing enterprises.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mb-5">
          <h2 className="text-center fw-bold mb-4 gradient-text">
            <i className="fas fa-code me-3"></i>
            Technology Stack
          </h2>
          <p className="text-center text-secondary fs-5 mb-5">
            Built with industry-leading technologies for optimal performance and scalability
          </p>
          
          <div className="row g-4">
            {/* MongoDB */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card text-center">
                <div className="mb-3">
                  <i className="fas fa-database fa-3x" style={{ color: '#47A248' }}></i>
                </div>
                <h4 className="fw-bold mb-3">MongoDB</h4>
                <p className="text-secondary mb-0">
                  NoSQL database for efficient and scalable data storage with lightning-fast queries
                </p>
              </div>
            </div>

            {/* Express.js */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card text-center">
                <div className="mb-3">
                  <i className="fas fa-server fa-3x" style={{ color: '#000000' }}></i>
                </div>
                <h4 className="fw-bold mb-3">Express.js</h4>
                <p className="text-secondary mb-0">
                  Minimal and flexible Node.js framework for building robust REST APIs
                </p>
              </div>
            </div>

            {/* React.js */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card text-center">
                <div className="mb-3">
                  <i className="fab fa-react fa-3x" style={{ color: '#61DAFB' }}></i>
                </div>
                <h4 className="fw-bold mb-3">React.js</h4>
                <p className="text-secondary mb-0">
                  Modern JavaScript library for building dynamic and interactive user interfaces
                </p>
              </div>
            </div>

            {/* Node.js */}
            <div className="col-md-6 col-lg-3">
              <div className="feature-card text-center">
                <div className="mb-3">
                  <i className="fab fa-node-js fa-3x" style={{ color: '#339933' }}></i>
                </div>
                <h4 className="fw-bold mb-3">Node.js</h4>
                <p className="text-secondary mb-0">
                  JavaScript runtime for fast, scalable server-side applications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-5">
          <h2 className="text-center fw-bold mb-4 gradient-text">
            <i className="fas fa-star me-3"></i>
            Key Features & Benefits
          </h2>
          
          <div className="row g-4">
            <div className="col-md-6">
              <div className="feature-card h-100">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      <i className="fas fa-tachometer-alt fa-2x text-white"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-2">Real-Time Updates</h4>
                    <p className="text-secondary mb-0">
                      Track inventory changes instantly with real-time synchronization. 
                      Never miss a stock update with our responsive system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="feature-card h-100">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                      <i className="fas fa-user-friends fa-2x text-white"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-2">User-Friendly Interface</h4>
                    <p className="text-secondary mb-0">
                      Intuitive design that requires minimal training. 
                      Manage your inventory efficiently regardless of technical expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="feature-card h-100">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                      <i className="fas fa-shield-alt fa-2x text-white"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-2">Secure & Reliable</h4>
                    <p className="text-secondary mb-0">
                      Enterprise-grade security with authentication and authorization. 
                      Your data is protected with industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="feature-card h-100">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
                      <i className="fas fa-mobile-alt fa-2x text-white"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-2">Fully Responsive</h4>
                    <p className="text-secondary mb-0">
                      Access your inventory from any device - desktop, tablet, or mobile. 
                      Seamless experience across all screen sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Benefit Section */}
        <div className="mb-5">
          <h2 className="text-center fw-bold mb-4 gradient-text">
            <i className="fas fa-users me-3"></i>
            Who Can Benefit?
          </h2>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="stat-card text-center h-100">
                <div className="mb-3">
                  <i className="fas fa-store fa-3x" style={{ color: '#6366f1' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Small Businesses</h5>
                <p className="text-secondary mb-0">
                  Manage inventory with ease and affordability
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="stat-card text-center h-100">
                <div className="mb-3">
                  <i className="fas fa-warehouse fa-3x" style={{ color: '#10b981' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Warehouses</h5>
                <p className="text-secondary mb-0">
                  Track stock levels and ensure timely reordering
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="stat-card text-center h-100">
                <div className="mb-3">
                  <i className="fas fa-shopping-cart fa-3x" style={{ color: '#f59e0b' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Retail Stores</h5>
                <p className="text-secondary mb-0">
                  Monitor products across multiple locations
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="stat-card text-center h-100">
                <div className="mb-3">
                  <i className="fas fa-rocket fa-3x" style={{ color: '#ec4899' }}></i>
                </div>
                <h5 className="fw-bold mb-2">Startups</h5>
                <p className="text-secondary mb-0">
                  Scale operations with precision management
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="p-5 rounded-4" style={{ 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))' 
        }}>
          <div className="row align-items-center">
            <div className="col-lg-3 text-center mb-4 mb-lg-0">
              <i className="fas fa-award fa-5x" style={{ color: '#6366f1' }}></i>
            </div>
            <div className="col-lg-9">
              <h2 className="fw-bold mb-3 gradient-text">
                Why Choose This System?
              </h2>
              <p className="fs-5 text-secondary mb-3 lh-lg">
                The Inventory Management System is designed with simplicity, scalability, and reliability in mind. 
                Its intuitive interface ensures anyone, regardless of technical expertise, can effortlessly manage 
                products and track inventory levels.
              </p>
              <p className="fs-5 text-secondary mb-0 lh-lg">
                Powered by the modern MERN stack, IMS offers unparalleled performance with real-time updates, 
                secure data handling, and a seamless user experience. As your business grows, IMS scales with you, 
                ensuring that your inventory management remains fast, accurate, and efficient.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5 p-5 bg-light rounded-4">
          <h3 className="fw-bold mb-3">Ready to Transform Your Inventory Management?</h3>
          <p className="text-secondary fs-5 mb-4">
            Join businesses worldwide that trust IMS for their inventory needs
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="/signup" className="btn btn-primary btn-lg px-5">
              <i className="fas fa-rocket me-2"></i>
              Get Started Now
            </a>
            <a href="/products" className="btn btn-outline-primary btn-lg px-5">
              <i className="fas fa-box me-2"></i>
              View Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}