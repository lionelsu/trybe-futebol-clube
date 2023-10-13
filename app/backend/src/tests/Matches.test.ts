import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches';
import SequelizeMatches from '../core/data/providers/SequelizeMatches';
import matchesMock from './mocks/matchesMock';
import Teams from '../database/models/Teams';
import JWT from '../auth/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /matches', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('Deve retornar um lista com todos os jogos corretamente', async function () {
    sinon.stub(SequelizeMatches.prototype, 'findAll').resolves(matchesMock);

    const response = await chai
      .request(app)
      .get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });
});
