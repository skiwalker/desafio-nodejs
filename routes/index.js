'use strict';

var express 			= require('express');
var router 				= express.Router();

var controllerUsuario 	= require('../controllers/usuario');
var controllerLogin 	= require('../controllers/login');
var validacao 			= require('../validation/validation');

// => Criação de usuario
router.post('/cadastrar', validacao.cadastrar, controllerUsuario.cadastrar);

// => Busca de usuario
router.get('/:user_id', validacao.buscar, controllerUsuario.buscar);

// => Login
router.post('/login', validacao.login, controllerLogin.login);

module.exports = router;