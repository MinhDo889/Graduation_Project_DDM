import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

export default function CategoryForm() {
  const [name, setName] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Tên danh mục không được để trống!");
    try {
      await axios.post(`${API}/categories`, { name });
      alert("✅ Thêm danh mục thành công!");
      setName("");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm danh mục");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📁 Thêm danh mục</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Lưu
        </button>
      </form>
    </div>
  );
}
