const ApiError = require('../error/ApiError');
const { HTTP_STATUS } = require('../helpers/httpStatuses');
const {Type} = require('../models/models')

// use class to groupe middlewares

class TypeController {
    async create (req,res) { 
        const {name} = req.body;
        //Although a model is a class, the Sequelize requires to create instances by using build in method CREATE, 
        //instead of the new operator directly. 
        const type = await Type.create({name})
        res.status(HTTP_STATUS.CREATED_201).json({type})
    }
    async getAll (req,res) { 
        const types = await Type.findAll();
        res.status(HTTP_STATUS.OK_200).json({types})
    }
    async delete (req, res, next) {
        const {name} = req.body;
        const typeFound = await Type.findOne({where: {name}});
        if (typeFound === null) {
            return next(ApiError.badRequest('Not found'))
        }
        await Type.destroy({where:{name: name}});
        res.status(HTTP_STATUS.NO_CONTENT_204).send();
    }
}

module.exports = new TypeController();