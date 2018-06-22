var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

var Promise = require('bluebird');

module.exports = function(options){
  this.add('role:user, cmd:edit', async function(msg, respond){
    var userId = msg.id;
    var user = this.make('users')
    var result = {}
    console.log("antes");

    var load$ = Promise.promisify(user.load$, { context: user });

    await load$(userId)
    .then(function(user){
      user.firstName = msg.firstName
      user.lastName = msg.lastName
      user.email = msg.email
      user.password = msg.password
      user.save$(function(err,user){
        respond(null, user)
      });
    })
    .catch(function(error){
      result.not_find_error = "Usuário não encontrado";
      console.log("Usuário não encontrado");
      respond(null, result)
    });
  });
};
