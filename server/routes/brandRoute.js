const {Router} = require('express');
const brandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = Router();

router.get('/', brandController.getAll);
router.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.delete);

module.exports = router;