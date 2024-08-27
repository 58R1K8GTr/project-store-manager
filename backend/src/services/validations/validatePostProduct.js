const { productPostSchema } = require('./schemas');

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

module.exports = { validatePostProduct };