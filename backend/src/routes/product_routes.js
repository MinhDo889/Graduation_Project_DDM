import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ai cũng xem được
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Chỉ admin và super_admin mới được thêm/sửa/xóa
router.post("/", verifyToken, authorizeRoles("admin", "super_admin"), createProduct);
router.put("/:id", verifyToken, authorizeRoles("admin", "super_admin"), updateProduct);
router.delete("/:id", verifyToken, authorizeRoles("super_admin"), deleteProduct);

export default router;
