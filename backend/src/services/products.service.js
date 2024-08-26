const productsModel = require('../models/products.model');
const { validatePostProduct } = require('./validations/validatePostProduct');

async function findAll() {
  const products = await productsModel.findAll();
  return { status: 200, data: products };
}

async function findById(id) {
  const product = await productsModel.findById(id);
  if (!product) {
    return {
      status: 404,
      data: { message: 'Product not found' },
    };
  }
  return { status: 200, data: product };
}

async function insert(product) {
  const errorObject = validatePostProduct(product);
  if (errorObject) return errorObject;
  const id = await productsModel.insert(product);
  return { status: 201, data: { id, ...product } };
}

module.exports = { findAll, findById, insert };