import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

// ----------------- IMPORT MODELS -----------------
import "./models/product_models.js";
import "./models/category_models.js";
import "./models/product_category_models.js"; 
import { sequelize } from "./config/db.js";

// ----------------- IMPORT ROUTES -----------------
import productRoutes from "./routes/product_routes.js";
import categoryRoutes from "./routes/category_routes.js";
import authRoutes from "./routes/auth_routes.js";
import profileRoutes from "./routes/profile_routes.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------- MIDDLEWARE -----------------
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ----------------- ROUTES -----------------
app.use("/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// ----------------- TEST ROUTE -----------------
app.get("/", (req, res) => {
  res.send("API is running!");
});

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ alter: true }) // trong dev có thể dùng force: true
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err);
  });
  

  export default app;
