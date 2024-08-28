const productsModel = require('../models/products.model');
const {
  validatePostProduct,
  validatePutProduct,
  validateDeleteProduct,
} = require('./validations/validateProduct');

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

async function update(product) {
  const errorObject = await validatePutProduct(product);
  if (errorObject) return errorObject;
  const newProduct = await productsModel.update(product);
  return { status: 200, data: newProduct };
}

async function remove({ id }) {
  const error = await validateDeleteProduct({ id });
  if (error) return error;
  await productsModel.remove(id);
  return { status: 204 };
}

module.exports = { findAll, findById, insert, update, remove };