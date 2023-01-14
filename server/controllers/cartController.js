// use class to groupe middlewares

const ApiError = require("../error/ApiError");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { Cart, CartItem, User } = require("../models/models");

class CartController {
  async create(req, res,next) {
    const { itemId } = req.body;
    const {cartId} = req.user;
    const itemFound = await CartItem.findOne({ where: { cartId: cartId, itemId: itemId } });
    if (itemFound) {
      return next(ApiError.badRequest("This item is already in the cart"));
    }
    //Although a model is a class, the Sequelize requires to create instances by using build in method CREATE,
    //instead of the new operator directly.
    const addedItem = await CartItem.create({ cartId, itemId });
    res.status(HTTP_STATUS.CREATED_201).json({ addedItem });
  }
  async getAll(req, res) {
    const {cartId} = req.user;
    const items = await CartItem.findAll({where: {cartId: cartId}});
    res.status(HTTP_STATUS.OK_200).json({ items });
  }
  async delete(req, res, next) {
    const { itemId } = req.body;
    const {cartId} = req.user;
    const itemFound = await CartItem.findOne({ where: { cartId: cartId, itemId: itemId } });
    if (itemFound === null) {
      return next(ApiError.badRequest("Not found"));
    }
    await itemFound.destroy();
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
  }
}

module.exports = new CartController();
