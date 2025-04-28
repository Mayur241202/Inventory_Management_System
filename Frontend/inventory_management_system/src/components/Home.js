import React from 'react';

export default function Home() {
  return (
    <div className="container-fluid p-5 bg-light">
      <div className="container bg-white p-5 shadow rounded">
        {/* Title Section */}
        <h1 className="display-4 text-center text-success fw-bold mb-4">
          Welcome to the Inventory Management System
        </h1>
        
        <p className="lead text-center text-secondary mb-5">
          Your ultimate solution for seamless inventory management and product tracking.
        </p>

        {/* Intro Section */}
        <p className="text-muted fs-5 mb-4">
          Whether you're managing a small store or a large warehouse, our app simplifies inventory tracking and ensures efficient management of stock, prices, and product details. With a robust and user-friendly interface, IMS empowers you to take control of your inventory in real-time.
        </p>

        <p className="text-muted fs-5 mb-5">
          Built using cutting-edge technologies, IMS ensures seamless integration between the frontend and backend, offering reliability, efficiency, and a smooth user experience.
        </p>

        {/* Features Section */}
        <h2 className="text-center text-primary fw-bold mb-4">Key Features</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item border-0">
            <strong className="text-success">Easy Product Management:</strong> Quickly add, edit, or remove products with an intuitive interface.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Real-Time Inventory Tracking:</strong> View essential product details, including name, quantity, and price, with ease.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Modern & Responsive Interface:</strong> Enjoy a seamless experience on desktop and mobile devices.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Fast Database Interaction:</strong> Leverage MongoDB for secure and efficient product data management.
          </li>
        </ul>

        {/* Footer Section */}
        <div className="text-center mt-5">
          <a href="/products" className="btn btn-success btn-lg rounded-pill px-5 shadow">
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
}
