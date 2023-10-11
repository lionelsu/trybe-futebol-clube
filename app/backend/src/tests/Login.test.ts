import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import Users from '../database/models/Users';
import JWT from '../auth/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const authUser = {
  id: 1,
  username: 'Faker',
  role: 'admin',
  email: 'fake@fake.com',
  password: 'fake@fake',
}

const fakeUser = { email: "admin@admin.com", password: "secret_admin" }

describe('Testes para a rota /login', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Deve autenticar um usuário e gerar um token JWT', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));


    const response = await chai
      .request(app)
      .post('/login')
      .send(fakeUser);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token')
  });

  it('Não deve ser possível realizar um login com os campos email ou senha vazios', async function () {
    
    const response = await chai
      .request(app)
      .post('/login')
      .send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Não deve ser possível realizar com um password invalido ou email inexistente', async function () {
    
    const response = await chai
      .request(app)
      .post('/login')
      .send({ ...fakeUser, password: 'errado' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});

describe('Testes para a rota /login/role', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar uma mensagem de erro caso o token seja inválido', async function () {
    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'invalidToken');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Deve retornar uma mensagem de erro caso o token indefinido', async function () {
    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', '');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Deve retornar o role do usuário caso a requisição seja realizada com sucesso com um token válido', async function() {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    const response = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ role: 'admin' });
  });
});
