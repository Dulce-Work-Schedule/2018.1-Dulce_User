var Seneca = require('seneca')
var assert = require('assert')
var chai = require('chai')


var expect = chai.expect;

function test_user_seneca (fin){
  return Seneca({log: 'test'})
  .test(fin)

  .use("entity")
  .use(require('../_user'))
}

describe('Create user', function() {

  it('User entity creation', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'user',
      cmd: 'create',
      firstName: 'Dulce',
      lastName: 'User',
      email: 'dulce.user@gmail.com',
      password: '54321',
    }, function(err, result){
      expect(result.firstName).to.equal('Dulce')
      expect(result.lastName).to.equal('User')
      expect(result.email).to.equal('dulce.user@gmail.com')
      expect(result.password).to.equal('54321')
      fin()
    })
  })
});
