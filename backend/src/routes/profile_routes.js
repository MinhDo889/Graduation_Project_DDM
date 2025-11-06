import express from "express";
import upload from "../middleware/upload.js";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profile_controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Tạo profile (chỉ user đã đăng nhập)
router.post("/", verifyToken, upload.single("avatar"), createProfile);

// ✅ Lấy profile (ai cũng có thể xem hoặc yêu cầu đăng nhập tuỳ chính sách)
router.get("/:user_id", getProfile);

// ✅ Cập nhật profile (chỉ chủ sở hữu hoặc admin)
router.put("/:user_id", verifyToken, upload.single("avatar"), updateProfile);



export default router;
