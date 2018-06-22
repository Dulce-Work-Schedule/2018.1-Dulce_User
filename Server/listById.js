module.exports = function(options){
  this.add('role:user, cmd:listById', function listById (msg, respond){
    var userId = msg.id;
    var user = this.make('users')
    user.load$(userId, function(error, user) {
      respond(null, user);
    });
  });
};
