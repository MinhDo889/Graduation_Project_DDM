import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/Categories_details";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"; // <-- thêm import

// Admin
import ProductAdmin from "./admin/ProductAdmin";

// Components / Main pages
import Product from "./pages/main/Product"; // ✅ bỏ 'type' vì dùng JSX

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product_list" element={<ProductPage />} />
        <Route path="/category_list" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
        <Route path="/product_admin" element={<ProductAdmin />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product" element={<Product />} />{" "}
        <Route path="/profile/:user_id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
