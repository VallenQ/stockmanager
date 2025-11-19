import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/Recover';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Suppliers from './pages/Suppliers';
import SupplierForm from './pages/SupplierForm';
import { getToken } from './utils/auth';
import API, { setAuthToken } from './api/api';

function App() {
  useEffect(() => {
    const token = getToken();
    if (token) setAuthToken(token);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/recover" element={<Recover/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/new" element={<ProductForm/>} />
          <Route path="/products/edit/:id" element={<ProductForm/>} />
          <Route path="/suppliers" element={<Suppliers/>} />
          <Route path="/suppliers/new" element={<SupplierForm/>} />
          <Route path="/suppliers/edit/:id" element={<SupplierForm/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
