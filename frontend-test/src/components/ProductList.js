import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const role = user?.role;

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await axios.delete(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Đã xóa sản phẩm!");
      fetchProducts();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Lỗi khi xóa"));
    }
  };

  return (
    <div>
      <h3>📦 Danh sách sản phẩm</h3>
      {products.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 8 }}>
          <b>{p.name}</b> - {p.price}₫
          <p>{p.description}</p>
          {role === "admin" || role === "super_admin" ? (
            <button onClick={() => handleDelete(p.id)}>❌ Xóa</button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
