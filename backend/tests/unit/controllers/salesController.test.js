const chai = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const salesDBMock = require('../mocks/salesDB.json');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

chai.use(sinonchai);
const { expect } = chai;

describe('testando o salesController', function () {
  afterEach(sinon.restore);
  const res = {
    json: sinon.stub(),
    status: sinon.stub().returnsThis(),
  };
  const req = {
    params: {
      id: 1,
    },
  };
  const salesMockCorrected = salesDBMock.map(({ saleId, ...rest }) => rest);

  it('função list retorna o json com sales', async function () {
    sinon.stub(salesService, 'findAll').resolves(salesDBMock);
    await salesController.list({}, res);
    expect(res.json).to.have.been.calledWith(salesDBMock);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('função find retorna o json correto caso id seja encontrado', async function () {
    sinon.stub(salesService, 'findById').resolves(salesMockCorrected);
    await salesController.find(req, res);
    expect(res.json).to.have.been.calledWith(salesMockCorrected);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('função find retorna uma mensagem de erro caso id não seja encontrado', async function () {
    const errorMessage = { message: 'Sale not found' };
    sinon.stub(salesService, 'findById').resolves(errorMessage);
    await salesController.find(req, res);
    expect(res.json).to.have.been.calledWith(errorMessage);
    expect(res.status).to.have.been.calledWith(404);
  });
});