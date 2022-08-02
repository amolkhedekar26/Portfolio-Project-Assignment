/**
 * Create a user
 * @param {modelObject} Model Object
 * @returns {Promise}
 */
const create = async (modelObject) => {
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
 * List all users
 * @param {Model} Model
 * @param {Object} queryParams
 * @returns {Promise}
 */
const list = async (Model, queryParams) => {
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
 * Get user by email
 * @param {Model} Model
 * @param {String} email
 * @returns {Promise}
 */
const getByEmail = async (Model, email) => {
  return new Promise((resolve, reject) => {
    Model.findOne({ email: email }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * Get user by email
 * @param {Model} Model
 * @param {String} uid
 * @returns {Promise}
 */
const getByUid = async (Model, uid) => {
  return new Promise((resolve, reject) => {
    Model.findOne({ uid: uid }, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * Update user by userId
 * @param {Model} Model
 * @param {String} userId
 * @param {Object} data
 * @returns {Promise}
 */
const update = async (Model, userId, data) => {
  return new Promise((resolve, reject) => {
    Model.findOneAndUpdate({ uid: userId }, data, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/**
 * Delete user by userId
 * @param {Model} Model
 * @param {String} userId
 * @returns {Promise}
 */
const deleteById = async (Model, userId) => {
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
  getByEmail,
  getByUid,
  update,
  deleteById,
};
