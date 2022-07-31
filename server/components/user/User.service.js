const repository = require("./User.repository");
const User = require("./User.model");
const CreateError = require("http-errors");
const {
  validateUserRegister,
  validateUserLogin,
} = require("./User.validation");

const { signAccessToken, signRefreshToken } = require("../../utils/jwt");

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

module.exports = {
  registerUser,
  loginUser,
};
