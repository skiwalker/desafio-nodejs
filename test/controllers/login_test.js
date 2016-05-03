var request = require('supertest');
var assert 	= require('assert');
var app 	= require('../../app');
var db 		= require('../../config/database');
var sha1 	= require('sha-1');
var md5 	= require('md5');
var db 		= require('../../config/database');


describe('Validação POST login', function() {
   
    
	beforeEach(function(done){
		db.collection('usuarios').remove({}, done);
	});
	
	var senha = sha1(md5('1234'));
	var dadosLogin = {
        'email' : 'skiwalker@gmail.com',
        'senha' : senha
    };

	db.collection('usuarios').findOne(dadosLogin, function(err, data){
		it('post /login', function(done) {
        request(app)
        .post('/login')
        .send(dadosLogin)
        .expect(401)
        .end(function(err, res) {
				assert.equal(res.body, 'Nao Autorizado');
			});
			done();
		});
	});	
});