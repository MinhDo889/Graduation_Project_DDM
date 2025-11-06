import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product_controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getAllProducts);
router.post("/",verifyToken, createProduct);
router.get("/:id", getProductById);
router.put("/:id",verifyToken, updateProduct);
router.delete("/:id",verifyToken, deleteProduct);

export default router;
