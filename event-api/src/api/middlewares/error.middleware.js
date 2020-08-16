import { ApiError } from "./apiError";

const handleValidationErrorMongo = (err) => {
  const errors = Object.values(err.errors).map((item) => item.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

export default (err, req, res, next) => {
  let error = { ...err };
  if (error.name === "ValidationError") {
    error = handleValidationErrorMongo(error);
  }
  error.statusCode = err.statusCode || 500;
  error.message = error.message || err.message;

  // overwrite internal, maybe sensitive error messages
  if (error.statusCode === 500) {
    error.message = "INTERNAL ERROR";
  }

  res.status(error.statusCode).json({
    message: error.message,
  });
};
