const createError = require("http-errors");
const { schemaProfile } = require("../../utils/validation.schema");
const validateCreateRequest = async (userId, data) => {
  data.userId = userId;
  const validationResult = await schemaProfile.validateAsync(data);
};

module.exports = {
  validateCreateRequest,
};
