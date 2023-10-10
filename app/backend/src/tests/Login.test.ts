import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as mocks from './mocks/loginUserMock';

import { app } from '../app';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /login', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Deve autenticar um usuário e gerar um token JWT', async function () {
    sinon.stub(Users, 'findOne').resolves(Users.build(mocks.authFakeUser));
    
    const response = await chai
      .request(app)
      .post('/login')
      .send(mocks.fakeUser);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token')
  });
});
