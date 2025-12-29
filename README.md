# Inventory Management System - MERN Stack Application

A comprehensive, full-stack Inventory Management System built with the **MERN stack** (MongoDB, Express, React, Node.js). This application allows users to manage their product inventory with secure authentication, real-time search, and complete CRUD operations.

---

## 🌐 Live Application

🔗 **Visit the live application:** [https://inventory-management-system-v2.onrender.com](https://inventory-management-system-v2.onrender.com)

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Key Features Explained](#key-features-explained)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## ✨ Features

### Core Inventory Management
- ✅ **Add Products** - Insert new products with name, price, barcode, and quantity
- ✅ **View Products** - Display all products in a responsive table format
- ✅ **Search Products** - Real-time search by product name or barcode
- ✅ **Update Products** - Edit existing product information
- ✅ **Delete Products** - Remove products from inventory
- ✅ **Unique Barcode Validation** - Prevents duplicate barcodes in the system

### Authentication & Security
- ✅ **User Registration** - Create new user accounts with email and password
- ✅ **User Login** - Secure login with JWT authentication
- ✅ **Password Hashing** - Passwords encrypted with bcryptjs (salt rounds: 10)
- ✅ **Persistent Login** - Session persists across page refreshes
- ✅ **Logout Functionality** - Secure logout that clears authentication tokens
- ✅ **Protected Routes** - Only authenticated users can access inventory features

### User Data Isolation
- ✅ **Per-User Inventory** - Each user sees only their own products
- ✅ **User Ownership Verification** - All operations verified for user authorization
- ✅ **Secure API Access** - All endpoints require valid JWT token

### User Interface
- ✅ **Responsive Design** - Mobile-friendly interface with Bootstrap 5
- ✅ **Real-time Search** - Filter products instantly as you type
- ✅ **Sticky Navigation Bar** - Quick access to all features
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Error Messages** - Clear, user-friendly error feedback
- ✅ **Loading States** - Visual feedback during data operations

---

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - UI library for building interactive components
- **React Router DOM 6.11.2** - Client-side routing and navigation
- **Bootstrap 5** - CSS framework for responsive design
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose 7.8.7** - MongoDB object modeling
- **jsonwebtoken 9.0.2** - JWT authentication and authorization
- **bcryptjs 2.4.3** - Password hashing and comparison
- **dotenv 16.4.7** - Environment variable management
- **nodemon 2.0.22** - Development tool for auto-restart

---

## 📁 Project Structure

```
Inventory_Management_System/
│
├── Backend/                          # Node.js/Express backend
│   ├── Models/
│   │   ├── Products.js              # Product schema with userId reference
│   │   └── User.js                  # User schema with password hashing
│   ├── Routes/
│   │   ├── auth.js                  # Authentication endpoints (register, login)
│   │   └── router.js                # Product CRUD endpoints
│   ├── middleware/
│   │   └── auth.js                  # JWT verification middleware
│   ├── .env                         # Environment variables
│   ├── db.js                        # MongoDB connection
│   ├── index.js                     # Server entry point
│   └── package.json                 # Backend dependencies
│
├── Frontend/                         # React frontend
│   └── inventory_management_system/
│       ├── public/
│       │   └── index.html           # HTML template
│       ├── src/
│       │   ├── components/
│       │   │   ├── Home.js          # Landing page
│       │   │   ├── About.js         # About page
│       │   │   ├── Login.js         # Login form
│       │   │   ├── Signup.js        # Registration form
│       │   │   ├── Navbar.js        # Navigation bar with search
│       │   │   ├── Products.js      # Products list & search
│       │   │   ├── InsertProduct.js # Add product form
│       │   │   └── UpdateProduct.js # Edit product form
│       │   ├── App.js               # Main app component with routing
│       │   ├── App.css              # Application styles
│       │   ├── index.js             # React entry point
│       │   └── index.css            # Global styles
│       ├── package.json             # Frontend dependencies
│       └── README.md                # Create React App README
│
├── package.json                     # Root package.json
└── README.md                        # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (Local or Cloud Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (for version control) - [Download](https://git-scm.com/)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/)

---

## 💻 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone <your-github-repo-url>
cd Inventory_Management_System
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 4: Install Frontend Dependencies
```bash
cd ../Frontend/inventory_management_system
npm install
```

---

## ⚙️ Configuration

### Backend Configuration (.env file)

Create a `.env` file in the `Backend/` directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ims
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Environment Variables Explanation:**
- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
  - Local: `mongodb://localhost:27017/ims`
  - Cloud (Atlas): `mongodb+srv://username:password@cluster.mongodb.net/ims`
- `JWT_SECRET` - Secret key for signing JWT tokens (use a strong, random string in production)

### MongoDB Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/ims`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string from MongoDB Atlas
4. Update `MONGODB_URI` in `.env`

---

## 🚀 Running the Application

### Method 1: Split Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd Backend
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd Frontend/inventory_management_system
npm run client
# or
npm start
```

The application will be available at `http://localhost:3000`

### Method 2: Root Directory Commands

From the project root, you can use these npm scripts:

```bash
# Run both backend and frontend
npm run dev

# Or run them separately
npm run server      # Runs backend only
npm run client      # Runs frontend only
```

---

## 📖 Usage Guide

### 1. Landing Page (Home)
- View the application homepage
- See navigation options

### 2. User Registration
- Click **"Sign Up"** in the navbar
- Enter username, email, and password
- Password must be at least 6 characters
- Account created successfully → Auto-login → Redirected to Products

### 3. User Login
- Click **"Login"** in the navbar
- Enter email and password
- Successful login → Redirected to Products page
- Your session persists even after page refresh

### 4. Products Page (Main Features)

#### View Products
- All your products displayed in a table
- Shows: Product Name, Price, Barcode, Quantity
- Update/Delete buttons for each product

#### Search Products
- Type in the search box (real-time filtering)
- Search by product name or barcode
- Clear search to see all products again

#### Add New Product
1. Click **"+ Add New Product"** button
2. Fill in all fields:
   - **Product Name** - Text (required)
   - **Product Price** - Number (required)
   - **Product Barcode** - 12 digits max, must be unique (required)
   - **Product Quantity** - Positive number (required)
3. Click **"Add Product"**
4. Error if barcode already exists for this user

#### Update Product
1. Click the **edit icon** (pencil) next to any product
2. Form pre-fills with current product data
3. Make changes
4. Click **"Update"**
5. Error if you try to use a barcode already assigned to another product
6. Redirected to products list on success

#### Delete Product
1. Click the **delete icon** (trash) next to any product
2. Product removed from inventory
3. Redirected to updated products list

### 5. About Page
- Information about the application

### 6. Logout
- Click **"Logout"** button in navbar
- Session cleared
- Redirected to home page
- Can login again with different account

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### Register User
```
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login User
```
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User
```
GET /me
Authorization: Bearer <token>

Response (200):
{
  "_id": "...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Product Endpoints

#### Get All Products (User's Products)
```
GET /products
Authorization: Bearer <token>

Response (201):
[
  {
    "_id": "...",
    "userId": "...",
    "ProductName": "Laptop",
    "ProductPrice": 50000,
    "ProductBarcode": "123456789012",
    "ProductQuantity": 5,
    "createdAt": "2025-12-24T..."
  },
  ...
]
```

#### Get Single Product
```
GET /products/:id
Authorization: Bearer <token>

Response (201):
{
  "_id": "...",
  "userId": "...",
  "ProductName": "Laptop",
  "ProductPrice": 50000,
  "ProductBarcode": "123456789012",
  "ProductQuantity": 5
}
```

#### Add Product
```
POST /insertproduct
Authorization: Bearer <token>
Content-Type: application/json

{
  "ProductName": "Laptop",
  "ProductPrice": 50000,
  "ProductBarcode": "123456789012",
  "ProductQuantity": 5
}

Response (201):
{
  "_id": "...",
  "userId": "...",
  "ProductName": "Laptop",
  "ProductPrice": 50000,
  "ProductBarcode": "123456789012",
  "ProductQuantity": 5
}

Error (422): "Product is already added." (if barcode exists)
```

#### Update Product
```
PUT /updateproduct/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "ProductName": "Laptop Pro",
  "ProductPrice": 55000,
  "ProductBarcode": "123456789013",
  "ProductQuantity": 3
}

Response (201):
{
  "_id": "...",
  "userId": "...",
  "ProductName": "Laptop Pro",
  "ProductPrice": 55000,
  "ProductBarcode": "123456789013",
  "ProductQuantity": 3
}

Error (422): "Product with this barcode already exists."
Error (403): "You are not authorized to update this product"
```

#### Delete Product
```
DELETE /deleteproduct/:id
Authorization: Bearer <token>

Response (201):
{
  "_id": "...",
  "ProductName": "Laptop",
  ...
}

Error (403): "You are not authorized to delete this product"
```

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (references User),
  ProductName: String (required),
  ProductPrice: Number (required),
  ProductBarcode: String (required, 12 digits max),
  ProductQuantity: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

**Index:** `{userId, ProductBarcode}` - Ensures unique barcode per user

---

## 🎯 Key Features Explained

### 1. JWT Authentication
- Tokens stored in browser's localStorage
- Valid for 7 days
- Automatically included in all API requests
- Invalid/expired tokens trigger re-login

### 2. Per-User Inventory
- Each user's data is completely isolated
- User ID stored in JWT token and verified on all requests
- Users can only see, edit, delete their own products

### 3. Real-Time Search
- Triggered on every keystroke
- Searches in ProductName and ProductBarcode
- Clearing search box shows all products
- No button click needed

### 4. Barcode Uniqueness
- Backend validates: No duplicate barcodes per user
- Insert: Checks if barcode already exists
- Update: Allows same barcode, rejects other user's barcodes

### 5. Protected Routes
- Frontend: Components wrapped in ProtectedRoute
- Backend: Auth middleware verifies JWT on every endpoint
- Unauthorized access redirects to login

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB service is running
- Check MONGODB_URI in .env is correct
- For Atlas: Ensure IP is whitelisted in network access

### Issue: "Token expired or invalid"
**Solution:**
- Clear localStorage in browser DevTools
- Delete localStorage items: `token` and `user`
- Login again to get new token

### Issue: "Port 3001 already in use"
**Solution:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or change PORT in .env to 3002
```

### Issue: "npm dependencies won't install"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "CORS error when calling API"
**Solution:**
- Backend needs CORS enabled (already configured)
- Ensure frontend is calling `http://localhost:3001`
- Check console for exact error message

### Issue: "Barcode must be unique but still getting error"
**Solution:**
- Barcode is unique per user, not globally
- Different users can have same barcode
- Try a different barcode number

---

## 🚀 Future Enhancements

- [ ] Add product categories and tags
- [ ] Inventory analytics and reports
- [ ] Low stock alerts and notifications
- [ ] Product image uploads
- [ ] Bulk operations (import/export CSV)
- [ ] Advanced filtering and sorting
- [ ] User profile management
- [ ] Two-factor authentication
- [ ] API rate limiting
- [ ] Email verification for registration
- [ ] Order management system
- [ ] Supplier management
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

Your Name - [GitHub Profile](https://github.com/Mayur241202)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review the API Documentation
3. Check console for error messages
4. Open an issue on GitHub

---

**Last Updated:** December 24, 2025
