class ValidationError extends Error {
  constructor(message, errors, statusCode) {
    super(message);

    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export default ValidationError;
