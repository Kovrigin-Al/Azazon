const {Router} = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/registration', userController.validate, userController.registratioin);

router.post('/login', userController.validate, userController.login);

router.get('/auth', authMiddleware, userController.checkAuth);

module.exports = router;