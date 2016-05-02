'use strict';

var mongoose = require('mongoose');

var uri = 'mongodb://localhost/desafio';
var db = mongoose.createConnection(uri);


db.on('error', function(err) {
  console.log(err);
});

module.exports = db;