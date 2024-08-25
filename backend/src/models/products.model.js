const connection = require('./connection');

async function findAll() {
  const sql = 'SELECT * FROM products';
  const [products] = await connection.execute(sql);
  return products;
}

async function findById(id) {
  const sql = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(sql, [id]);
  return product;
}

module.exports = { findAll, findById };