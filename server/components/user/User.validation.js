const CreateError = require("http-errors");
const {
  schemaRegister,
  schemaLogin,
} = require("../../utils/validation.schema");

const validateUserRegister = async (data) => {
  try {
    const result = await schemaRegister.validateAsync(data);
    return result;
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    throw new CreateError(error);
  }
};

const validateUserLogin = async (data) => {
  try {
    const result = await schemaLogin.validateAsync(data);
    return result;
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    throw new CreateError(error);
  }
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};
