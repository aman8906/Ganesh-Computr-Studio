import nodemailer from 'nodemailer';
import axios from 'axios';

// ---- Email transporter (Gmail SMTP) ----
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * All notification functions are fire-and-forget from the caller's perspective:
 * they log failures but never throw, so a notification outage never blocks or
 * fails the actual enquiry creation (Architecture doc: "system can send or
 * queue notifications without blocking the core request transaction").
 */

export async function sendBusinessEmail({ requestId, name, phone, serviceLabel, message }) {
  if (!process.env.SMTP_USER || !process.env.BUSINESS_NOTIFY_EMAIL) {
    console.warn('[notify] Email not configured — skipping business email.');
    return;
  }

  try {
    await mailTransporter.sendMail({
      from: `"Shri Ganesh Website" <${process.env.SMTP_USER}>`,
      to: process.env.BUSINESS_NOTIFY_EMAIL,
      subject: `New Enquiry — ${requestId}`,
      html: `
        <h2>New Service Request</h2>
        <p><strong>Request ID:</strong> ${requestId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceLabel}</p>
        <p><strong>Message:</strong> ${message || '—'}</p>
      `,
    });
    console.log(`[notify] Business email sent for ${requestId}`);
  } catch (err) {
    console.error('[notify] Business email failed:', err.message);
  }
}

// ---- SMS via Fast2SMS ----

export async function sendBusinessSMS({ requestId, name, phone, serviceLabel }) {
  if (!process.env.FAST2SMS_API_KEY || !process.env.BUSINESS_NOTIFY_PHONE) {
    console.warn('[notify] SMS not configured — skipping business SMS.');
    return;
  }

  try {
    await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: `New enquiry ${requestId}: ${name} (${phone}) - ${serviceLabel}`,
        language: 'english',
        numbers: process.env.BUSINESS_NOTIFY_PHONE.replace('+91', ''),
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`[notify] Business SMS sent for ${requestId}`);
  } catch (err) {
    console.error('[notify] Business SMS failed:', err.response?.data || err.message);
  }
}

export async function sendCustomerConfirmationSMS({ requestId, phone, name }) {
  if (!process.env.FAST2SMS_API_KEY) {
    console.warn('[notify] SMS not configured — skipping customer SMS.');
    return;
  }

  try {
    await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message: `Hi ${name}, your request ID ${requestId} has been received by Shri Ganesh Computer & Studio. We'll contact you shortly.`,
        language: 'english',
        numbers: phone, // 10-digit Indian mobile from the enquiry form, no country code
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`[notify] Customer SMS sent for ${requestId}`);
  } catch (err) {
    console.error('[notify] Customer SMS failed:', err.response?.data || err.message);
  }
}

// ---- WhatsApp via Meta WhatsApp Cloud API ----

export async function sendCustomerConfirmationWhatsApp({ requestId, phone, name }) {
  if (!process.env.META_WHATSAPP_TOKEN || !process.env.META_WHATSAPP_PHONE_ID) {
    console.warn('[notify] Meta WhatsApp not configured — skipping customer WhatsApp.');
    return;
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v21.0/${process.env.META_WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: `91${phone}`,
        type: 'text',
        text: {
          body: `Hi ${name}, your request (ID: ${requestId}) has been received by Shri Ganesh Computer & Studio. We'll contact you shortly.`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`[notify] Customer WhatsApp sent for ${requestId}`);
  } catch (err) {
    console.error('[notify] Customer WhatsApp failed:', err.response?.data?.error?.message || err.message);
  }
}

/**
 * Fires all four notifications in parallel. Called after an enquiry is
 * successfully saved — never awaited by the HTTP response, so the customer
 * doesn't wait for SMS/email delivery to see their success screen.
 */
export function notifyNewEnquiry(enquiry) {
  const payload = {
    requestId: enquiry.requestId,
    name: enquiry.name,
    phone: enquiry.phone,
    serviceLabel: enquiry.serviceLabel,
    message: enquiry.message,
  };

  Promise.allSettled([
    sendBusinessEmail(payload),
    sendBusinessSMS(payload),
    sendCustomerConfirmationSMS(payload),
    sendCustomerConfirmationWhatsApp(payload),
  ]);
}