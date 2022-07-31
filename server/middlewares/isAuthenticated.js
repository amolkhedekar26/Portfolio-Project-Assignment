const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(new createError.Unauthorized("Unauthorized! Please login to continue"));
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const accessToken = bearerToken[1];
  JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const errMessage =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new createError.Unauthorized(errMessage));
    }
    req.payload = payload;
    req.userId = payload.aud;
    next();
  });
};
