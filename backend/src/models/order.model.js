import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    projectType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Select project type",
        "Personal Website",
        "Business Website",
        "E-commerce",
        "Landing Page",
        "Branding",
        "Other",
      ],
      default: "Select project type",
    },
    budgetRange: {
      type: String,
      required: true,
      enum: [
        "Select budget",
        "Under $100",
        "$100 - $500",
        "$500 - $1,000",
        "$1,000 - $5,000",
        "Above $5,000",
      ],
      default: "Select budget",
    },
    projectDeadline: {
      type: Date,
    },
    projectBrief: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "in-progress", "completed", "cancelled"],
      default: "requested",
    },
    attachments: [
      {
        url: String,
        filename: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
