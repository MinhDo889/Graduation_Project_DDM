import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

export default function ProductForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Lấy token từ localStorage sau khi login
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/products`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Thêm sản phẩm thành công!");
      setForm({ name: "", description: "", price: "" });
      onAdded(); // refresh danh sách
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.response?.data?.message || "Lỗi khi thêm sản phẩm"));
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, borderRadius: 8, marginBottom: 20 }}>
      <h3>➕ Thêm sản phẩm</h3>
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
        <button type="submit" style={{ marginTop: "10px" }}>Lưu sản phẩm</button>
      </form>
    </div>
  );
}
