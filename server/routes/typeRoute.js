const {Router} = require('express');
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = Router();

router.get('/', typeController.getAll);
router.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), typeController.delete);

module.exports = router;