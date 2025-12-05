const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;

  const message = err.message || "Internal Server Error";

  console.error("Error:", err);

  res.status(status).json({
    status,
    message,
    stack: err.stack
  });
};

export default errorHandler;
