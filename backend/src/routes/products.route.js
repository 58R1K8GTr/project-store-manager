const express = require('express');
const productsController = require('../controllers/products.controller');

const routerProducts = express.Router();

routerProducts.get('/', productsController.list);
routerProducts.get('/:id', productsController.find);
routerProducts.post('/', productsController.create);
routerProducts.put('/:id', productsController.update);

module.exports = routerProducts;