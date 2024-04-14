import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/homepage";
import Shoppage from "./components/Shoppage/shoppage";
import Login from "./components/Homepage/Login/login";
import Register from "./components/Homepage/Register/register";
import Cart from "./components/Cart/cart";
import ProductDetails from "./components/Shoppage/components/productDetails";
import Checkout from "./components/Checkout/checkout";
import Order from "./components/History/Orders/order";
import History from "./components/History/history";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="../" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<Register />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="../shop" element={<Shoppage />} />
        <Route path="../../shop" element={<Cart />} />
        <Route path="/shop/:dataId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="../../checkout" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:idOrder" element={<Order/>} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
