import { z } from 'zod';

// Mirrors SRS section 8 (VAL-01 to VAL-07) and 7.2 Enquiry entity constraints.
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .regex(/^[a-zA-Z\u0900-\u097F\s.'-]+$/, 'Please enter a valid name'),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  service: z.string().min(1, 'Please select a service'),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be under 1000 characters')
    .optional()
    .or(z.literal('')),
});
