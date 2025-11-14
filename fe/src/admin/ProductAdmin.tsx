// src/pages/ProductAdmin.tsx
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../redux/slices/productSlice";
import { fetchCategories } from "../redux/slices/categoriesSilce";
import "./ProductAdmin.css";
import Header from "../common/Header";
import type { Product } from "../redux/types/auth";

const ProductAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { categories } = useSelector((state: RootState) => state.categories);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch products & categories
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Number(price).toString());
    formData.append("description", description);
    formData.append("stock", stock.toString());
    formData.append("rating", rating.toString());
    if (image) formData.append("image", image);
    selectedCategories.forEach((id) => formData.append("categoryIds[]", id));

    try {
      if (editId) {
        await dispatch(updateProduct({ id: editId, data: formData })).unwrap();
        setEditId(null);
      } else {
        await dispatch(createProduct(formData)).unwrap();
      }

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setSelectedCategories([]);
      setStock(0);
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description || "");
    setStock(product.stock || 0);
    setRating(product.rating || 0);
    setEditId(product.id);
    setSelectedCategories(product.categories?.map((c) => c.id) || []);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Quản lý Sản phẩm</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Số lượng tồn kho"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            min={0}
          />
          <input
            type="number"
            placeholder="Đánh giá"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={0}
            max={5}
            step={0.1}
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            key={editId || "new"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />

          {/* Multi-select danh mục */}
          <div className="mb-2">
            <label>Chọn danh mục:</label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((c) => (
                <div key={c.id} className="form-check">
                  <input
                    type="checkbox"
                    id={`cat-${c.id}`}
                    className="form-check-input"
                    value={c.id}
                    checked={selectedCategories.includes(c.id)}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedCategories((prev) =>
                        prev.includes(id)
                          ? prev.filter((x) => x !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  <label htmlFor={`cat-${c.id}`} className="form-check-label">
                    {c.name} ({c.description})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">{editId ? "Cập nhật" : "Thêm sản phẩm"}</button>
        </form>

        {loading && <p>Đang tải...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div>
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div>
                <strong>{p.name}</strong> - {p.price} VND
                <br />
                Số lượng: {p.stock || 0}, Đánh giá: {p.rating || 0}
                <br />
                {p.image_url && (
                  <img
                    src={`http://localhost:3001${p.image_url}`}
                    alt={p.name}
                    width={60}
                  />
                )}
                <div>
                  <small>
                    Danh mục:{" "}
                    {p.categories?.map((c) => c.name).join(", ") || "Chưa có"}
                  </small>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-warning" onClick={() => handleEdit(p)}>
                  Sửa
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductAdmin;
