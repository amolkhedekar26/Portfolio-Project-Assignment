const { handleSuccessResponse } = require("../../utils/response");
const userService = require("./User.service");

// Controller for the User(Authentication) routes

/*  @route   POST api/v1/users/register
        @desc    Register a user
        @access  Public
    */
const registerUser = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    handleSuccessResponse(res, result, "Registration successful", 201);
  } catch (error) {
    next(error);
  }
};

/*  @route   POST api/v1/users/login
        @desc    Login a user
        @access  Public
    */
const loginUser = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    handleSuccessResponse(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
};

/*  @route   POST api/v1/users/verify-email
        @desc    Verify a user email
        @access  Public
    */
const verifyEmail = async (req, res, next) => {
  try {
    const result = await userService.verifyEmail(req.body);
    handleSuccessResponse(res, result, "Email verified successfully");
  } catch (error) {
    next(error);
  }
};

/*  @route   POST api/v1/users/change-password
        @desc    Change a user password
        @access  Public
    */
const changePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req.body);
    handleSuccessResponse(res, result, "Password changed successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
};
