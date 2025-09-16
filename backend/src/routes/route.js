import express from "express";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  addPurchase,
  getPurchases,
  llmSuggest,
} from "../controllers/controller.js";
import {
  checkPassword,
  authMiddleware,
} from "../controllers/authController.js";

const router = express.Router();

// เพิ่ม route ตรวจสอบรหัสผ่าน
router.post("/check-password", checkPassword);

// ---------- ITEMS ----------
router.get("/items", getItems);
router.post("/items", authMiddleware, addItem);
router.delete("/items/:id", authMiddleware, deleteItem);
router.put("/items/:id", authMiddleware, updateItem);

// ---------- PURCHASES ----------
router.post("/purchases", addPurchase);
router.get("/purchases", authMiddleware, getPurchases);

// ---------- LLM ----------
router.post("/llm", llmSuggest);

export default router;
