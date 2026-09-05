import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    requirements: { type: String, trim: true },
    turnaround: { type: String, trim: true },
    priceFrom: { type: Number },
    image: { type: String, trim: true },
    isActive: { type: Boolean, default: true }, // SRS FR-SVC-04: inactive services never appear publicly
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ name: 'text', shortDescription: 'text' });

export default mongoose.model('Service', serviceSchema);
