# Inventory Management System - Setup & Startup Guide

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Node.js** - Download from https://nodejs.org/
2. **MongoDB** - Download from https://www.mongodb.com/try/download/community

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd Frontend/inventory_management_system
npm install
```

## MongoDB Setup

### Windows Users:

#### Option 1: Using MongoDB Community Edition (Recommended)

1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the installation steps
3. During installation, check "Install MongoDB as a Service"
4. MongoDB will automatically start on `mongodb://127.0.0.1:27017`

#### Option 2: Using MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get the connection string
5. Update `.env` file in Backend folder with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/inventory
   ```

## Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended for Development)

**Terminal 1 - Start Backend:**

```bash
cd Backend
npm start
```

You should see:
```
Connected to Mongo Successfully!
Example app listening on port 3001
```

**Terminal 2 - Start Frontend:**

```bash
cd Frontend/inventory_management_system
npm start
```

The frontend will open at `http://localhost:3000`

### Option 2: Run Both Together (if concurrently is installed)

From the root directory:

```bash
npm install -g concurrently
npm run install-all
npm start
```

## Testing the Application

1. **Sign Up**: Navigate to `http://localhost:3000/signup`
   - Create a new account
   - You'll be logged in automatically

2. **Login**: Navigate to `http://localhost:3000/login`
   - Login with your credentials

3. **Add Products**: Click "Add New Product"
   - Fill in Product Name, Price, Barcode, and Quantity
   - Click Insert

4. **View Products**: You'll see your products in the table
   - Search for products
   - Update product details
   - Delete products

5. **Logout**: Click "Logout" button in the navbar

## Troubleshooting

### Error: "Connection Refused" at port 3001

**Solution**: Make sure the backend is running:
```bash
cd Backend
npm start
```

### Error: "MongoDB connection error"

**Solution**: Make sure MongoDB is running:

- **Windows**: Search for "Services" and start "MongoDB"
- **Or run mongod manually**: Open a new terminal and type `mongod`

### Error: "Port 3001 already in use"

**Solution**: Kill the process on port 3001:

**On Windows (PowerShell as Admin):**
```powershell
Get-NetTCPConnection -LocalPort 3001 | Stop-Process -Force
```

**Or change the port in Backend/index.js:**
```javascript
const port = 3002; // Change to a different port
```

### Error: "Package not found"

**Solution**: Make sure you've run npm install in both Backend and Frontend folders.

## Environment Variables

Create a `.env` file in the Backend folder with:

```
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/inventory
JWT_SECRET=your_secure_secret_key_here
```

## Project Structure

```
Inventory_Management_System/
├── Backend/
│   ├── Models/
│   │   ├── Products.js
│   │   └── User.js
│   ├── Routes/
│   │   ├── router.js (product routes)
│   │   └── auth.js (login/signup routes)
│   ├── middleware/
│   │   └── auth.js (JWT verification)
│   ├── index.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
└── Frontend/
    └── inventory_management_system/
        ├── src/
        │   ├── components/
        │   │   ├── Login.js
        │   │   ├── Signup.js
        │   │   ├── Home.js
        │   │   ├── Products.js
        │   │   ├── InsertProduct.js
        │   │   ├── UpdateProduct.js
        │   │   ├── About.js
        │   │   └── Navbar.js
        │   ├── App.js
        │   └── index.js
        └── package.json
```

## API Endpoints

### Authentication
- `POST /register` - Create new account
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Products (All require authentication)
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /insertproduct` - Add new product
- `PUT /updateproduct/:id` - Update product
- `DELETE /deleteproduct/:id` - Delete product

## Features

✅ User Registration & Login
✅ JWT Authentication
✅ Product Management (CRUD)
✅ Product Quantity Tracking
✅ Search functionality
✅ Responsive UI with Bootstrap
✅ Password Hashing with bcryptjs

## Support

If you encounter any issues:
1. Check the browser console (F12)
2. Check the terminal output
3. Make sure MongoDB is running
4. Make sure ports 3000 and 3001 are not in use
