var jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error("Not Authorization!");
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, keys.jwtToken);
  } catch (e) {
    e.statusCode = 500;
    throw e;
  }
  if (!decodedToken) {
    const error = new Error("Not Authorization!");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.id;
  next();
};
