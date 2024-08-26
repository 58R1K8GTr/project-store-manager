const salesService = require('../services/sales.service');

async function list(_req, res) {
  const { status, data } = await salesService.findAll();
  return res.status(status).json(data);
}

async function find(req, res) {
  const id = Number(req.params.id);
  const { status, data } = await salesService.findById(id);
  if (data.message) return res.status(status).json(data);
  return res.status(status).json(data);
}

module.exports = { list, find };