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

async function insert({ name }) {
  const sql = 'INSERT INTO products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(sql, [name]);
  return insertId;
}

async function update({ name, id }) {
  const sql = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(sql, [name, id]);
  return { name, id };
}

async function remove(id) {
  const sql = 'DELETE FROM products WHERE id = ?';
  await connection.execute(sql, [id]);
}

module.exports = { findAll, findById, insert, update, remove };