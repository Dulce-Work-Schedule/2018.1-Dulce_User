var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

module.exports = function(options){

  this.add('role:user, cmd:create', function create( msg, respond ) {

    var user = this.make('users')

    user.firstName = msg.firstName
    user.lastName = msg.lastName
    user.email = msg.email
    user.password = msg.password

    user.save$(function(err,user){
      respond(null, user)
    })
  })

  this.add('role:user, cmd:listById', function listById (msg, respond){

    var userId = msg.id;
    var user = this.make('users')
    user.load$(userId, function(error, user) {
      respond(null, user);
    });
  })

  this.add('role:user, cmd:list', function list(msg, respond){

    var user = this.make('users');
    user.list$( { all$: true } , function(error, user){
      respond(null, user);
    });


  })

  .add('role:user, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })

  this.add('role:user, cmd:edit', function(msg, respond){

    var userId = msg.id;
    var user = this.make('users')

    user.load$(userId, function(error, user) {

      user.firstName = msg.firstName
      user.lastName = msg.lastName
      user.email = msg.email
      user.password = msg.password

      user.save$(function(err,user){
        respond( null, user)
      });
    });
  })

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

}
