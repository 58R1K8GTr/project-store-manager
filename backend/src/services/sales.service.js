const salesModel = require('../models/sales.model');
const { validatePostSale } = require('./validations/validatePostSale');

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

async function insert(sales) {
  const error = await validatePostSale(sales);
  if (error) return error;
  const salesResponse = await salesModel.insert(sales);
  return { status: 201, data: salesResponse };
}

module.exports = { findAll, findById, insert };