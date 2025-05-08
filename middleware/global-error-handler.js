const ServerFieldValidationError = require("../errors/server-validation-error");
const AuthError = require("../errors/auth-error");
const { Result } = require("express-validator");
const jwt = require("jsonwebtoken");

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorName = error.name;
  let errorMessage = error.message;
  let errorMessagesArray = [];

  if (error.name === "TokenExpiredError") {
    let queryString;
    let params = req.body["targetUrl"].split("/").filter(Boolean);
    let paramsSlicedArray = [];
    const SIZE = 2;
    for (let i = 0; i < params.length; i += SIZE) {
      paramsSlicedArray.push(params.slice(i, i + SIZE));
    }

    params = Object.fromEntries(paramsSlicedArray);
    queryString = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    res.redirect(`/api/auth/refresh_token?${queryString}`);
    return;
  } else if (error.validationErrors instanceof Result) {
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
