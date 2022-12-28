const {Router} = require('express');
const itemRouter = require('./itemRoute')
const brandRoute = require('./brandRoute')
const typeRoute = require('./typeRoute')
const userRoute  = require('./userRoute')

const router = Router();

router.use('/user', userRoute );
router.use('/item', itemRouter);
router.use('/type', typeRoute);
router.use('/brand', brandRoute);



module.exports = router;