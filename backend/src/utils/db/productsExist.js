const connection = require('../../models/connection');

async function allProductsExist(sales) {
  const productIds = sales.map(({ productId }) => productId).join(', ');
  const sql = `
    SELECT COUNT(*) = ${sales.length} AS allExists FROM products
    WHERE id IN (${productIds})
  `;
  const [[{ allExists }]] = await connection.execute(sql);
  return allExists;
}

module.exports = { allProductsExist };