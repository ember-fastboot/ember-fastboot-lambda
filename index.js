/* jshint node: true */
'use strict';

var commands = require('./lib/commands');

module.exports = {
  name: 'ember-fastboot-lambda',
  includedCommands: function() {
    return commands;
  }
};
