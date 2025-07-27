import React from 'react';
import './App.css';
import { API_URL } from './utils/request';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ProductsPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './components/EditProductPage';
import ComponentHierarchyTable from './components/ComponentHierarchyTable';
import ProductComponentTree from './pages/ProductComponentTree';
import AddFullProductForm from './components/AddFullProductForm';

function App() {
  console.log("Base URL:", API_URL);

  return (
    <Router>
      <div style={{ padding: "16px" }}>
        <nav style={{ marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/products" style={linkStyle}> Products List</Link>
          <Link to="/products-view" style={linkStyle}>View Product Hierarchy</Link>
          <Link to="/products-addProductDetails" style={linkStyle}> Add Full Product</Link>
        </nav>

        <Routes>
          {/* Product list */}
          <Route path="/products" element={<ProductsPage />} />

          {/* Product details by ID */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* Edit product */}
          <Route path="/edit-product/:id" element={<EditProductPage />} />

          {/* Grouped component hierarchy */}
          <Route path="/products-view" element={<ProductComponentTree />} />

          {/* Add full product form */}
          <Route path="/products-addProductDetails" element={<AddFullProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold',
  border: '1px solid #007bff',
  padding: '6px 12px',
  borderRadius: '6px',
  backgroundColor: '#f9f9f9',
  transition: 'background-color 0.3s ease',
};

export default App;
