const { handleSuccessResponse } = require("../../utils/response");
const profileService = require("./Profile.service");

// Controller for the Profile routes

/*  @route   POST api/v1/profiles/
    @desc    Create a profile
    @access  Authenticated
*/
const createProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await profileService.createProfile(userId, req.body);
    handleSuccessResponse(res, result, "Profile created successfully", 201);
  } catch (err) {
    next(err);
  }
};

/*  @route   GET api/v1/profiles/
    @desc    Get all profiles
    @access  Authenticated
*/
const getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await profileService.getProfile(userId);
    handleSuccessResponse(res, result, "Profiles retrieved successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProfile,
  getProfile,
};
