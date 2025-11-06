import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
  });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/products`, form);
      alert("✅ Thêm sản phẩm thành công!");
      setForm({ name: "", description: "", price: "", categoryIds: [] });
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm sản phẩm");
    }
  };

  const handleCategoryChange = (id) => {
    setForm((prev) => {
      const isSelected = prev.categoryIds.includes(id);
      return {
        ...prev,
        categoryIds: isSelected
          ? prev.categoryIds.filter((cid) => cid !== id)
          : [...prev.categoryIds, id],
      };
    });
  };

  return (
    <div>
      <h2>➕ Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <br />
        <input
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <br />
        <label>Danh mục:</label>
        <div>
          {categories.map((cat) => (
            <label key={cat.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={form.categoryIds.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />{" "}
              {cat.name}
            </label>
          ))}
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Lưu sản phẩm
        </button>
      </form>
    </div>
  );
}
