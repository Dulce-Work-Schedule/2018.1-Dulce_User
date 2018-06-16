var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

module.exports = function(options){

  this.add('role:user, cmd:create', function create( msg, respond ) {

    var user = this.make('users')

    user.name = msg.name
    user.registration = msg.registration
    user.sector = msg.sector
    user.hospital = msg.hospital
    user.password = msg.password
    user.manager = msg.manager

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

  this.add('role:user, cmd:listUser', function listUser(msg, respond){

    var user = this.make('users');
    user.list$( { all$: true } , function(error, user){
      respond(null, user);
    });


  })

  .add('role:user, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })

  this.add('role:user, cmd:editUser', function(msg, respond){

    var userId = msg.id;
    var user = this.make('users')

    user.load$(userId, function(error, user) {

      user.name = msg.name
      user.registration = msg.registration
      user.sector = msg.sector
      user.hospital = msg.hospital
      user.password = msg.password
      user.manager = msg.manager

      user.save$(function(err,user){
        respond( null, user)
      });
    });
  })

  this.add('role:user, cmd:authenticate', function(msg, respond) {
          var registration = msg.registration;
          var user = this.make('users')
           user.load$({registration},function(error, user) {
             if (!user) {
               respond( null,{
                 success: false,
                 message: ' Falha de autenticação. Usuário não encontrado.'
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
                        name: user.name,
                        sector: user.sector,
                        hospital: user.hospital,
                        manager: user.manager,
                        registration: user.registration }

                  });
                } else {
                  respond(null,{
                    success: false,
                    message: 'Falha de autenticação. Senha incorreta! '
                  })
                }
              }
      });
    });

}
