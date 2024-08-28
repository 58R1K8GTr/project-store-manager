const { productPostSchema } = require('./schemas');
const productsExist = require('../../utils/db/productsExist');

const statusCode = {
  'any.required': 400,
  'string.min': 422,
};

function validatePostProduct(product) {
  const { error } = productPostSchema.validate(product);
  if (error && error.message) {
    return {
      status: statusCode[error.details[0].type],
      data: { message: error.message },
    };
  }
}

async function validatePutProduct({ id, name }) {
  const allExist = await productsExist([{ productId: id, name }]);
  if (!allExist) {
    return {
      status: 404,
      data: { message: 'Product not found' },
    }; 
  }
  const { error } = productPostSchema.validate({ name });
  if (error && error.message) {
    return {
      status: statusCode[error.details[0].type],
      data: { message: error.message },
    };
  }
}

module.exports = { validatePostProduct, validatePutProduct };