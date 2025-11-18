import React from "react";
import Header from "../common/Header";
import ProductPage from "../pages/ProductPage";
import CategoriesPage from "../pages/CategoriesPage";
import banner2 from "../imgList/banner2.jpg";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      {/* Banner */}
      <div
        className="home-banner"
        style={{
          width: "100%",
        }}
      >
        <img
          src={banner2}
          alt="Banner"
          className="home-banner-img"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>

      <CategoriesPage />

      <ProductPage />
    </>
  );
};

export default Home;
