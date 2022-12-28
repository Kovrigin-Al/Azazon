// use class to groupe middlewares

const ApiError = require("../error/ApiError");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    //Although a model is a class, the Sequelize requires to create instances by using build in method CREATE,
    //instead of the new operator directly.
    const brand = await Brand.create({ name });
    res.status(HTTP_STATUS.CREATED_201).json({ brand });
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    res.status(HTTP_STATUS.OK_200).json({ brands });
  }
  async delete(req, res, next) {
    const { name } = req.body;
    const brandFound = await Brand.findOne({ where: { name: name } });
    if (brandFound === null) {
      return next(ApiError.badRequest("Not found"));
    }
    await brandFound.destroy();
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
  }
}

module.exports = new BrandController();
