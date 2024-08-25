const connection = require('./connection');

async function findAll() {
  const sql = `
    SELECT
      sap.sale_id AS 'saleId',
      sap.product_id AS 'productId',
      sap.quantity,
      sal.date
    FROM sales AS sal
      INNER JOIN sales_products AS sap
        ON sal.id = sap.sale_id
      INNER JOIN products AS pro
        ON pro.id = sap.product_id
      ORDER BY \`saleId\`, \`productId\`
  `;
  const [sales] = await connection.execute(sql);
  return sales;
}

async function findById(id) {
  const sql = `
    SELECT
      sap.product_id AS 'productId',
      sap.quantity,
      sal.date
    FROM sales AS sal
      INNER JOIN sales_products AS sap
        ON sal.id = sap.sale_id
      INNER JOIN products AS pro
        ON pro.id = sap.product_id
    WHERE sal.id = ?
    ORDER BY \`productId\`
  `;
  const [sales] = await connection.execute(sql, [id]);
  return sales;
}

module.exports = { findAll, findById };