import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [originalProduct, setOriginalProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const setQuantity = (e) => {
        const value = e.target.value.replace(/[^\d]/g, "");
        setProductQuantity(value);
    };

    const { id } = useParams("");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:3001/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.", data);
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                    setProductQuantity(data.ProductQuantity);
                    setOriginalProduct(data);
                    setError("");
                } else {
                    console.log("Something went wrong. Please try again.");
                    setError(data.message || "Failed to load product details");
                }
            } catch (err) {
                console.log(err);
                setError("Error loading product details");
            } finally {
                setFetchingData(false);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode || !productQuantity) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    "ProductName": productName, 
                    "ProductPrice": productPrice, 
                    "ProductBarcode": productBarcode, 
                    "ProductQuantity": parseInt(productQuantity) 
                })
            });

            const data = await response.json();

            if (response.status === 201) {
                navigate('/products');
            }
            else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    // Check if any field has been modified
    const hasChanges = originalProduct && (
        productName !== originalProduct.ProductName ||
        productPrice != originalProduct.ProductPrice ||
        productBarcode !== originalProduct.ProductBarcode ||
        productQuantity != originalProduct.ProductQuantity
    );

    if (fetchingData) {
        return (
            <div className='container-fluid p-5 text-center' style={{ minHeight: '90vh' }}>
                <div className="card-custom">
                    <div className="mb-4">
                        <i className="fas fa-spinner fa-spin fa-4x" style={{ color: '#6366f1' }}></i>
                    </div>
                    <h3 className="text-secondary">Loading Product Details...</h3>
                    <p className="text-secondary">Please wait while we fetch the product information</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container-fluid p-5' style={{ minHeight: '90vh' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-12">
                    <div className="card-custom">
                        {/* Header Section */}
                        <div className="text-center mb-5">
                            <div className="mb-3">
                                <i className="fas fa-edit fa-4x" style={{ color: '#6366f1' }}></i>
                            </div>
                            <h1 className="mb-2">Update Product</h1>
                            <p className="text-secondary fs-5">Modify the product details below</p>
                        </div>

                        <form onSubmit={updateProduct}>
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
                                            placeholder="Enter Product Name"
                                            required
                                        />
                                        {originalProduct && productName !== originalProduct.ProductName && (
                                            <small className="text-warning">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Changed from: {originalProduct.ProductName}
                                            </small>
                                        )}
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
                                                type="number"
                                                onChange={setPrice}
                                                value={productPrice}
                                                className="form-control"
                                                id="product_price"
                                                placeholder="Enter Product Price"
                                                required
                                            />
                                        </div>
                                        {originalProduct && productPrice != originalProduct.ProductPrice && (
                                            <small className="text-warning">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Changed from: ₹{originalProduct.ProductPrice.toLocaleString()}
                                            </small>
                                        )}
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
                                            placeholder="Enter Product Barcode"
                                            required
                                        />
                                        {originalProduct && productBarcode !== originalProduct.ProductBarcode && (
                                            <small className="text-warning">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Changed from: {originalProduct.ProductBarcode}
                                            </small>
                                        )}
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
                                            placeholder="Enter Product Quantity"
                                            min="0"
                                            required
                                        />
                                        {originalProduct && productQuantity != originalProduct.ProductQuantity && (
                                            <small className="text-warning">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Changed from: {originalProduct.ProductQuantity}
                                            </small>
                                        )}
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

                            {/* Changes Summary */}
                            {hasChanges && (
                                <div className="mt-5 p-4 bg-warning bg-opacity-10 rounded-4 border border-warning">
                                    <h5 className="mb-3 fw-bold text-warning">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Changes Detected
                                    </h5>
                                    <p className="mb-0 text-secondary">
                                        You have made changes to this product. Please review and click 
                                        <strong> Update Product</strong> to save the changes.
                                    </p>
                                </div>
                            )}

                            {/* Product Preview Card */}
                            <div className="mt-5 p-4 bg-light rounded-4">
                                <h5 className="mb-3 fw-bold">
                                    <i className="fas fa-eye me-2"></i>Current Product Details
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
                                                {productPrice ? `₹${parseInt(productPrice).toLocaleString()}` : "Not entered"}
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

                            {/* Action Buttons */}
                            <div className='d-flex justify-content-center gap-3 mt-5'>
                                <NavLink 
                                    to="/products" 
                                    className='btn btn-outline-secondary btn-lg px-5'
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </NavLink>
                                <button 
                                    type="submit" 
                                    onClick={updateProduct} 
                                    className="btn btn-primary btn-lg px-5" 
                                    disabled={loading || !hasChanges}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save me-2"></i>
                                            Update Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}