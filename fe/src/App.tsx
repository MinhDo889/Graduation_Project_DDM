import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import ProductAdmin from "./admin/ProductAdmin";
import CategoriesPage from "./pages/CategoriesPage";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product_list" element={<ProductPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/category_list" element={<CategoriesPage />}></Route>
        <Route path="/product_admin" element={<ProductAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
