// src/pages/ProfilePage.tsx
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProfile, updateProfile } from "../redux/slices/profileSlice";
import Header from "../common/Header";
import { toast } from "react-toastify";
import "./ProfilePage.css";

const BASE_URL = "http://localhost:3001"; // nếu avatar lưu local

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState({
    phone_number: "",
    address: "",
    city: "",
    country: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    const data = new FormData();
    data.append("phone_number", formData.phone_number);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("country", formData.country);
    if (avatarFile) data.append("avatar", avatarFile);

    try {
      await dispatch(updateProfile({ user_id: user.id, data })).unwrap();
      toast.success("Cập nhật profile thành công!");
    } catch (err: any) {
      console.error(err);
      toast.error("Cập nhật profile thất bại. Vui lòng thử lại!");
    }
  };

  if (!user) return <p>Vui lòng đăng nhập để xem profile</p>;

  return (
    <>
      <Header />
      <div className="profile-container">
        <h1>Thông tin cá nhân</h1>
        {loading && <p>Đang tải...</p>}
        {profile && (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-avatar">
              <img
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : profile.avatar_url
                    ? `${BASE_URL}${profile.avatar_url}`
                    : "/default-avatar.png"
                }
                alt="avatar"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="profile-field">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Thành phố:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Quốc gia:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="profile-btn">
              Cập nhật thông tin
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
