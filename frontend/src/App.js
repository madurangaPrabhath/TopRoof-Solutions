import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import RoofingProducts from './components/RoofingProducts';
import TopSellingProducts from './components/TopSellingProducts';
import AccessoriesProducts from './components/AccessoriesProducts';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/roofing-products" element={<RoofingProducts />} />
        <Route path="/top-selling-products" element={<TopSellingProducts />} />
        <Route path="/accessories-products" element={<AccessoriesProducts />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
