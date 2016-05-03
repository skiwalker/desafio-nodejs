'use strict';

var md5 			= require('md5');
var sha1 			= require('sha-1');
var db 				= require('../config/database');
var UsuarioModel 	= {};

UsuarioModel.cadastrar = function(dataQuery, callback) {
  db.collection('usuarios').insert(dataQuery, function(err, data) {
	  if(err) {
		  callback(err, null);
	  }
	  callback(null, data.ops[0]);
  });
};

UsuarioModel.validaEmail = function(email, callback) {
  var query = { email: email };
  db.collection('usuarios').count(query, function(err, data) {
	  if(err) {
		callback(err);
	  }
	  callback(null, data);
  });
};


UsuarioModel.buscar = function(_id, token, callback) {
	  
  var query = { _id: _id.user_id, token:token };
  
  db.collection('usuarios').findOne(query, function(err, data) {
	  if(err) {
		callback(err);
	  }
	  callback(null, data);
  });
};

module.exports = UsuarioModel;