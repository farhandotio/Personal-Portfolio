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

const uploadFields = upload.fields([
  { name: "attachments", maxCount: 10 },
  { name: "attachments[]", maxCount: 10 },
  { name: "files", maxCount: 10 },
]);

router.post(
  "/create",
  (req, res, next) => {
    uploadFields(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      next();
    });
  },
  createOrder
);

router.get("/all", VerifyToken, isAdmin, getAllOrders);
router.patch("/update/:id", VerifyToken, isAdmin, updateOrderStatus);
router.delete("/admin/delete/:id", VerifyToken, isAdmin, deleteOrderByAdmin);

export default router;
