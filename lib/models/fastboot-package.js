var denodeify                = require('rsvp').denodeify;
var temp                     = require('temp').track();
var fs                       = require('fs-extra');
var path                     = require('path');
var green                    = require('chalk').green;

var createTemporaryDirectory = denodeify(temp.mkdir);
var copy                     = denodeify(fs.copy);
var ensureDirectory          = denodeify(fs.ensureDir);
var exec                     = denodeify(require('child_process').exec);

var root = process.cwd();

function FastBootPackage(options) {
  this.ui = options.ui;
  this.project = options.project;
  this.tmpPath = null;
  this.tmpBlueprintPath = null;
}

FastBootPackage.prototype.buildZip = function() {
  var self = this;

  return this.createTemporaryDirectory()
    .then(function() {
      return self.copyBlueprint();
    })
    .then(function() {
      return self.installDependencies();
    })
    .then(function() {
      return self.zipBlueprint();
    })
    .then(function() {
      return self.copyZipToWorkingDirectory();
    });
};

FastBootPackage.prototype.createTemporaryDirectory = function() {
  var ui = this.ui;
  var projectName = this.project.name();
  var self = this;

  return createTemporaryDirectory('ember-fastboot-lambda')
    .catch(function(error) {
      ui.writeError("Unable to create temporary directory. " + error);
    })
    .then(function(tmpPath) {
      self.tmpPath = tmpPath;
      self.tmpBlueprintPath = path.join(tmpPath, 'lambda-package');
      self.outputPath = path.join(root, 'dist', projectName + '-lambda.zip');
    });
};

FastBootPackage.prototype.copyBlueprint = function() {
  var blueprintPath = path.resolve(__dirname, '../../blueprints/lambda-package');
  return copy(blueprintPath, this.tmpBlueprintPath);
};

FastBootPackage.prototype.installDependencies = function() {
  return chdir(this.tmpBlueprintPath, function() {
    return exec('npm install');
  });
};

FastBootPackage.prototype.zipBlueprint = function() {
  return chdir(this.tmpPath, function() {
    return exec('zip -r lambda-package.zip lambda-package');
  });
};

FastBootPackage.prototype.copyZipToWorkingDirectory = function() {
  var zipPath = path.join(this.tmpPath, 'lambda-package.zip');
  var outputPath = this.outputPath;
  var ui = this.ui;

  return ensureDirectory(path.dirname(outputPath))
    .then(function() {
      return copy(zipPath, outputPath);
    })
    .then(function() {
      ui.writeLine(green("Lambda deployment package saved to " + outputPath));
    });
};

function chdir(dir, callback) {
  var cwd = process.cwd();
  var returnValue;

  process.chdir(dir);
  returnValue = callback();
  process.chdir(cwd);

  return returnValue;
}

module.exports = FastBootPackage;
