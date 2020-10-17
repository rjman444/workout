const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressJWT = require("express-jwt");

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      username: user.username,
      iss: "api.workout",
      aud: "api.workout",
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "2h" }
  );
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const checkJwt = expressJWT({
  secret: process.env.JWT_SECRET,
  issuer: "api.workout",
  audience: "api.workout",
  algorithms: ["HS256"],
});

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  checkJwt,
};
