var Promise = require('bluebird');

module.exports = function(options){
  this.add('role:user, cmd:create', async function create( msg, respond) {
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
      console.log(error);
    })

    if(Object.entries(result)[0]){
      console.log(result);
      respond(null, result);
    } else{
      user.save$(function(err,user){
        console.log(user);
        respond(null, user)
      });
    };
  });
};
