const skillsService = require("./Skills.service");
const { handleSuccessResponse } = require("../../utils/response");

const createSkills = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await skillsService.createSkills(userId, req.body);
    handleSuccessResponse(res, result, "Skills created successfully", 201);
  } catch (err) {
    next(err);
  }
};

const getAllSkills = async (req, res, next) => {
  try {
    const result = await skillsService.getAllSkills();
    handleSuccessResponse(res, result, "Skills retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const getSkillsByUserId = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await skillsService.getSkillsByUserId(userId);
    handleSuccessResponse(res, result, "Skills retrieved successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSkills,
  getSkillsByUserId,
};
