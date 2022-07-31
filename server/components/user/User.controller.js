const createError = require("http-errors");
const User = require("./User.model");
const {
  schemaRegister,
  schemaLogin,
  schemaForgot,
  schemaReset,
} = require("../../utils/validation.schema");
const { handleSuccessResponse } = require("../../utils/response");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signResetToken,
  verifyResetToken,
} = require("../../utils/jwt");

const register = async (req, res, next) => {
  try {
    const result = await schemaRegister.validateAsync(req.body);
    const foundUser = await User.findOne({ email: result.email });
    if (foundUser) {
      throw new createError.Conflict(`${result.email} is already been registered.`);
    }
    const newUser = new User(result);
    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(savedUser.uid);
    // res.send({ result: "User created successfully" });
    const responseData = {
      
    };
    const message = "Registration successful";
    handleSuccessResponse(res, responseData, "User created successfully");
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await schemaLogin.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) {
      throw new createError.NotFound(`${result.email} is not registered.`);
    }
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) {
      throw new createError.Unauthorized("Incorrect password entered.");
    }
    const accessToken = await signAccessToken(user.uid);
    const refreshToken = await signRefreshToken(user.uid);
    // res.send({
    //   result: {
    //     accessToken: accessToken,
    //     refreshToken: refreshToken,
    //   },
    // });
    const responseData = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    const message = "Login successful";
    handleSuccessResponse(res, responseData, message);
  } catch (error) {
    if (error.isJoi === true) {
      return next(new createError.BadRequest("Invalid Username / Password"));
    }
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new createError.BadRequest();
    }
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res.send({
      result: {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const forgotForm =
    '<form action="/auth/verify-email" method="POST">' +
    '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
    '<input type="submit" value="Verify Email" />' +
    "</form>";
  res.send(forgotForm);
};

const verifyEmail = async (req, res, next) => {
  try {
    const result = await schemaForgot.validateAsync(req.body);
    const foundUser = await User.findOne({ email: result.email });
    if (!foundUser) {
      throw new createError.NotFound(`${result.email} is not verified.`);
    }
    const secret = foundUser.password + "-" + foundUser.createdAt;
    const resetToken = await signResetToken(foundUser.id, secret);
    res.send(
      '<a href="/auth/reset-password/' +
        foundUser.id +
        "/" +
        resetToken +
        '">Reset password</a>'
    );
  } catch (error) {
    if (error.isJoi === true) {
      return next(new createError.BadRequest("Invalid email address"));
    }
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      throw new createError.Forbidden();
    }
    const secret = foundUser.password + "-" + foundUser.createdAt;
    const userId = await verifyResetToken(req.params.resetToken, secret);
    if (userId === foundUser.id) {
      const resetForm =
        '<form action="/auth/change-password" method="POST">' +
        '<input type="hidden" name="id" value="' +
        req.params.id +
        '" />' +
        '<input type="hidden" name="resetToken" value="' +
        req.params.resetToken +
        '" />' +
        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input type="submit" value="Reset Password" />' +
        "</form>";
      res.send(resetForm);
    }
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { id, resetToken, password } = req.body;
    const foundUser = await User.findById(id);
    if (!foundUser) {
      throw new createError.Forbidden();
    }
    const secret = foundUser.password + "-" + foundUser.createdAt;
    const userId = await verifyResetToken(resetToken, secret);
    if (userId === foundUser.id) {
      foundUser.password = password;
      await foundUser.save();
      res.send("Password changed successfully");
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.send("Logout route");
};

module.exports = {
  register: register,
  login: login,
  refreshToken: refreshToken,
  forgotPassword: forgotPassword,
  verifyEmail: verifyEmail,
  resetPassword: resetPassword,
  changePassword: changePassword,
  logout: logout,
};
