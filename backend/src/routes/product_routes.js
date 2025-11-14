import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../middleware/upload_product.js"; // 🆕 thêm middleware upload ảnh

const router = express.Router();

// =====================
// 🛍️ ROUTES SẢN PHẨM
// =====================

// Ai cũng xem được danh sách và chi tiết sản phẩm
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Chỉ admin hoặc super_admin được thêm / sửa / xóa sản phẩm
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  uploadProductImage.single("image"), // 🆕 upload ảnh 1 file
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "super_admin"),
  uploadProductImage.single("image"), // 🆕 cho phép update ảnh mới
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("super_admin"),
  deleteProduct
);

export default router;
