'use strict';

var moment 	= require('moment');
var model 	= require('../models/UsuarioModel');
var uuid 	= require('uuid');
var jwt 	= require('jsonwebtoken');
var sha1 	= require('sha-1');
var md5 	= require('md5');

var UsuarioController = {};

// => Cadastra um novo usuário
UsuarioController.cadastrar = function(req, res, next) {
	
	var dadosUsuario 	= req.body;
	var timestamp 		= moment().format('YYYY-MM-DD HH:mm:ss');

	dadosUsuario.data_criacao = timestamp;
	dadosUsuario.data_atualizacao = timestamp;
	dadosUsuario.ultimo_login = timestamp;
	dadosUsuario._id = uuid.v4();
	dadosUsuario.senha = sha1(md5(dadosUsuario.senha));
	dadosUsuario.token = jwt.sign({ email: dadosUsuario.email, ult_login: timestamp }, 'cs-desafio-node', { expiresIn: 1800 });
	
	model.validaEmail(dadosUsuario.email, function(err, data) {
		if(!data) { 
		
			model.cadastrar(dadosUsuario, function(err, dataCadastro) {
								
				var dadosRetorno = {
					id: dataCadastro._id,
					data_criacao: dataCadastro.data_criacao,
					data_atualizacao: dataCadastro.data_atualizacao,
					ultimo_login: dataCadastro.ultimo_login,
					token: dataCadastro.token
				};
				res.status(200).json(dadosRetorno);
			});
			
		} else {
			res.status(200).json({mensagem:'E-mail já existente'});
		}
	});
}

// => Busca um usuario por id
UsuarioController.buscar = function(req, res) {
	var idUsuario 	= req.params;
	var token 		= req.headers.bearer;
	
	model.buscar(idUsuario, token, function(err, data) {
		
		if(!data) {
			res.status(401).json({ mensagem: 'Não encontrado' });
		} else {
			jwt.verify(data.token, 'cs-desafio-node', function(err) {
            if (err) {
              res.status(403).json({ mensagem: 'Sessão Expirada' });
            } else {
              res.status(200).json(data);
            }
          });
		}
	});
	
}

module.exports = UsuarioController;