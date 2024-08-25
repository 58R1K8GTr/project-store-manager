const express = require('express');
const router = require('./routes');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use(router);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
