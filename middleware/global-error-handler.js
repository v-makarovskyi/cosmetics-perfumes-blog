const ServerFieldValidationError = require("../errors/server-validation-error");
const AuthError = require("../errors/auth-error");
const { Result } = require("express-validator");
const jwt = require("jsonwebtoken");

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorName = error.name;
  let errorMessage = error.message;
  let errorMessagesArray = [];

  if (error.validationErrors && error.validationErrors instanceof Result) {
    error = new ServerFieldValidationError(error);
    errorName = error.name;
    statusCode = error.statusCode;
    errorMessage = error.message;
    errorMessagesArray = error.errorsDetail;
  } else if (error instanceof AuthError) {
    statusCode = error.statusCode;
    errorMessagesArray = [
      {
        location: req.originalUrl,
        message: `Ошибка в ${req.originalUrl}`,
      },
    ];
  } else if (error instanceof Error) {
    errorMessagesArray = [
      {
        location: req.originalUrl,
        message: `Ошибка в ${req.originalUrl}`,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    errorName,
    statusCode,
    errorMessage,
    errorMessagesArray,
    stack: req.app.get("env") === "development" ? error?.stack : {},
  });
};
module.exports = globalErrorHandler;
