const repository = require("./User.repository");
const User = require("./User.model");
const CreateError = require("http-errors");
const {
  validateUserRegister,
  validateUserLogin,
} = require("./User.validation");

const {
  signAccessToken,
  signRefreshToken,
  signResetToken,
  verifyResetToken,
} = require("../../utils/jwt");
const { schemaForgot, schemaReset } = require("../../utils/validation.schema");

const registerUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedData = await validateUserRegister(data);
      const foundUser = await repository.getByEmail(User, validatedData.email);
      if (foundUser) {
        throw new CreateError.Conflict(
          `${validatedData.email} is already been registered`
        );
      }
      const newUser = new User(validatedData);
      const savedUser = await repository.create(newUser);
      resolve(savedUser);
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedData = await validateUserLogin(data);
      const user = await repository.getByEmail(User, validatedData.email);
      if (!user) {
        throw new CreateError.NotFound(
          `${validatedData.email} is not registered`
        );
      }
      const isMatch = await user.isValidPassword(validatedData.password);
      if (!isMatch) {
        throw new CreateError.Unauthorized("Incorrect password entered");
      }
      const accessToken = await signAccessToken(user.uid);
      const refreshToken = await signRefreshToken(user.uid);
      resolve({
        accessToken: accessToken,
        refreshToken: refreshToken,
        email: user.email,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const verifyEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validatedData = await schemaForgot.validateAsync(data);
      const foundUser = await repository.getByEmail(User, validatedData.email);
      if (!foundUser) {
        throw new CreateError.NotFound(
          `Sorry! ${result.email} is not registered.`
        );
      }
      const secret = foundUser.password + "-" + foundUser.createdAt;
      const resetToken = await signResetToken(foundUser.uid, secret);
      resolve({
        email: foundUser.email,
        userId: foundUser.uid,
        resetToken: resetToken,
      });
    } catch (error) {
      if (error.isJoi === true) {
        reject(new CreateError.BadRequest("Invalid email address"));
      }
      reject(error);
    }
  });
};

const changePassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { uid, resetToken, password } = data;
      const foundUser = await repository.getByUid(User, uid);

      if (!foundUser) {
        throw new createError.Forbidden("User not found");
      }

      const validatedData = await schemaReset.validateAsync({
        password: password,
      });
      const secret = foundUser.password + "-" + foundUser.createdAt;
      const userUid = await verifyResetToken(resetToken, secret);
      if (userUid === foundUser.uid) {
        foundUser.password = password;
        await foundUser.save();
        resolve({});
      }
    } catch (error) {
      if (error.isJoi === true) {
        reject(new CreateError.BadRequest("Invalid email address"));
      }
      reject(error);
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
};
