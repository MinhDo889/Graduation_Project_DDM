// src/pages/CategoriesPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchCategories } from "../redux/slices/categoriesSilce";
import type { Category } from "../redux/types/auth";
import "./CategoriesPage.css";

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // --- Chuyển route mà không reload ---
  const handleCategoryClick = (id: string) => {
    navigate(`/categories/${id}`);
  };

  return (
    <div className="categories-page">
      <div className="categories-container">
        {loading && <p className="categories-loading">Đang tải...</p>}
        {error && <p className="categories-error">{error}</p>}

        {categories.length > 0 ? (
          <div className="categories-list">
            {categories.map((cat: Category) => (
              <div key={cat.id} className="category-wrapper">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="category-item"
                >
                  {cat.name}
                </button>
                <span className="category-tooltip">{cat.description}</span>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="categories-empty">Chưa có danh mục nào</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
