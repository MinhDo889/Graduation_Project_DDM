const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createProfile = async (formData, token) => {
  const res = await fetch(`${API_URL}/api/profiles`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

export const getProfile = async (userId, token) => {
  const res = await fetch(`${API_URL}/api/profiles/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
