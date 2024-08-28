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
    end: sinon.stub(),
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
    const resultMock = { status: 200, data: productsDBMock };
    sinon.stub(productService, 'findAll').resolves(resultMock);
    await productController.list({}, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função find retorna o json com uma mensagem de produto não encontrado', async function () {
    const resultMock = { status: 404, data: { message: 'Product not found' } };
    sinon.stub(productService, 'findById').resolves(resultMock);
    const wrongReq = {
      params: {
        id: 999,
      },
    };
    await productController.find(wrongReq, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função find retorna o produto encontrado', async function () {
    const resultMock = { status: 200, data: productsDBMock[0] };
    sinon.stub(productService, 'findById').resolves(resultMock);
    await productController.find(req, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função create cadastra o produto', async function () {
    const resultMock = { status: 201, data: { id: 1, name: 'product' } };
    const reqWithProductName = {
      body: {
        name: 'product',
      },
    };
    sinon.stub(productService, 'insert').resolves(resultMock);
    await productController.create(reqWithProductName, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função update atualiza os dados corretamente', async function () {
    const resultMock = { status: 200, data: { id: 1, name: 'product' } };
    const reqWithId = {
      params: {
        id: 1,
      },
      body: {
        name: 'product',
      },
    };
    sinon.stub(productService, 'update').resolves(resultMock);
    await productController.update(reqWithId, res);
    expect(res.json).to.have.been.calledWith(resultMock.data);
    expect(res.status).to.have.been.calledWith(resultMock.status);
  });

  it('função remove deleta um produto com sucesso', async function () {
    const resultMock = { status: 204 };
    const reqMock = { params: { id: 1 } };
    sinon.stub(productService, 'remove').resolves(resultMock);
    await productController.remove(reqMock, res);
    expect(res.status).to.have.been.calledWith(resultMock.status);
    expect(res.end.called).to.be.equal(true);
  });

  it('função remove não deleta o produto com sucesso', async function () {
    const resultMock = { status: 404, data: { message: 'Product not found' } };
    const reqMock = { params: { id: 1 } };
    sinon.stub(productService, 'remove').resolves(resultMock);
    await productController.remove(reqMock, res);
    expect(res.status).to.have.been.calledWith(resultMock.status);
    expect(res.json).to.have.been.calledWith(resultMock.data);
  });
});