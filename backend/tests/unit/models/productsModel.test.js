const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productsDBMock = require('../mocks/productsDB.json');
const productModel = require('../../../src/models/products.model');

const { expect } = chai;

const updateMock = {
  id: 1,
  name: 'Martelo do Batman',
};

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

  it('função insert insere o dado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const insertId = await productModel.insert({ name: 'product' });
    expect(insertId).to.be.equal(1);
  });

  it('função update deve alterar os dados corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const productAndId = await productModel.update(updateMock);
    expect(productAndId).to.be.deep.equal(updateMock);
  });
});