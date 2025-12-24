# Per-User Inventory Implementation - Complete Guide

## Changes Made

### 1. Backend Model Update - Products.js

**Added fields to track ownership:**
- `userId`: References the User who owns the product
- `createdAt`: Timestamp for when product was created

### 2. Backend Routes Update - router.js

**All product operations now:**
- Filter by the logged-in user's userId
- Only allow users to manage their own products
- Prevent unauthorized access to other users' products

**Route Changes:**

#### POST /insertproduct
- NOW: Creates product with current user's userId
- Checks for duplicate barcode only within user's products
- Only the logged-in user can see their products

#### GET /products
- NOW: Returns only products belonging to the logged-in user
- Each user sees only their own inventory

#### GET /products/:id
- NOW: Validates product belongs to current user before returning
- Returns 404 if product not found or doesn't belong to user

#### PUT /updateproduct/:id
- NOW: Verifies product ownership before allowing update
- Returns 403 if user tries to update someone else's product

#### DELETE /deleteproduct/:id
- NOW: Verifies product ownership before deletion
- Returns 403 if user tries to delete someone else's product

## Testing the Implementation

### Step 1: Start Backend Server
```bash
cd Backend
npm start
```

### Step 2: Start Frontend Server
```bash
cd Frontend\inventory_management_system
npm start
```

### Step 3: Test with Multiple Users

#### Test Case 1: Create Products with User A
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create User A:
   - Username: `user1`
   - Email: `user1@example.com`
   - Password: `password123`
4. Add Products:
   - Product 1: Laptop, Price: 50000, Barcode: 123456789001, Quantity: 5
   - Product 2: Mouse, Price: 500, Barcode: 123456789002, Quantity: 20

#### Test Case 2: Create Products with User B
1. Click "Logout" (or open incognito window)
2. Click "Sign Up"
3. Create User B:
   - Username: `user2`
   - Email: `user2@example.com`
   - Password: `password123`
4. Add Different Products:
   - Product 1: Monitor, Price: 15000, Barcode: 987654321001, Quantity: 3
   - Product 2: Keyboard, Price: 2000, Barcode: 987654321002, Quantity: 10

#### Test Case 3: Verify Separation
1. Login as User A → You should see ONLY User A's products (Laptop, Mouse)
2. Login as User B → You should see ONLY User B's products (Monitor, Keyboard)
3. User A's products should NOT appear in User B's inventory and vice versa

#### Test Case 4: Edit Products
1. Login as User A
2. Edit "Laptop" quantity to 10
3. Logout and Login as User B
4. User B's products should remain unchanged
5. Logout and Login as User A
6. Verify the quantity change was saved for User A

#### Test Case 5: Delete Products
1. Login as User A
2. Delete "Mouse"
3. Verify "Laptop" is still there
4. Logout and Login as User B
5. Verify "Keyboard" and "Monitor" still exist (not affected)

## Architecture Overview

```
User Login/Register
        ↓
    JWT Token (contains userId)
        ↓
    API Request with Token
        ↓
    Backend Auth Middleware validates token
        ↓
    Extract userId from token
        ↓
    Filter database queries by userId
        ↓
    Return only user's own products
```

## Security Features Implemented

✅ **User Isolation**: Each user can only see their own products
✅ **Authorization Checks**: Prevents unauthorized updates/deletes
✅ **Token Verification**: JWT validates user identity
✅ **Error Handling**: Proper 403/404 responses for access violations
✅ **Data Integrity**: Barcode uniqueness enforced per user

## Database Query Examples

### Get User A's Products
```javascript
db.products.find({ userId: "user_a_id" })
```

### Get User B's Products
```javascript
db.products.find({ userId: "user_b_id" })
```

### Get Specific Product (with ownership check)
```javascript
db.products.findOne({ _id: "product_id", userId: "current_user_id" })
```

## Frontend - No Changes Needed

The frontend components (Products.js, InsertProduct.js, UpdateProduct.js) already work correctly because:
- They send the JWT token in the Authorization header
- The backend automatically filters results by userId from the token
- Each logged-in user automatically sees only their products

## API Response Examples

### Successful Get Products (User A)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "ProductName": "Laptop",
    "ProductPrice": 50000,
    "ProductBarcode": 123456789001,
    "ProductQuantity": 5,
    "createdAt": "2025-12-24T12:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f191e810c19729de860ea",
    "ProductName": "Mouse",
    "ProductPrice": 500,
    "ProductBarcode": 123456789002,
    "ProductQuantity": 20,
    "createdAt": "2025-12-24T12:05:00.000Z"
  }
]
```

### Error Response - Unauthorized Access
```json
{
  "message": "You are not authorized to update this product"
}
```

## Important Notes

1. **MongoDB**: Make sure MongoDB is running before starting the backend
2. **Token Validity**: JWT tokens expire after 7 days
3. **Existing Products**: If you had old products without userId, they won't appear (create new ones)
4. **User Unique Constraints**: Username and email must be unique across the system

## Troubleshooting

### Q: Products not appearing after login?
A: Make sure:
- Backend is running
- You're logged in (token in localStorage)
- You've added products as that user

### Q: Can still see other users' products?
A: Clear browser cache and localStorage:
```javascript
// In browser console
localStorage.clear()
// Then reload the page
```

### Q: Getting "You are not authorized" error?
A: Likely trying to access someone else's product. This is expected behavior.

## Database Migration (if upgrading existing system)

If you have old products without userId:
```bash
# MongoDB shell
db.products.updateMany(
  { userId: { $exists: false } },
  { $set: { userId: ObjectId("your_user_id") } }
)
```

---

Now each user has a completely isolated inventory!
