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
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

const authUser = {
  id: 1,
  username: 'Faker',
  role: 'admin',
  email: 'fake@fake.com',
  password: 'fake@fake',
};

const remove = matchesMock.map(match => {
  const { homeTeam, awayTeam, ...rest } = match;
  return { ...rest };
});

const goals = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
};

const newMatch = {
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
};

describe('Testes para a rota /matches', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('Deve retornar um lista com todos os jogos corretamente', async function () {
    sinon.stub(Matches, 'findAll').resolves(Matches.bulkBuild(remove));

    const response = await chai
      .request(app)
      .get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(remove);
  });

  it('Deve filtrar corretamente as partidas em andamento e também as finalizadas', async function () {
    sinon.stub(Matches, 'findAll').resolves(Matches.bulkBuild(remove));

    const response = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(remove);
  });

  it('Deve retornar um lista com todos os jogos corretamente', async function () {
    sinon.stub(SequelizeMatches.prototype, 'findAll').resolves(matchesMock);

    const response = await chai
      .request(app)
      .get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });

  it('Deve ser possível finalizar um jogo pela rota /matches/:id/finish', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Matches, 'findByPk').resolves(Matches.build(matchesMock[0]));
    sinon.stub(Matches.prototype, 'update').resolves(Matches.build(matchesMock[0]));

    const response = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Deve ser possível atualizar um jogo pela rota /matches/:id', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Matches, 'findByPk').resolves(Matches.build(matchesMock[0]));
    sinon.stub(Matches, 'update').resolves([1]);

    const response = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', `Bearer ${token}`)
      .send(goals);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ "message": "Updated" });
  });

  it('Deve ser retornar a mesnagem de erro caso não seja possível atualizar um jogo na rota /matches/:id', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Matches, 'findByPk').resolves(Matches.build(matchesMock[0]));
    sinon.stub(Matches, 'update').resolves([0]);

    const response = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', `Bearer ${token}`)
      .send('');
    
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ "message": "Match not found" });
  });

  it('Deve ser possível criar um jogo pela rota /matches', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Teams, 'findByPk')
      .onFirstCall().resolves(Teams.build({ ...matchesMock[0].homeTeam, id: 1 }))
      .onSecondCall().resolves(Teams.build({ ...matchesMock[0].awayTeam, id: 2 }));
    sinon.stub(Matches, 'create').resolves(Matches.build({ ...newMatch, id: 1 }));

    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(newMatch);
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({ ...newMatch, id: 1 });
  });

  it('Deve retornar uma mensagem de erro caso tente criar um jogo pela rota post /matches com os id de times iguais', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Teams, 'findByPk')
      .onFirstCall().resolves(Teams.build({ ...matchesMock[0].homeTeam, id: 1 }))
      .onSecondCall().resolves(Teams.build({ ...matchesMock[0].awayTeam, id: 1 }));
    sinon.stub(Matches, 'create').resolves(Matches.build({ ...newMatch, id: 1 }));

    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...newMatch, awayTeamId: 1, homeTeamId: 1 });
    
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
  });

  it('Deve retornar uma mensagem de erro caso tente criar um jogo pela rota post /matches com os id de times que não existem no banco de dados', async function () {
    sinon.stub(Users, 'findByPk').resolves(Users.build(authUser));
    const jwt = new JWT();
    const token = jwt.encrypt(authUser);

    sinon.stub(Teams, 'findByPk')
      .onFirstCall().resolves(Teams.build({ ...matchesMock[0].homeTeam, id: 0 }))
      .onSecondCall().resolves(null);
    sinon.stub(Matches, 'create').resolves(Matches.build({ ...newMatch, id: 1 }));

    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(newMatch);
    
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ "message": "There is no team with such id!" });
  });
});
