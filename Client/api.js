function validate_field(field, result){
  if (field.value == null || field.value == ''){
    result[field.field_name + '_error'] = 'O campo ' + field.verbose + ' é obrigatório.';
  } else if (typeof(field.value) != 'string') {
    result[field.field_name + '_error'] = 'O campo ' + field.verbose +' deve ser uma string.';
  }
  return result;
}

module.exports = function api(options) {
  this.add('role:api,path:create', function (msg, respond) {
    var firstName = {
      verbose: 'Primeiro Nome',
      field_name: 'firstName',
    }
    var lastName = {
      verbose: 'Sobrenome',
      field_name: 'lastName',
    }
    var email = {
      verbose: 'Email',
      field_name: 'email',
    }
    var password = {
      verbose: 'Senha',
      field_name: 'password',
    }
    firstName.value = msg.args.body.firstName
    lastName.value = msg.args.body.lastName
    email.value = msg.args.body.email
    password.value = msg.args.body.password
    result = {}

    result = validate_field(firstName, result)
    result = validate_field(email, result)
    result = validate_field(lastName, result)
    result = validate_field(password, result)

    // verify that an error has occurred
    if (Object.entries(result)[0]) {
      console.log("Result:");
      console.log(result);
      result.success = false;
      respond(null, result)
    // else, everything sucess
    } else {
      this.act('role:user,cmd:create', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      }, respond)
    }
  })

  this.add('role:api,path:listById',function(msg, respond){
    var id = msg.args.query.id



    this.act('role:user, cmd:listById', {
      id: id
    }, respond)

  });

  this.add('role:api,path:list', function(msg, respond){
    this.act('role:user, cmd:list',{}, respond)

  });

  this.add('role:api,path:error', function(msg, respond){
    this.act('role:user, cmd:error',{}, respond)

  });

this.add('role:api,path:edit', function(msg, respond){

  var firstName = msg.args.body.firstName
  var lastName = msg.args.body.lastName
  var email = msg.args.body.email
  var password = msg.args.body.password
  var id = msg.args.query.id

  this.act('role:user, cmd:edit', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    id: id
  }, respond)

});

this.add('role:api, path:login', function (msg, respond) {

  var email = msg.args.body.email
  var password = msg.args.body.password

  this.act('role:user, cmd:authenticate', {
    email: email,
    password: password,
  }, respond)
})

  this.add('init:api', function (msg, respond) {

    this.act('role:web',{ routes: {
      prefix: '/api/user',
      pin:    'role:api,path:*',
      map: {
        login: { POST:true },
        create: { POST:true },
        listById: { GET:true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/user/error',
                    }
        },
        list: { GET: true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/user/error',
                    }
        },
        edit: { PUT: true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/user/error',
                    }
        },
        error: {GET:true}
      }
    }}, respond)
  });
}
