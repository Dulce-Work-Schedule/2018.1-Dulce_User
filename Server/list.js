module.exports = function(options){
  this.add('role:user, cmd:list', function list(msg, respond){
    var user = this.make('users');
    user.list$( { all$: true } , function(error, user){
      respond(null, user);
    });
  });
};
