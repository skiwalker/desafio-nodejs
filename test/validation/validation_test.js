'use strict';
var rewire = require('rewire');
var expect = require('expect.js');
var request = require('supertest-as-promised');
var app;

describe('Teste validation usuários', function() {
	
  beforeEach(function() {
    app = rewire('../../app');
  });

  it('1. validando cadastrar', function(done) {
	  
    request(app)
      .post('/cadastrar')
      .expect(422)
      .then(function(res) {
		  
        var dados = res.body;
        expect(dados).to.be.a('object');
        expect(dados).to.have.property('mensagem');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('2. Validando login', function(done) {
    request(app)
      .post('/login')
      .expect(422)
      .then(function(res) {

        var dados = res.body;
        expect(dados).to.be.a('object');
        expect(dados).to.have.property('mensagem');
        expect(dados.mensagem).to.be.a('array');
        expect(dados.mensagem.length).to.be.equal(2);

        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('3. Validando Buscar', function(done) {
    request(app)
      .get('/123')
      .expect(422)
      .then(function(res) {

        var dados = res.body;
        expect(dados).to.be.a('object');
        expect(dados).to.have.property('mensagem');
        expect(dados.mensagem).to.be.eql('Nao Autorizado');

        done();
      })
      .catch(function(err) {
        done(err);
      });
  });


});