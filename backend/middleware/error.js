const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Wrong MongoDB Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid, try again";
    err = new ErrorHandler(message, 401);
  }

  // JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired, try again";
    err = new ErrorHandler(message, 401);
  }

  // Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new ErrorHandler(message, 400);
  }

  // Multer error
  if (err.code === "LIMIT_FILE_SIZE") {
    const message = "File size is too large. Max size is 5MB";
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    const message = "Too many files uploaded. Max is 5 files";
    err = new ErrorHandler(message, 400);
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    const message = "Unexpected file field";
    err = new ErrorHandler(message, 400);
  }

  // Rate limiting error
  if (err.statusCode === 429) {
    const message = "Too many requests, please try again later";
    err = new ErrorHandler(message, 429);
  }

  // Log error for debugging
  console.error("Error:", {
    message: err.message,
    statusCode: err.statusCode,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
    path: req.path,
  });
};
