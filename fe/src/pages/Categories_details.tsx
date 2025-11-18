import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCategoryById,
  type CategoryState,
} from "../redux/slices/categoriesSilce";
import type { RootState, AppDispatch } from "../redux/store";
import "./Categories_details.css";
import Header from "../common/Header";

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { categoryDetail, loading, error } = useSelector<
    RootState,
    CategoryState
  >((state) => state.categories);

  useEffect(() => {
    if (id) dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  if (loading) return <p>Đang tải chi tiết danh mục...</p>;
  if (error) return <p>Lỗi khi tải danh mục: {error}</p>;
  if (!categoryDetail) return <p>Không tìm thấy danh mục</p>;

  return (
    <>
      <Header />
      <div className="cat-detail">
        <header className="cat-header">
          <h1 className="cat-title">{categoryDetail.name}</h1>
          <p className="cat-description">{categoryDetail.description}</p>
        </header>

        <section className="cat-product-section">
          <h2 className="cat-product-title">Sản phẩm trong danh mục</h2>

          {categoryDetail.products && categoryDetail.products.length > 0 ? (
            <div className="cat-product-grid">
              {categoryDetail.products.map((product) => (
                <div key={product.id} className="cat-product-card">
                  <img
                    src={`http://localhost:3001/${product.image_url}`}
                    alt={product.name}
                    className="cat-product-img"
                  />
                  <h3 className="cat-product-name">{product.name}</h3>
                  <p className="cat-product-price">
                    Giá: {product.price.toLocaleString()} VNĐ
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="cat-empty">Danh mục chưa có sản phẩm.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default CategoryDetailPage;
