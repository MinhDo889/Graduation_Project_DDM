import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import type { Product } from "../redux/types/auth";
import "./ProductPage.css";

const BASE_URL = "http://localhost:3001/";

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCardClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product_page-container">
      <h1 className="product_page-title">Danh sách sản phẩm</h1>

      {loading && <p className="product_page-loading">Đang tải...</p>}
      {error && <p className="product_page-error">{error}</p>}

      {products.length > 0 ? (
        <div className="product_page-list">
          {products.map((p: Product) => (
            <div
              key={p.id}
              className="product_page-card"
              onClick={() => handleCardClick(p.id)}
              style={{ cursor: "pointer" }} // thêm con trỏ chuột
            >
              {p.image_url ? (
                <img
                  src={
                    p.image_url.startsWith("http")
                      ? p.image_url
                      : `${BASE_URL}${p.image_url}`
                  }
                  alt={p.name}
                  className="product_page-image"
                />
              ) : (
                <div className="product_page-image-fallback">No Image</div>
              )}

              <h3 className="product_page-name">{p.name}</h3>
              <p className="product_page-price">
                {p.price?.toLocaleString()} VND
              </p>
              <p className="product_page-description">{p.description || "-"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="product_page-empty">Chưa có sản phẩm nào</p>
      )}
    </div>
  );
};

export default ProductPage;
