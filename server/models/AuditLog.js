import mongoose from 'mongoose';

// Architecture doc ADM-06 / SEC section: administrative changes should record actor + timestamp.
const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g. 'enquiry.status_update', 'service.create'
    entity: { type: String, required: true }, // e.g. 'Enquiry', 'Service'
    entityId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('AuditLog', auditLogSchema);
