const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsDBMock = require('../mocks/productsDB.json');
const productModel = require('../../../src/models/products.model');

const { expect } = chai;

describe('testes do productsModel', function () {
  afterEach(sinon.restore);
  it('função findAll retorna todos os dados', async function () {
    sinon.stub(connection, 'execute').resolves([productsDBMock]);
    const products = await productModel.findAll();
    expect(products).to.be.deep.equal(productsDBMock);
  });

  it('função findById retorna o dado', async function () {
    sinon.stub(connection, 'execute').resolves([[productsDBMock[0]]]);
    const product = await productModel.findById(1);
    expect(product).to.be.deep.equal(productsDBMock[0]);
  });
});