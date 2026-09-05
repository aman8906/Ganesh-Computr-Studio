import mongoose from 'mongoose';

// SRS BR-03: new enquiries default to 'New'.
// Architecture doc section 21: status transitions enforced server-side, not by frontend dropdowns.
export const ENQUIRY_STATUSES = [
  'New',
  'Contacted',
  'In Progress',
  'Waiting for Customer',
  'Ready',
  'Completed',
  'Cancelled',
];

const enquirySchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, unique: true }, // e.g. SG-482913, shown to the customer
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    phone: { type: String, required: true, trim: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }, // null when "Other" was selected
    serviceLabel: { type: String, trim: true }, // denormalized snapshot: service name at time of submission, or "Other"
    message: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'New' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: [
      {
        text: { type: String, trim: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    // Basic abuse control (SRS FR-ENQ-06 / SEC-08): remembers submitting IP for rate limiting audits.
    ip: { type: String },
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ phone: 1 });

export default mongoose.model('Enquiry', enquirySchema);
