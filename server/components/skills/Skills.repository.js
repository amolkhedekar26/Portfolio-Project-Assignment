const Skills = require("../skills/Skills.model");

/**
 * Create a skill
 * @param {Model} Model 
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
 * List all skills
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
 * Get skills by userId
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
 * Update skills by userId
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
 * Delete skills by userId
 * @param {Model} Model 
 * @param {String} userId 
 * @returns 
 */
const deleteByUserId = (Model, userId) => {
  return new Promise((resolve, reject) => {
    Model.findOneAndRemove({ userId: userId }, function (err, data) {
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
