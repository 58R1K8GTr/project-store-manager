const salesModel = require('../models/sales.model');

async function findAll() {
  const sales = await salesModel.findAll();
  return sales;
}

async function findById(id) {
  const sales = await salesModel.findById(id);
  if (sales.length === 0) return { message: 'Sale not found' };
  return sales;
}

module.exports = { findAll, findById };