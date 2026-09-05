import { z } from 'zod';

// Mirrors client/src/lib/validation.js and SRS section 8 (VAL-01 to VAL-07).
// Keeping both in sync matters: the frontend blocks bad input before it's sent,
// but the backend is the actual authority — SEC-04 requires server-side validation
// regardless of what the client already checked.
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
  service: z.string().trim().min(1, 'Please select a service'), // slug, or "other"
  message: z.string().trim().max(1000, 'Message must be under 1000 characters').optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'In Progress', 'Waiting for Customer', 'Ready', 'Completed', 'Cancelled']),
  note: z.string().trim().max(500).optional(),
});

export const serviceSchema = z.object({
  name: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers and hyphens'),
  category: z.string().min(1, 'Category is required'), // ObjectId string
  shortDescription: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional().or(z.literal('')),
  requirements: z.string().trim().max(500).optional().or(z.literal('')),
  turnaround: z.string().trim().max(200).optional().or(z.literal('')),
  priceFrom: z.number().nonnegative().optional(),
  image: z.string().trim().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
});
