// src/pages/CategoriesPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchCategories } from "../redux/slices/categoriesSilce";
import type { Category } from "../redux/types/auth";

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">
          Danh sách danh mục
        </h1>

        {loading && <p className="text-gray-500">Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {categories.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {categories.map((cat: Category) => (
              <li
                key={cat.id}
                className="p-2 border rounded hover:bg-pink-50 transition"
              >
                <strong>{cat.name}</strong>: {cat.description || "-"}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-gray-500">Chưa có danh mục nào</p>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
