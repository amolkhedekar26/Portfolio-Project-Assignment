const createError = require("http-errors");

const validateCreateRequest = async (userId, data) => {
  if (!userId || userId === "") {
    throw new createError(400, "Userid is required");
  }
  if (!data.project) {
    throw new createError(422, "Project is required");
  }
  if (!data.project.name || data.project.name === "") {
    throw new createError(422, "Project name is required");
  }
  if (!data.project.description || data.project.description === "") {
    throw new createError(422, "Project description is required");
  }
  if (data.project.skills) {
    if (!Array.isArray(data.project.skills)) {
      throw new createError(422, "Project skills must be an array");
    }
  }
};

module.exports = {
  validateCreateRequest,
};
