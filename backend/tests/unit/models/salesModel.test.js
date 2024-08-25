const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesDBMock = require('../mocks/salesDB.json');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('testando o salesModel', function () {
  afterEach(sinon.restore);
  
  it('função findAll retorna todos os dados corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([salesDBMock]);
    const sales = await salesModel.findAll();
    expect(sales).to.be.deep.equal(salesDBMock);
  });

  it('função findById retorna um objeto correto caso id exista', async function () {
    const tempMock = salesDBMock.filter((sale) => sale.saleId === 1);
    sinon.stub(connection, 'execute').resolves([tempMock]);
    const sale = await salesModel.findById(1);
    expect(sale).to.be.deep.equal(tempMock);
  });

  it('função findById retorna uma mensagem de erro caso id não exista', async function () {
    sinon.stub(connection, 'execute').resolves([undefined]);
    const sale = await salesModel.findById(999);
    expect(sale).to.be.equal(undefined);
  });
});