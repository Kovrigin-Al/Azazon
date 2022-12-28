// use class to groupe middlewares

const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ApiError = require("../error/ApiError");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { User, Cart } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

class UserController {
  constructor(req, res) {
    this.validate = [
      check("email").isEmail().normalizeEmail(),
      check("password").isLength({ min: 6 }).trim().escape(),
    ];
  }

  async registratioin(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Wrong credentials"));
    }

    const { email, password, role } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("User with this email is already registred")
      );
    }

    //if the email is not registred
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ password: hashPassword, email, role });
    const cart = await Cart.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    res.status(HTTP_STATUS.CREATED_201).json({ token });
  }

  async login(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Wrong credentials"));
    }

    //verify email
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Wrong credentials"));
    }
    //verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(ApiError.badRequest("Wrong credentials"));
    }

    //if email and password correct, continue
    const token = generateJwt(user.id, user.email, user.role);
    res.status(HTTP_STATUS.OK_200).json({token});
  }
  
  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.status(HTTP_STATUS.OK_200).json({ token });
  }
}

module.exports = new UserController();
