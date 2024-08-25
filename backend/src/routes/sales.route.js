const express = require('express');
const salesController = require('../controllers/sales.controller');

const routerSales = express.Router();

routerSales.get('/', salesController.list);
routerSales.get('/:id', salesController.find);

module.exports = routerSales;