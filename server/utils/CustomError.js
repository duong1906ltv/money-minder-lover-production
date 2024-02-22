class CustomError extends Error {
  originalError = null;
  errors = [];

  constructor(errorName, errorMessage, originalError = null) {
    super(errorMessage);
    this.name = errorName;
    this.originalError = originalError;
    this.errors = [];
  }
}

export default CustomError;
