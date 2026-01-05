import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products"; // Your Shop Page
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login"; // New
import OrderTracking from "../pages/OrderTracking"; // New
import Orders from "../pages/Orders";

import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminLogin from "../pages/admin/AdminLogin";

import AdminOrders from "../pages/admin/AdminOrders";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminSettings from "../pages/admin/AdminSettings";

import AdminProductForm from "../pages/admin/AdminProductForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/orders" element={<Orders />} />
      {/* NEW ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} /> {/* Uses same component */}
      <Route path="/track-order" element={<OrderTracking />} />
      {/* ADMIN AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* ADMIN ROUTES (Protected Layout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> {/* /admin */}
        <Route path="products" element={<AdminProducts />} />{" "}
        {/* /admin/products */}
        <Route path="orders" element={<AdminOrders />} />{" "}
        {/* /admin/orders */}
        <Route path="customers" element={<AdminCustomers />} />{" "}
        {/* /admin/customers */}
        <Route path="settings" element={<AdminSettings />} />{" "}
        {/* /admin/settings */}

        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />      {/* Create */}
        <Route path="products/edit/:id" element={<AdminProductForm />} /> {/* Edit */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
