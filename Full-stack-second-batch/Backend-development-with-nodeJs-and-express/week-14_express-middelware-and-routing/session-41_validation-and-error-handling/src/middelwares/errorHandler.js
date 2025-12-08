const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  const isProd = process.env.NODE_ENV === "production";

  console.error(`Error: ${req.method} ${req.originalUrl}`, {
    status,
    message,
    details: err.details,
    stack: err.stack
  });

  res.status(status).json({
    status,
    message,
    ...(err.details ? { details: err.details } : {}),
    ...(isProd ? {} : { stack: err.stack })
  });
};

export default errorHandler;
