// controllers/order.controllers.js
import orderModel from "../models/order.model.js";
import uploadFile from "../services/storage.service.js"; // আপনার storage service

// ==========================
export const createOrder = async (req, res) => {
  try {
    const {
      fullname,
      emailAddress,
      phoneNumber,
      projectType,
      budgetRange,
      projectDeadline,
      projectBrief,
      attachments: attachmentsFromBody,
    } = req.body;

    // Ensure req.user exists (VerifyToken should set it)
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Basic validation
    if (
      !fullname ||
      !emailAddress ||
      !phoneNumber ||
      !projectType ||
      !budgetRange
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const attachments = [];

    // --- 1) Handle uploaded files (req.files may be object or array) ---
    let uploadedFileList = [];

    if (req.files) {
      // If req.files is an object (upload.fields), flatten its arrays
      if (!Array.isArray(req.files) && typeof req.files === "object") {
        uploadedFileList = Object.values(req.files).flat();
      } else if (Array.isArray(req.files)) {
        uploadedFileList = req.files;
      }
    }

    if (uploadedFileList.length > 0) {
      // Upload each file to storage (ImageKit)
      const uploadResults = await Promise.all(
        uploadedFileList.map(async (file) => {
          try {
            // Try calling uploadFile with file object first (many implementations accept multer file)
            try {
              const resp = await uploadFile(file, file.originalname);
              return {
                success: true,
                url: resp?.url || resp?.fileUrl || null,
                filename: resp?.name || file.originalname,
              };
            } catch (innerErr) {
              // Fallback: pass buffer + originalname (some earlier implementations expect buffer)
              const resp2 = await uploadFile(file.buffer, file.originalname);
              return {
                success: true,
                url: resp2?.url || resp2?.fileUrl || null,
                filename: resp2?.name || file.originalname,
              };
            }
          } catch (err) {
            console.error("Single file upload failed:", err);
            return { success: false, error: err.message || "Upload failed" };
          }
        })
      );

      // Push successful uploads into attachments
      uploadResults.forEach((r) => {
        if (r.success && r.url) {
          attachments.push({ url: r.url, filename: r.filename });
        } else {
          // optionally log r.error
          console.warn("Skipping failed upload:", r.error || r);
        }
      });
    }

    // --- 2) If frontend sent attachments as URLs in the body ---
    if (attachmentsFromBody) {
      try {
        const parsed =
          typeof attachmentsFromBody === "string"
            ? JSON.parse(attachmentsFromBody)
            : attachmentsFromBody;
        if (Array.isArray(parsed)) {
          parsed.forEach((a) => {
            if (a && (a.url || a.filename)) {
              attachments.push({
                url: a.url || "",
                filename: a.filename || "",
              });
            }
          });
        }
      } catch (err) {
        console.warn("Could not parse attachmentsFromBody:", err);
      }
    }

    // Build order
    const order = new orderModel({
      user: user._id,
      fullname,
      emailAddress,
      phoneNumber,
      projectType,
      budgetRange,
      projectDeadline: projectDeadline ? new Date(projectDeadline) : undefined,
      projectBrief,
      attachments,
    });

    await order.save();

    return res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Get orders for logged-in user
// ==========================
export const getUserOrders = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const orders = await orderModel
      .find({ user: user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("getUserOrders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Delete user's own order
// ==========================
export const deleteUserOrder = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      order.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await order.remove();
    return res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.error("deleteUserOrder error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin: Get all orders
// ==========================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "fullname emailAddress picture role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("getAllOrders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin: Update order status
// ==========================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "requested",
      "accepted",
      "in-progress",
      "completed",
      "cancelled",
    ];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await orderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin: Delete any order
// ==========================
export const deleteOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.remove();
    return res.status(200).json({ message: "Order deleted by admin" });
  } catch (err) {
    console.error("deleteOrderByAdmin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
