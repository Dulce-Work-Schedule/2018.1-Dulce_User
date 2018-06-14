var Seneca = require('seneca')
var assert = require('assert')
var chai = require('chai')


var expect = chai.expect;

function test_login_seneca (fin){
  return Seneca({log: 'test'})
  .test(fin)

  .use("entity")
  .use(require('../_login'))
}

describe('Should try make login', function() {

  it('Login entity creation', function(fin){
    var seneca = test_login_seneca(fin)

    seneca.act({
      role: 'login',
      cmd: 'authenticate',
      registration: "12345",
      password: "12345"
    }, function(err, result){
      expect(result.success).to.equal(false)
      expect(result.message).to.equal(' Falha de autenticação. Usuário não encontrado.')
      fin()
    })
  })
});
