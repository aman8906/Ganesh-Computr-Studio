// Wraps a Zod schema into an Express middleware. On failure it forwards a
// shaped error to errorHandler.js so the client always gets VALIDATION_ERROR.
export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.issues = result.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      }));
      return next(err);
    }
    req.body = result.data;
    next();
  };
}
