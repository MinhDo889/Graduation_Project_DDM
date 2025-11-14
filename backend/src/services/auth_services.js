import User from "../models/user_models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 🧩 Đăng ký tài khoản
export const registerUser = async ({ name, email, password, skin_type }) => {
  // Kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email đã được sử dụng");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo user mới
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    skin_type,
    role: "user", // 👈 thêm mặc định role nếu chưa có
  });

  // Tạo JWT cho user mới
  const token = jwt.sign(
    {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      skin_type: newUser.skin_type,
    },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  // Giải mã token để gửi luôn payload cho FE
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

  return {
    message: "Đăng ký thành công",
    token,
    decoded,
  };
};

// 🧩 Đăng nhập
export const loginUser = async ({ email, password }) => {
  // 1️⃣ Tìm user
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email không tồn tại");

  // 2️⃣ So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Sai mật khẩu");

  // 3️⃣ Tạo JWT
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      skin_type: user.skin_type,
    },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  // 4️⃣ Giải mã token để FE nhận payload
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

  // 5️⃣ Trả về token + decoded
  return {
    message: "Đăng nhập thành công",
    token,
    decoded,
  };
};
