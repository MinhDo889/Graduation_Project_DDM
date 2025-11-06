import React, { useState, useEffect } from "react";
import { createProfile, getProfile } from "../api/api";

const ProfilePage = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ phone_number: "", address: "", city: "" });
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const data = await getProfile(user.id, token);
    if (!data.message) setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("phone_number", form.phone_number);
    formData.append("address", form.address);
    formData.append("city", form.city);
    if (file) formData.append("avatar", file);

    const data = await createProfile(formData, token);
    alert(data.message || "Cập nhật thành công!");
    fetchProfile();
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>Thông tin cá nhân</h2>
      {profile && (
        <div>
          {profile.avatar_url && (
            <img
              src={`http://localhost:3001${profile.avatar_url}`}
              alt="avatar"
              width={120}
              style={{ borderRadius: "50%" }}
            />
          )}
          <p>📞 {profile.phone_number}</p>
          <p>🏠 {profile.address}</p>
          <p>🏙️ {profile.city}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Số điện thoại"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />
        <input
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          placeholder="Thành phố"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Lưu Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
