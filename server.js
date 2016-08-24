var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 8000
});

server.register({
  register: Inert
}, function(err) {
  if (err) {
    console.log(err);
  }
})

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

server.start( function(err) {
  if (err) {
    console.log(err);
  }

  console.log(server.info.uri);
});
