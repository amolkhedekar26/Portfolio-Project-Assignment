const Profile = require("./Profile.model");

// Repository for Profile

/**
 * Create a profile
 * @param {modelObject} Model Object
 * @returns {Promise}
 */
const create = (modelObject) => {
  return new Promise((resolve, reject) => {
    modelObject.save(function (err, obj) {
      if (err) {
        reject(err);
      }
      resolve(obj);
    });
  });
};

/**
 * List all profiles
 * @param {Model} Model
 * @param {Object} queryParams
 * @returns {Promise}
 */
const list = (Model, queryParams) => {
  return new Promise((resolve, reject) => {
    Model.find({})
      .limit(parseInt(queryParams.limit))
      .exec(function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
  });
};

/**
 * Get profile by userId
 * @param {Model} Model
 * @param {String} userId
 * @returns {Promise}
 */
const getByUserId = (Model, userId) => {
  return new Promise((resolve, reject) => {
    Model.findOne({ userId: userId }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * Update profile by userId
 * @param {Model} Model
 * @param {String} userId
 * @param {Object} data
 * @returns {Promise}
 */

const update = (Model, userId, data) => {
  return new Promise((resolve, reject) => {
    Model.findOneAndUpdate(
      { userId: userId },
      data,
      { new: true },
      function (err, data) {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};

/**
 * Delete profile by userId
 * @param {Model} Model
 * @param {String} userId
 * @returns {Promise}
 */
const deleteByUserId = (Model, userId) => {
  return new Promise((resolve, reject) => {
    Model.findOneAndDelete({ userId: userId }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  create,
  list,
  getByUserId,
  update,
  deleteByUserId,
};
