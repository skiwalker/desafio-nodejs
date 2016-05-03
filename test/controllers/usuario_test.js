var request = require('supertest');
var assert 	= require('assert');
var app 	= require('../../app');
var db 		= require('../../config/database');
var jwt 	= require('jsonwebtoken');
var uuid 	= require('uuid');
var moment 	= require('moment');
var sha1 	= require('sha-1');
var md5 	= require('md5');

var timestamp 			= moment().format('YYYY-MM-DD HH:mm:ss');
var data_criacao 		= timestamp;
var data_atualizacao 	= timestamp;
var ultimo_login 		= timestamp;
var _id 				= uuid.v4();
var token 				= jwt.sign({ email: 'yuri@thiagones.com', ult_login: timestamp }, 'cs-desafio-node', { expiresIn: 1800 });

var objCadastrar = {
	"_id" : _id,
	"nome": "Yuri Santos",
	"email": "yuri@thiagones.com",
	"senha": "1234",
	"telefone": [{
		"numero": "999999999",
		"ddd": "11"
	}],
	"data_criacao" : data_criacao,
	"data_atualizacao" : data_atualizacao,
	"ultimo_login" : ultimo_login,
	"token" : token
};

describe('Validação GET não encontrado', function() {
	
	beforeEach(function(done){
		
		db.collection('usuarios').remove({}, done);
		
	});
	
    it('get /buscar/:id', function(done) {
		
		db.collection('usuarios').insert(objCadastrar, function(err, data){
			
			request(app)
			.get('/buscar/'+objCadastrar._id)
			.expect(401)
			.end(function(err, res) {
				console.log('res', res.body);
				assert.deepEqual(res.body, { 'mensagem': 'Não encontrado' });
			});
		});
		done();
    });
	
	
	it('post /login', function(done) {
		
		db.collection('usuarios').insert(objCadastrar, function(err, data){
			request(app)
			.post('/cadastrar')
			.send(objCadastrar)
			.expect(401)
			.end(function(err, res) {
				assert.equal(res.body, 'Nao Autorizado');
			});
		});
		done();
	});
});