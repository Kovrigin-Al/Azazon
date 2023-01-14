const {Router} = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/', authMiddleware, cartController.getAll);
router.post('/', authMiddleware, cartController.create);
router.delete('/', authMiddleware ,cartController.delete);

module.exports = router;