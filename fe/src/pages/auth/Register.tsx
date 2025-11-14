import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSilce";
import type { RootState, AppDispatch } from "../../redux/store";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Header from "../../common/Header";

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
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div className="login-background">
        <div className="login-card">
          <h1>Đăng Ký F$ Limousine</h1>
          {error && <div className="alert error">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Họ và Tên</label>
              <div className="input-icon">
                <FaUser />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
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
              {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
