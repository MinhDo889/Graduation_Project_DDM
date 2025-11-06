import { validationResult } from "express-validator";
import { registerUser, loginUser } from "../services/auth_services.js";

// Đăng ký user
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({ message: "Đăng ký thành công", userId: newUser.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Đăng nhập user
export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({ message: "Đăng nhập thành công", ...result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
