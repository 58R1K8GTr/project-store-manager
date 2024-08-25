const productsService = require('../services/products.service');

async function list(_req, res) {
  const products = await productsService.findAll();
  return res.status(200).json(products);
}

async function find(req, res) {
  const { id } = req.params;
  const product = await productsService.findById(id);
  if (product.message) return res.status(404).json(product);
  return res.status(200).json(product);
}

module.exports = { list, find };