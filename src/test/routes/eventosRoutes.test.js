/* eslint-disable no-unused-expressions */
import { after } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import db from '../../db/dbconfig.js';

chai.use(chaiHttp);
const { expect } = chai;

after(async () => {
  await db.destroy();
});

describe('GET em /eventos', () => {
  it('Deve retornar uma lista de eventos', (done) => {
    process.env.EVENTO_FLAG = 'true';
    chai
      .request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('descricao');
        expect(res.body[0]).to.have.property('data');
        expect(res.body[0]).to.have.property('autor_id');
        done();
      });
  });

  it('Deve retornar erro 404', (done) => {
    process.env.EVENTO_FLAG = 'false';
    chai.request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('Deve retornar um evento', (done) => {
    const eventoId = 1;
    chai
      .request(app)
      .get(`/eventos/${eventoId}`)
      .set('Accept', 'appplication/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('nome');
        expect(res.body).to.have.property('descricao');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('autor_id');
        done();
      });
  });

  it('Nao deve retornar um evento com id invalido', (done) => {
    const eventoId = 'not_an_id';
    chai
      .request(app)
      .get(`/eventos/${eventoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`id ${eventoId} não encontrado`);
        done();
      });
  });
});

describe('POST em /eventos', () => {
  it('Deve criar um novo evento', (done) => {
    const evento = {
      nome: 'Evento de teste post',
      descricao: 'Um evento que testa o post',
      data: '2025-06-19',
      autor_id: '3',
    };

    chai
      .request(app)
      .post('/eventos')
      .set('Accept', 'application/json')
      .send(evento)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').eql('evento criado');
        done();
      });
  });

  it('Nao deve criar um evento ao receber body vazio', (done) => {
    const evento = {};

    chai
      .request(app)
      .post('/eventos')
      .set('Accept', 'application/json')
      .send(evento)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message')
          .eql('corpo da requisição vazio');
        done();
      });
  });
});

describe('PUT em /eventos', () => {
  it('Deve atualizar um evento', (done) => {
    const eventoId = 1;
    const eventoAtualizado = {
      descricao: 'atualizando a desc do evento',
    };

    chai
      .request(app)
      .put(`/eventos/${eventoId}`)
      .set('Accept', 'application/json')
      .send(eventoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.content[0]).to.include({
          descricao: eventoAtualizado.descricao,
        });
        done();
      });
  });

  it('Nao deve atualizar um evento com id invalido', (done) => {
    const eventoId = 'not_an_id';
    const eventoAtualizado = {
      descricao: 'nova descricao',
    };

    chai
      .request(app)
      .put(`/eventos/${eventoId}`)
      .set('Accept', 'application/json')
      .send(eventoAtualizado)
      .end((err, res) => {
        // expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`id ${eventoId} não encontrado`);
        done();
      });
  });
});

describe('DELETE em /eventos', () => {
  it('Deve deletar um evento', (done) => {
    const eventoId = 1;
    chai
      .request(app)
      .delete(`/eventos/${eventoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message')
          .eql('evento excluído');
        done();
      });
  });

  it('Nao deve deletar evento com id invalido', (done) => {
    const eventoId = 'not_an_id';
    chai
      .request(app)
      .delete(`/eventos/${eventoId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`Evento com id ${eventoId} não encontrado`);
        done();
      });
  });
});
