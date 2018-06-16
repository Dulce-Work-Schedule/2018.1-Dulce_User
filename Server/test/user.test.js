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
      name: 'Lucas',
      registration: 12346,
      sector: 'pediatria',
      hospital: 'Base',
      password: 123,
      manager: true
    }, function(err, result){
      expect(result.name).to.equal('Lucas')
      fin()
    })
  })
});
