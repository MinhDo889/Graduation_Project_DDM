// src/pages/auth/Login.tsx
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSilce";
import type { RootState, AppDispatch } from "../../redux/store";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Header from "../../common/Header";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Hàm chuyển hướng theo role
  const redirectByRole = (role: string | null) => {
    if (!role) return; // Nếu null thì không làm gì
    if (role === "admin" || role === "super_admin") navigate("/product_admin");
    else navigate("/");
  };

  // Ngăn truy cập lại trang login khi đã login
  useEffect(() => {
    if (user?.token) {
      redirectByRole(user.role);
      return;
    }

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      redirectByRole(role);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        const role = result.payload.role;
        // Lưu token & role vào localStorage
        localStorage.setItem("role", role);
        redirectByRole(role);
      }
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="login-background">
        <div className="login-card">
          <h1>F$ Limousine</h1>
          {error && <div className="alert error">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-icon">
                <FaEnvelope />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-icon">
                <FaLock />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
