const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../constants/Constant");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "24h",
        issuer: "Portfolio.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(new createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "Portfolio.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(new createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      return next(new createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const accessToken = bearerToken[1];
    JWT.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          const errMessage =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          return next(new createError.Unauthorized(errMessage));
        }
        req.payload = payload;
        next();
      }
    );
  },
  verifyRefreshToken: (resfreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        resfreshToken,
        process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            return reject(new createError.Unauthorized());
          }
          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
  signResetToken: (userId, secret) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const options = {
        expiresIn: "1h",
        issuer: "Portfolio.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(new createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyResetToken: (resetToken, secret) => {
    return new Promise((resolve, reject) => {
      JWT.verify(resetToken, secret, (err, payload) => {
        if (err) {
          return reject(new createError.Unauthorized("The link has expired"));
        }
        const userId = payload.aud;
        resolve(userId);
      });
    });
  },
};
