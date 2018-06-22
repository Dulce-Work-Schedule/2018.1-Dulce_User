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

describe('User', function() {

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

  it('User entity editing', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'user',
      cmd: 'create',
      firstName: 'Dulce',
      lastName: 'User',
      email: 'dulce.user@gmail.com',
      password: '54321',
    }, function (err, result){
      console.log(result);
      seneca.act({
        role: 'user',
        cmd: 'edit',
        firstName: 'Dulce2',
        lastName: 'User2',
        email: 'dulce2.user2@gmail.com'
        id: result.id,
      }, function(err, result){
        expect(result.firstName).to.equal('Dulce2')
        expect(result.lastName).to.equal('User2')
        expect(result.email).to.equal('dulce2.user2@gmail.com')
        expect(result.password).to.equal('12345')
        fin()
      })
    })
  })

  it('Should fail on authenticate', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'user',
      cmd: 'authenticate',
      email: 'dulce.user@gmail.com',
      password: '54321'
    }, function(err, result){
      expect(result.message).to.equal('Email ou senha inválidos')
      expect(result.success).to.equal(false)
      fin()
    })
  })

  it('Should give an error message', function(fin){
    var seneca = test_user_seneca(fin)

    seneca.act({
      role: 'user',
      cmd: 'error'
    }, function(err, result){
      expect(result.message).to.equal('acesso negado')
      expect(result.success).to.equal(false)
      fin()
    })
  })

});
