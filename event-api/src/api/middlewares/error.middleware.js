import { ApiError } from "./apiError";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";

const handleValidationErrorMongo = (err) => {
  const errors = Object.values(err.errors).map((item) => item.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, BAD_REQUEST);
};

const handleCastErrorMongo = (err) => {
  const message = `Invalid input data. ${err.value}`;
  return new ApiError(message, BAD_REQUEST);
};

export default (err, req, res, next) => {
  let error = { ...err };
  if (err.name === "ValidationError") {
    error = handleValidationErrorMongo(error);
  }
  if (err.name === "CastError") {
    error = handleCastErrorMongo(error);
  }

  error.statusCode =
    error.statusCode || err.statusCode || INTERNAL_SERVER_ERROR;
  error.message = error.message || err.message;

  // overwrite internal, maybe sensitive error messages
  if (error.statusCode === INTERNAL_SERVER_ERROR) {
    error.message = "INTERNAL ERROR";
  }

  res.status(error.statusCode).json({
    message: error.message,
  });
};
