const productsModel = require('../models/products.model');

async function findAll() {
  const products = await productsModel.findAll();
  return products;
}

async function findById(id) {
  const product = await productsModel.findById(id);
  if (!product) return { message: 'Product not found' };
  return product;
}

async function insert(product) {
  const id = await productsModel.insert(product);
  const newProduct = { id, ...product };
  return newProduct;
}

module.exports = { findAll, findById, insert };