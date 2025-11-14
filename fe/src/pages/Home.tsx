import React from "react";
import Header from "../common/Header";
import ProductPage from "../pages/ProductPage";
import CategoriesPage from "../pages/CategoriesPage";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <CategoriesPage />

      <ProductPage />
    </>
  );
};

export default Home;
