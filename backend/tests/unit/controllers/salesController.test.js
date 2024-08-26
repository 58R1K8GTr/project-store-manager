const chai = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const salesDBMock = require('../mocks/salesDB.json');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

chai.use(sinonchai);
const { expect } = chai;

describe('testando o salesController', function () {
  const res = {
    json: sinon.stub(),
    status: sinon.stub().returnsThis(),
  };
  const req = {
    params: {
      id: 1,
    },
  };
  afterEach(function () {
    sinon.restore();
    res.json.resetHistory();
    res.status.resetHistory();
  });
  const salesMockCorrected = salesDBMock.map(({ saleId, ...rest }) => rest);

  it('função list retorna o json com sales', async function () {
    const resultMock = { status: 200, data: salesDBMock };
    sinon.stub(salesService, 'findAll').resolves(resultMock);
    await salesController.list({}, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função find retorna o json correto caso id seja encontrado', async function () {
    const resultMock = { status: 200, data: salesMockCorrected };
    sinon.stub(salesService, 'findById').resolves(resultMock);
    await salesController.find(req, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função find retorna uma mensagem de erro caso id não seja encontrado', async function () {
    const resultMock = { status: 404, data: { message: 'Sale not found' } };
    sinon.stub(salesService, 'findById').resolves(resultMock);
    await salesController.find(req, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });
});