var EmberApp = require('ember-fastboot-server/ember-app');
var app = new EmberApp();

exports.handleRequest = function(event, context) {
  // The requested URL
  var path = event.path;

  app.visit(path)
    .then(success, failure)
    .finally(function() {
      debug("finished handling; url=%s", path);
    });

  function success(result) {
    server.handleSuccess(res, path, result, startTime);
  }

  function failure(error) {
    server.handleFailure(res, path, error, startTime);
  }
};
