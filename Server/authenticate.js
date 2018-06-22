var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

var Promise = require('bluebird');

module.exports = function(options){

this.add('role:user, cmd:authenticate', function(msg, respond) {
        var email = msg.email;
        var user = this.make('users')
         user.load$({email},function(error, user) {
           if (!user) {
             respond( null,{
               success: false,
               message: 'Email ou senha inválidos'
             });
           } else {
              if(msg.password == user.password){
                var payload = {
                  id: user.id
                }
                var token = jwt.sign(payload, SECRET_KEY, {expiresIn});
                respond(null,{
                  success: true,
                  message: 'Autenticação realizada com sucesso!',
                  token: token,
                  user: {
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email }

                });
              } else {
                respond(null,{
                  success: false,
                  message: 'Email ou senha inválidos'
                })
              }
            }
        });
    });
};
