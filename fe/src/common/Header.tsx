// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSilce";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";
import "./Header.css";
import logon from "../imgList/logon.png";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const goToProfile = () => {
    if (user?.id) navigate(`/profile/${user.id}`);
  };

  return (
    <header className="hdt-header">
      <div className="hdt-top">
        <div className="hdt-container">
          {/* Logo */}
          <Link to="/" className="hdt-logo">
            <img src={logon} alt="Logo" />
          </Link>

          {/* Search */}
          <form className="hdt-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Sữa rửa mặt Cosrx, tẩy tế bào chết Huxley mini,…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Cart */}
          <Link to="/cart" className="hdt-cart">
            <FaShoppingCart />
          </Link>

          {/* User */}
          <div className="hdt-user">
            {isAuthenticated && user ? (
              <div className="logged">
                <span
                  className="user-name"
                  onClick={goToProfile}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {user.name && user.email
                    ? `${user.name} - ${user.email}`
                    : ""}
                </span>
                <button className="logout" onClick={handleLogout}>
                  Log Out <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="auth">
                <Link to="/login" className="login-btn">
                  <FaUser /> Đăng nhập
                </Link>
                <Link to="/register" className="register-btn">
                  <FaUser /> Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Main nav */}
          <nav className="hdt-nav">
            <ul>
              <li>
                <Link to="/">Tất cả</Link>
              </li>
              <li>
                <Link to="/product">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/blogs">Xu hướng làm đẹp</Link>
              </li>
              <li>
                <Link to="/brands">Thương hiệu</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
