const salesService = require('../services/sales.service');

async function list(_req, res) {
  const sales = await salesService.findAll();
  return res.status(200).json(sales);
}

async function find(req, res) {
  const id = Number(req.params.id);
  const sales = await salesService.findById(id);
  if (sales.message) return res.status(404).json(sales);
  return res.status(200).json(sales);
}

module.exports = { list, find };