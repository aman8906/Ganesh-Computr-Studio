import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    address: { type: String, required: true },
    addressHindi: { type: String },
    proprietor: { type: String },
    workingHours: { type: String },
    mapUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Business', businessSchema);
