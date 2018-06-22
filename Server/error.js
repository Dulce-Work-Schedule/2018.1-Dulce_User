module.exports = function(options){
  this.add('role:user, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  });
};
