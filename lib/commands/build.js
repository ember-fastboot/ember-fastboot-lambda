module.exports = {
  name: 'lambda:build',
  description: 'Builds the package to be deployed to Lambda',

  run: function(commandOptions) {
    var BuildTask = require('../tasks/build');

    var buildTask = new BuildTask({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    return buildTask.run(commandOptions);
  }
};

