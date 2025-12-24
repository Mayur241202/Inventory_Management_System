const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const auth = require('../middleware/auth');

//Inserting(Creating) Data:
router.post("/insertproduct", auth, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;
    const userId = req.user.userId;

    try {
        // Check if product with same barcode exists for this user
        const pre = await products.findOne({ userId, ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            return res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ userId, ProductName, ProductPrice, ProductBarcode, ProductQuantity })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

//Getting(Reading) Data for current user:
router.get('/products', auth, async (req, res) => {
    const userId = req.user.userId;

    try {
        const getProducts = await products.find({ userId })
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', auth, async (req, res) => {
    const userId = req.user.userId;

    try {
        const getProduct = await products.findOne({ _id: req.params.id, userId });
        
        if (!getProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', auth, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductQuantity } = req.body;
    const userId = req.user.userId;

    try {
        // Verify that the product belongs to the current user
        const product = await products.findOne({ _id: req.params.id, userId });
        
        if (!product) {
            return res.status(403).json({ message: 'You are not authorized to update this product' });
        }

        // Check if new barcode already exists for another product
        if (ProductBarcode !== product.ProductBarcode) {
            const existingProduct = await products.findOne({ userId, ProductBarcode: ProductBarcode });
            if (existingProduct) {
                return res.status(422).json({ message: 'Product with this barcode already exists.' });
            }
        }

        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode, ProductQuantity }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', auth, async (req, res) => {
    const userId = req.user.userId;

    try {
        // Verify that the product belongs to the current user
        const product = await products.findOne({ _id: req.params.id, userId });
        
        if (!product) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }

        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
})


module.exports = router;