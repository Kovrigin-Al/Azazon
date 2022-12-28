const {Router} = require('express');
const itemController = require('../controllers/itemController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = Router();

router.get('/', itemController.getAll);
router.get('/:id', itemController.getOne);
router.post('/', checkRoleMiddleware('ADMIN'), itemController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), itemController.delete);

module.exports = router;