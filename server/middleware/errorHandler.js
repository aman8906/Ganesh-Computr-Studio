// SRS ERR-02: show a generic failure message; never expose stack traces,
// secrets, database details, or internal paths to the client.
export function notFoundHandler(req, res) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resource not found.' } });
}

export function errorHandler(err, req, res, next) {
  console.error('[error]', err); // full detail stays in server logs only

  if (err.name === 'ValidationError' || err.issues) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Some fields are invalid.',
        details: err.issues || err.errors,
      },
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: { code: 'CONFLICT', message: 'This record already exists.' } });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: {
      code: err.code || 'SERVER_ERROR',
      message: status === 500 ? 'Something went wrong. Please try again.' : err.message,
    },
  });
}
