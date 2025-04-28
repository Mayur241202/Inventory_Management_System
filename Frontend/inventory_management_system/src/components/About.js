import React from 'react';

export default function About() {
  return (
    <div className="container-fluid p-5 bg-light">
      <div className="container bg-white p-5 shadow rounded">
        {/* Title Section */}
        <h1 className="display-4 text-center text-primary fw-bold mb-4">
          About the Inventory Management System
        </h1>
        
        <p className="lead text-center text-secondary mb-5">
          Learn how the Inventory Management System simplifies and streamlines your inventory management needs.
        </p>

        {/* Description Section */}
        <p className="text-muted fs-5 mb-4">
          The Inventory Management System (IMS) is a cutting-edge solution for businesses to manage inventory efficiently. Built using the powerful MERN stack—MongoDB, Express.js, React.js, and Node.js—it is the ideal tool for small businesses or startups to streamline their inventory management processes.
        </p>

        {/* Sub-Section: What is IMS */}
        <h2 className="text-primary fw-bold mb-4">What is the Inventory Management System?</h2>
        <p className="text-muted fs-5 mb-4">
          IMS is a modern, full-stack web application that helps businesses manage their inventory seamlessly. From tracking products to updating stock levels in real-time, IMS makes inventory management effortless and user-friendly. It eliminates the complexities of traditional inventory systems with its intuitive interface and robust backend technologies.
        </p>

        {/* Technology Stack Section */}
        <h2 className="text-primary fw-bold mb-4">Technology Stack</h2>
        <p className="text-muted fs-5 mb-4">
          The Inventory Management System is built using the following technologies, ensuring seamless integration and performance:
        </p>
        <ul className="list-group list-group-flush mb-5">
          <li className="list-group-item border-0">
            <strong className="text-success">MongoDB:</strong> Efficiently stores product data, enabling quick access and scalability.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Express.js:</strong> Simplifies backend development and routing for a smoother experience.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">React.js:</strong> Creates dynamic and interactive user interfaces for an enhanced user experience.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Node.js:</strong> Powers the backend with fast and scalable server-side capabilities.
          </li>
        </ul>

        {/* Why Choose Section */}
        <h2 className="text-primary fw-bold mb-4">Why Choose This System?</h2>
        <p className="text-muted fs-5 mb-4">
          The Inventory Management System is designed with simplicity, scalability, and reliability in mind. Its intuitive interface ensures anyone, regardless of technical expertise, can effortlessly manage products and track inventory levels. Real-time updates and secure data handling make this system a dependable choice for businesses.
        </p>

        <p className="text-muted fs-5 mb-5">
          Powered by the modern MERN stack, IMS offers unparalleled performance, ensuring that your inventory management remains fast, accurate, and scalable as your business grows.
        </p>

        {/* Who Can Benefit Section */}
        <h2 className="text-primary fw-bold mb-4">Who Can Benefit?</h2>
        <p className="text-muted fs-5 mb-4">
          IMS is tailored for a wide range of users, including:
        </p>
        <ul className="list-group list-group-flush mb-5">
          <li className="list-group-item border-0">
            <strong className="text-success">Small Business Owners:</strong> Manage inventory with ease and affordability.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Warehouse Managers:</strong> Track stock levels and ensure timely reordering.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Retail Stores:</strong> Monitor product sales and inventory across multiple locations.
          </li>
          <li className="list-group-item border-0">
            <strong className="text-success">Startups:</strong> Scale operations effectively while managing inventory with precision.
          </li>
        </ul>

        <p className="text-muted fs-5">
          Whether you're a retail store owner, warehouse manager, or startup founder, the Inventory Management System provides an efficient and scalable solution to manage your products and track stock levels.
        </p>

        {/* Footer Section */}
        <div className="text-center mt-5">
          <a href="/products" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
