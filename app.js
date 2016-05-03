'use strict';

var express 			= require('express');
var expressValidator 	= require('express-validator');
var bodyParser  		= require('body-parser');
var app 				= express();
var validacoes 			= require('./utils/validacoes');

app.use(bodyParser.json());
app.use(expressValidator(validacoes));
app.use('/', require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Não encontrado');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 503);
  res.json({ mensagem: err.message });
  next();
});


/*app.listen(3000, function(){
	console.log('Server Rodando...');
});*/

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Servidor Rodando...", process.env.IP + ":" + process.env.PORT);
});

module.exports = app;