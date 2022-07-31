const repository = require("./Profile.repository");
const Profile = require("./Profile.model");
const { validateCreateRequest } = require("./Profile.validation");
const CreateError = require("http-errors");
// Service for the Profile

const getInitials = (firstName, lastName) => {
  const initials = `${firstName.charAt(0).toUpperCase()}${lastName
    .charAt(0)
    .toUpperCase()}`;
  return initials;
};

const createProfile = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await validateCreateRequest(userId, data);
      let result;
      // Check if user already has a profile
      const existingProfile = await repository.getByUserId(Profile, userId);

      if (existingProfile) {
        // Update profile
        result = await repository.update(Profile, existingProfile.userId, data);
      } else {
        profileObj = new Profile(data);
        profileObj.userId = userId;
        result = await repository.create(profileObj);
      }

      resolve(result);
    } catch (err) {
      if (err.isJoi === true) {
        err.status = 422;
      }
      reject(err);
    }
  });
};

const getProfile = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || userId === "") {
        throw new CreateError.Unauthorized("UserId is required");
      }
      const profile = await repository.getByUserId(Profile, userId);

      resolve(profile);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProfile,
  getProfile,
};
