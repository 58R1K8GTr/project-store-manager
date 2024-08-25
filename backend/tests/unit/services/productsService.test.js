const chai = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');
const productsDBMock = require('../mocks/productsDB.json');

const { expect } = chai;

describe('testando o productService', function () {
  afterEach(sinon.restore);

  it('função findAll retorna um array com os resultados', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsDBMock);
    const products = await productService.findAll();
    expect(products).to.be.deep.equal(productsDBMock);
  });

  it('função findById retorna um produto', async function () {
    sinon.stub(productModel, 'findById').resolves(productsDBMock[0]);
    const product = await productService.findById(1);
    expect(product).to.be.deep.equal(productsDBMock[0]);
  });

  it('função findById não retorna um produto caso não seja encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const product = await productService.findById(1);
    expect(product).to.be.deep.equal({ message: 'Product not found' });
  });

  it('função insert retorna produto inserido corretamente', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    const product = await productService.insert({ name: 'product' });
    expect(product).to.be.deep.equal({ id: 1, name: 'product' });
  });
});