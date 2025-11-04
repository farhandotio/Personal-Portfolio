// routes/order.routes.js
import express from "express";
import multer from "multer";
import { VerifyToken, isAdmin } from "../middlewares/auth.middlewares.js";
import {
  createOrder,
  getUserOrders,
  deleteUserOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrderByAdmin,
} from "../controllers/order.controllers.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// user
router.post("/create", VerifyToken, upload.array("attachments"), createOrder);
router.get("/my-orders", VerifyToken, getUserOrders);
router.delete("/delete/:id", VerifyToken, deleteUserOrder);

// admin
router.get("/all", VerifyToken, isAdmin, getAllOrders);
router.patch("/update/:id", VerifyToken, isAdmin, updateOrderStatus);
router.delete("/admin/delete/:id", VerifyToken, isAdmin, deleteOrderByAdmin);

export default router;
