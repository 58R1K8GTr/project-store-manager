const productsService = require('../services/products.service');

async function list(_req, res) {
  const { status, data } = await productsService.findAll();
  return res.status(status).json(data);
}

async function find(req, res) {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  if (data.message) return res.status(status).json(data);
  return res.status(status).json(data);
}

async function create(req, res) {
  const product = req.body;
  const { status, data } = await productsService.insert(product);
  return res.status(status).json(data);
}

module.exports = { list, find, create };