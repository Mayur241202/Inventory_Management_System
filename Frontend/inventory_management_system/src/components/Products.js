import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    }
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = productData.filter(
      (product) =>
        product.ProductName.toLowerCase().includes(lowercasedQuery) ||
        product.ProductBarcode.toString().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const deletedata = await response.json();

      if (response.status === 422 || !deletedata) {
        console.log('Error');
      } else {
        console.log('Product deleted');
        getProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Navbar title="My Store" onSearch={handleSearch} />
      <div className="container-fluid p-5">
        <h1>Products Inventory</h1>
        <div className="add_button">
          <NavLink to="/insertproduct" className="btn btn-primary fs-5">
            + Add New Product
          </NavLink>
        </div>
        <div className="overflow-auto mt-3" style={{ maxHeight: '38rem' }}>
          <table className="table table-striped table-hover mt-3 fs-5">
            <thead>
              <tr className="tr_color">
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Barcode</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((element, id) => (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td>{element.ProductName}</td>
                  <td>₹{element.ProductPrice.toLocaleString()}</td>
                  <td>{element.ProductBarcode}</td>
                  <td>
                    <NavLink
                      to={`/updateproduct/${element._id}`}
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(element._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
