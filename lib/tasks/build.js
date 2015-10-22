var FastBootPackage = require('../models/fastboot-package');
var Task            = require('ember-cli/lib/models/task');

module.exports = Task.extend({
  run: function(/*commandOptions, rawArgs*/) {
    var fastBootPackage = new FastBootPackage({
      ui: this.ui,
      project: this.project
    });

    return fastBootPackage.buildZip();
  }
});
