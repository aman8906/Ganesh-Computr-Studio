// Matches the mock format already shown to users in the frontend (SG-482913),
// so switching from mock to real API doesn't change what customers see.
export function generateRequestId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SG-${random}`;
}
