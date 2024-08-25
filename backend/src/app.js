const express = require('express');
const routerProducts = require('./routes/products.routes');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use('/products', routerProducts);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
