import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        const value = e.target.value.replace(/[^\d]/g, "");
        const formattedPrice = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
        setProductPrice(formattedPrice.replace("₹", ""));
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const setQuantity = (e) => {
        const value = e.target.value.replace(/[^\d]/g, "");
        setProductQuantity(value);
    };

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode || !productQuantity) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/insertproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ProductName: productName,
                    ProductPrice: productPrice.replace(/,/g, ""),
                    ProductBarcode: productBarcode,
                    ProductQuantity: parseInt(productQuantity),
                }),
            });

            await res.json();

            if (res.status === 201) {
                setProductName("");
                setProductPrice("");
                setProductBarcode("");
                setProductQuantity("");
                navigate("/products");
            } else if (res.status === 422) {
                setError("Product with this barcode already exists.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5" style={{ minHeight: '90vh' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-12">
                    <div className="card-custom">
                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div className="mb-3">
                                <i className="fas fa-box-open fa-4x" style={{ color: '#6366f1' }}></i>
                            </div>
                            <h1 className="mb-2">Add New Product</h1>
                            <p className="text-secondary fs-5">Fill in the product details below</p>
                        </div>

                        <form onSubmit={addProduct}>
                            <div className="row g-4">
                                {/* Product Name */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="product_name" className="form-label">
                                            <i className="fas fa-tag me-2" style={{ color: '#6366f1' }}></i>
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            onChange={setName}
                                            value={productName}
                                            className="form-control"
                                            id="product_name"
                                            placeholder="e.g., Apple iPhone 15"
                                            required
                                        />
                                        <small className="text-secondary">Enter the product name</small>
                                    </div>
                                </div>

                                {/* Product Price */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="product_price" className="form-label">
                                            <i className="fas fa-rupee-sign me-2" style={{ color: '#10b981' }}></i>
                                            Product Price
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fas fa-rupee-sign"></i>
                                            </span>
                                            <input
                                                type="text"
                                                onChange={setPrice}
                                                value={`${productPrice}`}
                                                className="form-control"
                                                id="product_price"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <small className="text-secondary">Enter the price in INR</small>
                                    </div>
                                </div>

                                {/* Product Barcode */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="product_barcode" className="form-label">
                                            <i className="fas fa-barcode me-2" style={{ color: '#f59e0b' }}></i>
                                            Product Barcode
                                        </label>
                                        <input
                                            type="number"
                                            onChange={setBarcode}
                                            value={productBarcode}
                                            maxLength={12}
                                            className="form-control font-monospace"
                                            id="product_barcode"
                                            placeholder="123456789012"
                                            required
                                        />
                                        <small className="text-secondary">Max 12 digits</small>
                                    </div>
                                </div>

                                {/* Product Quantity */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="product_quantity" className="form-label">
                                            <i className="fas fa-cubes me-2" style={{ color: '#ec4899' }}></i>
                                            Product Quantity
                                        </label>
                                        <input
                                            type="number"
                                            onChange={setQuantity}
                                            value={productQuantity}
                                            className="form-control"
                                            id="product_quantity"
                                            placeholder="0"
                                            min="0"
                                            required
                                        />
                                        <small className="text-secondary">Available stock quantity</small>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center mt-4">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    <div>{error}</div>
                                </div>
                            )}

                            {/* Product Preview Card */}
                            {(productName || productPrice || productBarcode || productQuantity) && (
                                <div className="mt-5 p-4 bg-light rounded-4">
                                    <h5 className="mb-3 fw-bold">
                                        <i className="fas fa-eye me-2"></i>Product Preview
                                    </h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <p className="mb-2">
                                                <strong className="text-secondary">Name:</strong>{" "}
                                                <span className="text-primary">
                                                    {productName || "Not entered"}
                                                </span>
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-secondary">Price:</strong>{" "}
                                                <span className="text-success">
                                                    {productPrice ? `₹${productPrice}` : "Not entered"}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-2">
                                                <strong className="text-secondary">Barcode:</strong>{" "}
                                                <span className="font-monospace">
                                                    {productBarcode || "Not entered"}
                                                </span>
                                            </p>
                                            <p className="mb-2">
                                                <strong className="text-secondary">Quantity:</strong>{" "}
                                                <span className={`badge ${
                                                    !productQuantity ? 'bg-secondary' :
                                                    parseInt(productQuantity) < 10 ? 'bg-danger' :
                                                    parseInt(productQuantity) < 50 ? 'bg-warning text-dark' :
                                                    'bg-success'
                                                } rounded-pill`}>
                                                    {productQuantity || "0"} units
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-center gap-3 mt-5">
                                <NavLink 
                                    to="/products" 
                                    className="btn btn-outline-secondary btn-lg px-5"
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </NavLink>
                                <button
                                    type="submit"
                                    onClick={addProduct}
                                    className="btn btn-primary btn-lg px-5"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Adding Product...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-plus me-2"></i>
                                            Add Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}