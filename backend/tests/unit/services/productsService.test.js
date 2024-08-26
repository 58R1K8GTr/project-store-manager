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
    expect(products).to.be.deep.equal({ status: 200, data: productsDBMock });
  });

  it('função findById retorna um produto', async function () {
    sinon.stub(productModel, 'findById').resolves(productsDBMock[0]);
    const product = await productService.findById(1);
    expect(product).to.be.deep.equal({ status: 200, data: productsDBMock[0] });
  });

  it('função findById não retorna um produto caso não seja encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const product = await productService.findById(1);
    expect(product).to.be.deep.equal(
      { status: 404, data: { message: 'Product not found' } },
    );
  });

  it('função insert retorna produto inserido corretamente', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    const product = await productService.insert({ name: 'product' });
    expect(product).to.be.deep.equal(
      { status: 201, data: { id: 1, name: 'product' } },
    );
  });

  it('função insert retorna erro caso usuário colocar name muito curto', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    const product = await productService.insert({ name: 'prod' });
    expect(product).to.be.deep.equal(
      {
        status: 422,
        data: { message: '"name" length must be at least 5 characters long' },
      },
    );
  });

  it('função insert retorna erro caso usuário não colocar name', async function () {
    sinon.stub(productModel, 'insert').resolves(1);
    const product = await productService.insert({});
    expect(product).to.be.deep.equal(
      { status: 400, data: { message: '"name" is required' } },
    );
  });
});