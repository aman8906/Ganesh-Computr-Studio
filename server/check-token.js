import 'dotenv/config';

const token = process.env.META_WHATSAPP_TOKEN;
const phoneId = process.env.META_WHATSAPP_PHONE_ID;

console.log('Token exists:', Boolean(token));
console.log('Token length:', token?.length || 0);
console.log('Token first 15 chars:', token?.slice(0, 15));
console.log('Token last 10 chars:', token?.slice(-10));
console.log('Phone ID:', phoneId);