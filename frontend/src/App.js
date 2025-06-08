import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import RoofingProducts from './components/RoofingProducts';
import TopSellingProducts from './components/TopSellingProducts';
import AccessoriesProducts from './components/AccessoriesProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/roofing-products" element={<RoofingProducts />} />
        <Route path="/top-selling-products" element={<TopSellingProducts />} />
        <Route path="/accessories-products" element={<AccessoriesProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
