const { handleSuccessResponse } = require("../../utils/response");
const projectService = require("./Project.service");

// Controller for the Project routes

/*  @route   POST api/v1/projects/
    @desc    Get all projects
    @access  Authenticated
*/
const createProject = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await projectService.createProject(userId, req.body);
    handleSuccessResponse(res, result, "Project created successfully", 201);
  } catch (err) {
    next(err);
  }
};

/*  @route   GET api/v1/projects/
    @desc    Get all projects for a user
    @access  Authenticated
*/
const getAllProjects = async (req, res, next) => {
  try {
    const result = await projectService.getAllProjects();
    handleSuccessResponse(res, result, "Projects retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const getProjectsByUserId = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await projectService.getProjectsByUserId(userId);
    handleSuccessResponse(res, result, "Projects retrieved successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectsByUserId,
};
