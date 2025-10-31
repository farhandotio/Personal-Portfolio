import express from "express";
import {
  listServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controllers.js";
import { VerifyToken, isAdmin } from "../middlewares/auth.middlewares.js";
import {
  createServiceValidation,
  updateServiceValidation,
} from "../middlewares/validation.middlewares.js";

const router = express.Router();

/** * Public Routes */
router.get("/", listServices);
router.get("/:slug", getServiceBySlug);

/** * Protected Admin Routes */
router.post("/", VerifyToken, isAdmin, createServiceValidation, createService);
router.patch("/:id", VerifyToken, isAdmin, updateServiceValidation, updateService);
router.delete("/:id", VerifyToken, isAdmin, deleteService);

export default router;
