
var rewire 	= require('rewire');
var expect 	= require('expect.js');
var request = require('supertest-as-promised');
var app 	= require('../../app.js')
var controllers;

var req = request("http://127.0.0.1:3000");

describe('Teste validation usuários', function() {
	
	beforeEach(function(){
	   a = 4;
	   b = 2;
	});

  it('1. Valida cadastro', function(done) {
	expect(a + b).to.eql(6);
	done();
  });
  
  it('Valida get buscar não autorizado', function(done) {
	req.get('/dff8bf3f-49bf-42d6-9c6f-12b288d9a17a')
	 .expect('Content-Type', /json/)
	 .expect(401, done);  
  });
  
  
  it('Valida post cadastrar', function(done) {
	  
	var dados = { "nome": "Thiago", "email": "skiwalker@gmail.com", "senha": "1234", "telefones": [ { "numero": "123456789", "ddd": "11" } ] };
	
	req.post('/cadastrar')
	 .send(dados)
	 .expect('Content-Type', /json/)
	 .expect(200, done);  
  });
});