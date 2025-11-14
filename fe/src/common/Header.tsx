import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSilce";
import type { RootState, AppDispatch } from "../redux/store";
import { useState } from "react";
import "./Header.css";
import logon from "../imgList/logon.png";

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

  return (
    <header>
      <nav className="navbar">
        <div className="container-navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logon} alt="Logo" />
          </Link>

          {/* Menu chính */}
          <ul className="nav-links">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/collection">Bộ sưu tập</Link>
            </li>
            <li>
              <Link to="/sale">Khuyến mãi</Link>
            </li>
            <li>
              <Link to="/blog">Cẩm nang đẹp</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>

          {/* Search + User actions */}
          <div className="nav-actions">
            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Tìm</button>
            </form>

            {/* Hiển thị đăng nhập / đăng ký hoặc đăng xuất */}
            {isAuthenticated && user ? (
              <>
                <span style={{ marginRight: "10px" }}>
                  Xin chào, {user.name || user.email}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-register">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
