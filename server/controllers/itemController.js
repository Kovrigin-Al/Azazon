// use class to groupe middlewares

const ApiError = require("../error/ApiError");
const { HTTP_STATUS } = require("../helpers/httpStatuses");
const { Item, ItemCharacteristic } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class ItemController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, brandId, item_characteristics /* info */} = req.body; //TODO: check info
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      //Although a model is a class, the Sequelize requires to create instances by using build in method CREATE,
      //instead of the new operator directly.
      const item = await Item.create({
        name,
        price,
        img: fileName,
        typeId,
        brandId,
      });

      //creating itemCharacteristics instances is done asynchronously as result is not requred right  here
      if (item_characteristics) {
        item_characteristics = JSON.parse(item_characteristics);
        item_characteristic.forEach((i) => {
          ItemCharacteristic.create({
            title: i.title,
            description: i.description,
            itemId: item.id,
          });
        });
      }

      res.status(HTTP_STATUS.CREATED_201).json({ item });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    let { brandId, typeId, limit, page } = req.query;

    //pagination
    page = page || 1;
    limit = limit || 10;
    let offset = limit * page - limit;

    let items;
    try {
    // if query doesn't have brandId and typeId, send all items
    if (!brandId && !typeId) {
      items = await Item.findAndCountAll({ limit, offset });
    }

    // if query has only brandId, filter items by brand
    if (brandId && !typeId) {
      items = await Item.findAndCountAll({ where: { brandId }, limit, offset });
    }

    // if query has only typeId, filter items by type
    if (!brandId && typeId) {
      items = await Item.findAndCountAll({ where: { typeId }, limit, offset });
    }

    // if query has brandId and typeId, filter items by brand and type
    if (brandId && typeId) {
      items = await Item.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }

    res.status(HTTP_STATUS.OK_200).json({ items });
  } catch (error) {
    next(ApiError.internalError(error.message));
  }
  }

  async getOne(req, res, next) {
    const id = req.params.id;
    const itemFound = await Item.findOne({ where: { id }, 
      //this adds item characteristics to res as they are required for front-end at the same time
      include: [{model: ItemCharacteristic, /*as: 'info'*/}] }); //TODO: check as info
    if (itemFound === null) {
      return next(ApiError.badRequest("Not found"));
    }
    res.status(HTTP_STATUS.OK_200).json({ itemFound });
  }

  async delete(req, res, next) {
    const { name } = req.body;
    const itemFound = await Item.findOne({ where: { name: name } });
    if (itemFound === null) {
      return next(ApiError.badRequest("Not found"));
    }
    await itemFound.destroy();
    fs.unlink(path.resolve(__dirname, "..", "static",itemFound.img), (err) => {
      if (err) {
        return next(new ApiError.internalError(err.message))
      }
      console.log('the image is deleted');
    })
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
  }
}

module.exports = new ItemController();
