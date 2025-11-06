import React, { useState } from "react";
import { registerUser, loginUser } from "../api/api";

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = isLogin ? await loginUser(form) : await registerUser(form);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } else {
      alert(data.message || "Thao tác thất bại!");
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
      {!isLogin && (
        <input
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
      </p>
    </div>
  );
};

export default AuthPage;
