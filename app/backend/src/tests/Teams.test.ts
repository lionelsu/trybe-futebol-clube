import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

describe('Testes para a roda /teams', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Deve retornar um lista com todos os times corretamente', async function () {
    sinon.stub(Teams, 'findAll').resolves(teams.map((team) => Teams.build(team)));

    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array'); 
    expect(response.body).to.be.deep.equal(teams);
  });

  it('Deve retornar o time com o id correto', async function () {
    sinon.stub(Teams, 'findByPk').resolves(Teams.build(teams[0]));

    const response = await chai.request(app).get('/teams/:id');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams[0]);
  });
});
