// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSilce";
import { fetchProfile } from "../redux/slices/profileSlice";
import type { RootState, AppDispatch } from "../redux/store";
import { useState, useEffect } from "react";
import "./Header.css";
import logon from "../imgList/logon.png";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const BASE_URL = "http://localhost:3001";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { profile } = useSelector((state: RootState) => state.profile);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch profile khi login
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, isAuthenticated, user]);

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
          {isAuthenticated && user && profile ? (
            <div className="logged">
              <img
                src={`${BASE_URL}${profile.avatar_url || "/default-avatar.png"}`}
                alt={user.name || "User"}
                className="header-avatar"
                onClick={goToProfile}
              />
              <div className="user-info">
                <span className="user-name" onClick={goToProfile}>
                  {user.name || "User"}
                </span>
                <span className="user-email">{user.email || ""}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          ) : (
            <div className="auth">
              <Link to="/login" className="login-btn">
                <FaUser /> Log In
              </Link>
              <Link to="/register" className="register-btn">
                <FaUser /> Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Nav links */}
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
    </header>
  );
};

export default Header;
