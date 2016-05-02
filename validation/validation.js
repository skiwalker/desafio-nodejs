'use strict';

var validacao = {};

function verificaErros(req, res, next) {
  var errors = req.validationErrors();
  if (errors) {
    var listaErros = [];
    for (var i = 0, tam = errors.length; i < tam; i++) {
      listaErros.push(errors[i].msg);
    }
	console.log(listaErros);
    res.status(422).json({ mensagem: listaErros });
  } else {
    next();
  }
}

validacao.cadastrar = function(req, res, next) {
	
  req.checkBody('nome', 'Nome Invalido').notEmpty();
  req.checkBody('email', 'Email Invalido').isEmail();
  req.checkBody('senha', 'Senha Invalida').notEmpty();
  req.checkBody('telefones', 'Telefone Invalido').validaTelefones();

  verificaErros(req, res, next);
};

validacao.login = function(req, res, next) {

  req.checkBody('email', 'Email Invalido').isEmail();
  req.checkBody('senha', 'Senha Invalida').notEmpty();

  verificaErros(req, res, next);
};

validacao.buscar = function(req, res, next) {

  if (!req.headers.bearer) {
    res.status(401).json({ mensagem: 'Nao Autorizado' });
  } else {
    next();
  }
};

module.exports = validacao;
