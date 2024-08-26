const chai = require('chai');
const sinon = require('sinon');
const salesDBMock = require('../mocks/salesDB.json');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { expect } = chai;

describe('testando o salesService', function () {
  afterEach(sinon.restore);

  it('função findAll retorna todos os dados corretamente', async function () {
    const resultMock = { status: 200, data: salesDBMock };
    sinon.stub(salesModel, 'findAll').resolves(resultMock.data);
    const sales = await salesService.findAll();
    expect(sales).to.be.deep.equal(resultMock);
  });

  it('função findById retorna os dados corretamente caso id seja encontrado', async function () {
    const findByIdMock = salesDBMock.filter((sale) => sale.saleId === 1);
    const resultMock = {
      status: 200,
      data: findByIdMock.map(({ salesId, ...rest }) => rest),
    };
    sinon.stub(salesModel, 'findById').resolves(findByIdMock);
    const sale = await salesService.findById(1);
    expect(sale).to.be.deep.equal(resultMock);
  });

  it('função findById retorna uma mensagem de erro caso id não seja encontrado', async function () {
    const resultMock = {
      status: 404,
      data: { message: 'Sale not found' },
    };
    sinon.stub(salesModel, 'findById').resolves([]);
    const sale = await salesService.findById(999);
    expect(sale).to.be.deep.equal(resultMock);
  });
});