import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products({ onSetSearchHandler }) {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (onSetSearchHandler) {
      onSetSearchHandler(() => handleSearch);
    }
  }, [productData, onSetSearchHandler]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log('Data Retrieved.');
        setProductData(data);
        setFilteredProducts(data);
      } else {
        console.log('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(productData);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = productData.filter(
      (product) =>
        product.ProductName.toLowerCase().includes(lowercasedQuery) ||
        product.ProductBarcode.toString().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
    setDeleting(false);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/deleteproduct/${productToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const deletedata = await response.json();

      if (response.status === 422 || !deletedata) {
        console.log('Error');
      } else {
        console.log('Product deleted');
        getProducts();
        closeDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-5 text-center">
        <div className="card-custom">
          <div className="spinner-border mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="text-secondary">Loading Products...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid p-5">
        <div className="card-custom">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div>
              <h1 className="mb-2">Products Inventory</h1>
              <p className="text-secondary mb-0">
                <i className="fas fa-box me-2"></i>
                Total Products: <strong>{filteredProducts.length}</strong>
              </p>
            </div>
            <NavLink to="/insertproduct" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>
              Add New Product
            </NavLink>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-box-open fa-5x text-secondary mb-4" style={{ opacity: 0.3 }}></i>
              <h3 className="text-secondary mb-3">No Products Found</h3>
              <p className="text-secondary mb-4">
                {productData.length === 0 
                  ? "Get started by adding your first product"
                  : "Try adjusting your search query"}
              </p>
              {productData.length === 0 && (
                <NavLink to="/insertproduct" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>
                  Add Your First Product
                </NavLink>
              )}
            </div>
          ) : (
            <div className="table-container">
              <div className="overflow-auto" style={{ maxHeight: '38rem' }}>
                <table className="table table-hover mb-0">
                  <thead className="sticky-top">
                    <tr className="tr_color">
                      <th scope="col" className="text-center">#</th>
                      <th scope="col">
                        <i className="fas fa-tag me-2"></i>Product Name
                      </th>
                      <th scope="col">
                        <i className="fas fa-rupee-sign me-2"></i>Price
                      </th>
                      <th scope="col">
                        <i className="fas fa-barcode me-2"></i>Barcode
                      </th>
                      <th scope="col">
                        <i className="fas fa-cubes me-2"></i>Quantity
                      </th>
                      <th scope="col" className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((element, id) => (
                      <tr key={element._id}>
                        <td className="text-center fw-bold text-secondary">{id + 1}</td>
                        <td className="fw-semibold">{element.ProductName}</td>
                        <td className="text-success fw-semibold">
                          ₹{element.ProductPrice.toLocaleString()}
                        </td>
                        <td className="font-monospace">{element.ProductBarcode}</td>
                        <td>
                          <span className={`badge ${
                            element.ProductQuantity < 10 
                              ? 'bg-danger' 
                              : element.ProductQuantity < 50 
                              ? 'bg-warning text-dark' 
                              : 'bg-success'
                          } rounded-pill px-3 py-2`}>
                            {element.ProductQuantity}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <NavLink
                              to={`/updateproduct/${element._id}`}
                              className="btn btn-sm btn-primary"
                              title="Edit Product"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </NavLink>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => openDeleteModal(element)}
                              title="Delete Product"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '16px', border: 'none' }}>
              <div className="modal-header border-0 pb-0">
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeDeleteModal}
                  disabled={deleting}
                ></button>
              </div>
              <div className="modal-body text-center px-5 py-4">
                <div className="mb-4">
                  <div className="rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ 
                         width: '80px', 
                         height: '80px', 
                         background: 'linear-gradient(135deg, #ef4444, #dc2626)' 
                       }}>
                    <i className="fas fa-trash-alt fa-2x text-white"></i>
                  </div>
                </div>
                <h3 className="fw-bold mb-3">Delete Product?</h3>
                <p className="text-secondary mb-2">
                  Are you sure you want to delete this product?
                </p>
                {productToDelete && (
                  <div className="p-3 bg-light rounded-3 mb-4">
                    <p className="mb-1 fw-bold text-primary">{productToDelete.ProductName}</p>
                    <p className="mb-1 text-secondary small">
                      <i className="fas fa-barcode me-1"></i>
                      Barcode: {productToDelete.ProductBarcode}
                    </p>
                    <p className="mb-0 text-secondary small">
                      <i className="fas fa-cubes me-1"></i>
                      Quantity: {productToDelete.ProductQuantity} units
                    </p>
                  </div>
                )}
                <p className="text-danger small mb-0">
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center pt-0 pb-4">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger px-4"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash me-2"></i>
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
