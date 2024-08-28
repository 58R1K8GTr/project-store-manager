const { salePostSchema } = require('./schemas');
const allProductsExists = require('../../utils/db/productsExist');

const statusCode = {
  'any.required': 400,
  'number.min': 422,
};

async function validatePostSale(sales) {
  const { error } = salePostSchema.validate(sales);
  if (error && error.message) {
    return {
      status: statusCode[error.details[0].type],
      data: { message: error.message },
    };
  }
  const exists = await allProductsExists(sales);
  if (!exists) {
    return {
      status: 404,
      data: { message: 'Product not found' },
    };
  }
}

module.exports = { validatePostSale };