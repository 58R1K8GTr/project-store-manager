const salesModel = require('../models/sales.model');

async function findAll() {
  const sales = await salesModel.findAll();
  return { status: 200, data: sales };
}

async function findById(id) {
  const sales = await salesModel.findById(id);
  if (sales.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 200, data: sales };
}

module.exports = { findAll, findById };