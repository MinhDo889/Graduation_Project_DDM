// src/pages/ProductPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import type { Product } from "../redux/types/auth";

const BASE_URL = "http://localhost:3001";

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Danh sách sản phẩm</h1>

        {loading && <p>Đang tải...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {products.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {products.map((p: Product) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  width: 200,
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "0.5rem" }}>
                  {p.image_url ? (
                    <img
                      src={
                        p.image_url.startsWith("http")
                          ? p.image_url
                          : `${BASE_URL}${p.image_url}`
                      }
                      alt={p.name}
                      style={{ width: "100%", height: 120, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: 120,
                        background: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>
                <h3>{p.name}</h3>
                <p>{p.price?.toLocaleString()} VND</p>
                <p style={{ fontSize: 12, color: "#555" }}>
                  {p.description || "-"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có sản phẩm nào</p>
        )}
      </div>
    </>
  );
};

export default ProductPage;
