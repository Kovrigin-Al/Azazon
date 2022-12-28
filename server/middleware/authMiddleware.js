const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; //"Bearer TOKEN"
    if (!token) {
      throw Error("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(ApiError.unauthorized("Unauthorized"));
  }
};

module.exports = authMiddleware;
