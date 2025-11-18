import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSilce";
import type { RootState, AppDispatch } from "../../redux/store";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Header from "../../common/Header";
import "./Register.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ name, email, password }));

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="register-background-register">
        <div className="register-card-register">
          <h1 className="brand-title-register">D$&Care</h1>

          {error && <div className="alert-error-register">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form-register">
            <div className="form-group-register">
              <label>Họ và Tên</label>
              <div className="input-icon-register">
                <FaUser />
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-register">
              <label>Email</label>
              <div className="input-icon-register">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-register">
              <label>Mật khẩu</label>
              <div className="input-icon-register">
                <FaLock />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-register-register"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
          </form>

          <p className="register-switch-register">
            Đã có tài khoản?{" "}
            <span onClick={() => navigate("/login")}>Đăng nhập ngay</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
