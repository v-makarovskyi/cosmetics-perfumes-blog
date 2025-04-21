class ServerFieldValidationError extends Error {
  constructor(err = {}) {
    const { validationErrors, statusCode } = err

    super();
    this.name = "ServerFieldValidationError";
    this.validationErrors = validationErrors;
    this.statusCode = statusCode;
    this.message =
      "Ошибка при заполнении регистрационных данных. Будьте внимательнее и следуйте подсказкам полей.";
  }

  get errorsDetail() {
    const errors = Object.values(this.validationErrors?.errors).map((errObj) => {
      return {
        fieldName: errObj?.path,
        message: errObj?.msg,
      };
    });
    return errors;
  }
}

module.exports = ServerFieldValidationError;
