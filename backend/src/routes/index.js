const express = require('express');

const router = express.Router();

const productsRouter = require('./products.route');
const salesRouter = require('./sales.route');

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;