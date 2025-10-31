import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OfferingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ServiceOverviewSchema = new Schema(
  {
    description: { type: String, trim: true, default: "" },
    keyTechnologies: { type: [String], default: [] },
    offerings: { type: [OfferingSchema], default: [] },
  },
  { _id: false }
);

const WhatsIncludedSchema = new Schema(
  {
    sectionTitle: { type: String, required: true, trim: true },
    iconName: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const ProcessStepSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const TimelineEstimateSchema = new Schema(
  {
    projectType: { type: String, required: true, trim: true },
    duration: { type: String, trim: true },
    inclusions: { type: [String], default: [] },
  },
  { _id: false }
);

const ServiceSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: { type: String, required: true, trim: true },
    heroDescription: { type: String, trim: true, maxlength: 500 },
    heroImageUrl: { type: String, trim: true },

    serviceOverview: { type: ServiceOverviewSchema, default: () => ({}) },
    whatsIncluded: { type: [WhatsIncludedSchema], default: [] },
    processSteps: { type: [ProcessStepSchema], default: [] },
    timelineEstimate: { type: [TimelineEstimateSchema], default: [] },

    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    meta: {
      seoTitle: { type: String, trim: true },
      seoDescription: { type: String, trim: true },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.pre("save", function (next) {
  if (this.slug)
    this.slug = this.slug.trim().toLowerCase().replace(/\s+/g, "-");
  next();
});

const serviceModel = model("service", ServiceSchema);
export default serviceModel;
