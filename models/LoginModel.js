var md5 			= require('md5');
var sha1 			= require('sha-1');
var db 				= require('../config/database');
var LoginModel 	= {};

LoginModel.login = function(data, callback) {
	
  var query = { email: data.email, senha: sha1(md5(data.senha)) };
  
  db.collection('usuarios').findOne(query, function(err, data) {
	  if(err){
		callback(err);
	  }
	  callback(null, data);
  });
};

LoginModel.atualizaToken = function(_id, data, callback) {
  var query = { _id: _id };
  db.collection('usuarios').update(query, { $set: data }, function(err, data) {
	  if(err) {
		callback(err);
	  } else {
		callback(data);
	  }
  });
};

module.exports = LoginModel;