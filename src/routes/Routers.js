import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./../pages/Cart";
import Login from "./../pages/Login";
import Product from "./../components/Product";
import Shop from "../pages/Shop";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import Registration from "../pages/Registration";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Routers;
