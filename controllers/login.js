'use strict';

var moment 	= require('moment');
var model 	= require('../models/LoginModel');
var jwt 	= require('jsonwebtoken');

var LoginController = {};

LoginController.login = function(req, res) {
	
	model.login(req.body, function(err, dataLogin) {
		if(dataLogin) {
			
			var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
			var dadosUsuario = {};
			dadosUsuario.token = jwt.sign({ email: dataLogin.email, ult_login: timestamp }, 'cs-desafio-node', { expiresIn: 1800 });
			dadosUsuario.ultimo_login = timestamp;
			dadosUsuario.data_atualizacao = timestamp;
			
			model.atualizaToken(dataLogin._id, dadosUsuario, function(err, data) {
				
				var dadosRetorno = {
				  id: dataLogin._id,
				  data_criacao: dataLogin.data_criacao,
				  data_atualizacao: dadosUsuario.data_atualizacao,
				  ultimo_login: dadosUsuario.ultimo_login,
				  token: dadosUsuario.token
				};
				res.status(200).json(dadosRetorno);
			});
			
		} else {
			res.status(401).json({ mensagem: 'Login Invalido' });
		}
	});
}

module.exports = LoginController;