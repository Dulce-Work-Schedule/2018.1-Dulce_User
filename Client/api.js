module.exports = function api(options) {

  this.add('role:api,path:create', function (msg, respond) {

    var firstName = msg.args.body.firstName
    var lastName = msg.args.body.lastName
    var email = msg.args.body.email
    var password = msg.args.body.password

    this.act('role:user,cmd:create', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }, respond)
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
