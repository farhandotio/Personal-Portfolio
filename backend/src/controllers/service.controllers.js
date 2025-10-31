// controllers/service.controllers.js
import { validationResult } from "express-validator";
import serviceModel from "../models/service.model.js";

/**
 * Helpers
 */
const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Validation error");
    err.status = 422;
    err.details = errors.array();
    throw err;
  }
};

/**
 * GET /api/services
 * Supports: ?search=&page=&limit=&featured=
 */
export const listServices = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 20, featured } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));

    const filter = {};
    if (search) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { "meta.seoTitle": regex },
        { "serviceOverview.description": regex },
      ];
    }
    if (typeof featured !== "undefined") {
      filter.featured = featured === "true" || featured === "1";
    }

    const [total, items] = await Promise.all([
      serviceModel.countDocuments(filter),
      serviceModel
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .lean(),
    ]);

    return res.json({
      success: true,
      meta: {
        total,
        page: pageNum,
        limit: pageSize,
        pages: Math.ceil(total / pageSize),
      },
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/services/:slug
 */
export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await serviceModel.findOne({ slug }).lean();
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    return res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/services
 * Protected, admin only
 */
export const createService = async (req, res, next) => {
  try {
    handleValidationErrors(req);
    const payload = req.body;

    // Normalize slug
    if (payload.slug) payload.slug = payload.slug.trim().toLowerCase().replace(/\s+/g, "-");

    const exists = await serviceModel.findOne({ slug: payload.slug });
    if (exists) {
      return res.status(409).json({ success: false, message: "slug already exists" });
    }

    const created = await serviceModel.create(payload);
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/services/:id
 * Protected, admin only
 */
export const updateService = async (req, res, next) => {
  try {
    handleValidationErrors(req);
    const { id } = req.params;
    const update = req.body;

    if (update.slug) {
      update.slug = update.slug.trim().toLowerCase().replace(/\s+/g, "-");
      const found = await serviceModel.findOne({ slug: update.slug, _id: { $ne: id } });
      if (found) {
        return res.status(409).json({ success: false, message: "slug already in use" });
      }
    }

    const updated = await serviceModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ success: false, message: "Service not found" });

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/services/:id
 * Protected, admin only
 */
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await serviceModel.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ success: false, message: "Service not found" });
    return res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    next(err);
  }
};
