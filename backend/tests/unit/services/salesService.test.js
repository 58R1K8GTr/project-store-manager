const chai = require('chai');
const sinon = require('sinon');
const salesDBMock = require('../mocks/salesDB.json');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('testando o salesService', function () {
  afterEach(sinon.restore);

  it('função findAll retorna todos os dados corretamente', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesDBMock);
    const sales = await salesService.findAll();
    expect(sales).to.be.deep.equal(salesDBMock);
  });

  it('função findById retorna os dados corretamente caso id seja encontrado', async function () {
    const tempMock = salesDBMock.filter((sale) => sale.saleId === 1);
    const resultTempMock = tempMock.map(({ salesId, ...rest }) => rest);
    sinon.stub(salesModel, 'findById').resolves(tempMock);
    const sale = await salesService.findById(1);
    expect(sale).to.be.deep.equal(resultTempMock);
  });

  it('função findById retorna uma mensagem de erro caso id não seja encontrado', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const sale = await salesService.findById(999);
    expect(sale).to.be.deep.equal({ message: 'Sale not found' });
  });
});