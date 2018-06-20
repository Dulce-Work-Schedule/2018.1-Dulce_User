var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

var Promise = require('bluebird');

module.exports = function(options){
  this.add('role:user, cmd:create', async function create( msg, respond ) {
    var user = this.make('users')
    user.firstName = msg.firstName
    user.lastName = msg.lastName
    user.email = msg.email
    user.password = msg.password
    var result = {};

    var list$ = Promise.promisify(user.list$, { context: user });
    await list$(
      {
        email: user.email
      }
    )
    .then(await function(list){
      if (list.length != 0){
        result.email_duplicate_error = 'Email já cadastrado';
        result.success = false;
      }
    })
    .catch(function(error){
      // console.log('error:');
      console.log(error);
    })

    if(Object.entries(result)[0]){
      console.log(result);
      respond(null, result);
    } else{
      user.save$(function(err,user){
        console.log(user);
        respond(null, user)
      })
    }
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
    });

    user.save$(function(err,user){
      respond( null, user)
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
