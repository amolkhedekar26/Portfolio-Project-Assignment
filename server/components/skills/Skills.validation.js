const CreateError = require("http-errors");

const validateCreateRequest = async (userId, data) => {
  if (!userId || userId === "") {
    throw new CreateError(401, "Userid is required");
  }
  if (!data.skill) {
    throw new CreateError(422, "Skill is required");
  }
  if (!data.skill.name || data.skill.name === "") {
    throw new CreateError(422, "Skill name is required");
  }
  if (!data.skill.level || data.skill.level === "") {
    throw new CreateError(422, "Skill level is required");
  }
  if (data.skill.level < 1 || data.skill.level > 5) {
    throw CreateError(422, "Skill level must be between 1 and 5");
  }
};

module.exports = {
  validateCreateRequest,
};
