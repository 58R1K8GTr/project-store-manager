const { productPostSchema } = require('./schemas');

function validatePostProduct(product) {
  const { error } = productPostSchema.validate(product);
  if (error && error.message) {
    return {
      status: product.name ? 422 : 400,
      data: { message: error.message },
    };
  }
}

module.exports = { validatePostProduct };