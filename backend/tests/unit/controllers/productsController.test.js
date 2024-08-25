const chai = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const productService = require('../../../src/services/products.service');
const productsDBMock = require('../mocks/productsDB.json');
const productController = require('../../../src/controllers/products.controller');

chai.use(sinonchai);

const { expect } = chai;

describe('testando o productsController', function () {
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

  it('função list retorna o json com os products', async function () {
    sinon.stub(productService, 'findAll').resolves(productsDBMock);
    await productController.list({}, res);
    expect(res.json).to.have.been.calledWith(productsDBMock);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('função find retorna o json com uma mensagem de produto não encontrado', async function () {
    const objectMessage = { message: 'Product not found' };
    sinon.stub(productService, 'findById').resolves(objectMessage);
    const wrongReq = {
      params: {
        id: 999,
      },
    };
    await productController.find(wrongReq, res);
    expect(res.json).to.have.been.calledWith(objectMessage);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('função find retorna o produto encontrado', async function () {
    sinon.stub(productService, 'findById').resolves(productsDBMock[0]);
    await productController.find(req, res);
    expect(res.json).to.have.been.calledWith(productsDBMock[0]);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('função create retorna o status 200 caso produto seja cadastrado', async function () {
    const resultMock = { id: 1, name: 'product' };
    const reqWithProductName = {
      body: {
        name: 'product',
      },
    };
    sinon.stub(productService, 'insert').resolves(resultMock);
    await productController.create(reqWithProductName, res);
    expect(res.json).to.have.been.calledWith(resultMock);
    expect(res.status).to.have.been.calledWith(201);
  });
});