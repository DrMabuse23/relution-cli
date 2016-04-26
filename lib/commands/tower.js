'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by pascalbrewing on 22/09/15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2015
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * M-Way Solutions GmbH. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.mwaysolutions.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Redistribution and use in source and binary forms, with or without
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * modification, are not permitted.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES INCLUDING,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _serverCommand = require('./server-command');

var _serverCommand2 = _interopRequireDefault(_serverCommand);

var _deployCommand = require('./deploy-command');

var _deployCommand2 = _interopRequireDefault(_deployCommand);

var _translation = require('./../helper/translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

/**
 * @class Tower
 * @description Handles the Commands for the User Output
 */

var Tower = function () {
  function Tower() {
    var commands = arguments.length <= 0 || arguments[0] === undefined ? [new _serverCommand2.default(), new _deployCommand2.default()] : arguments[0];

    _classCallCheck(this, Tower);

    this.i18n = new _translation2.default();
    this.commands = commands;
    this.tree = {};
    this.startCommands = null;
    this.inquirer = require('inquirer');
    var self = this;
    //console.log(commands);
    this.commands.forEach(function (command) {
      self.registerCommand(command);
    });
  }

  _createClass(Tower, [{
    key: 'registerCommand',
    value: function registerCommand(command) {
      command.init();
      this.commands[command.name] = command;
      this.tree[command.name] = command.commands;
    }
  }, {
    key: 'triggerCommand',
    value: function triggerCommand(name, method) {
      var subCommands = this.commands[name][method]();
      //console.log(subCommands);
      //console.log('subCommands', subCommands);
      return this.showCommands(subCommands[0], subCommands[1], subCommands[2], this.commandCallback);
    }
  }, {
    key: 'triggerSubCommand',
    value: function triggerSubCommand(name, method) {
      //console.log(name, method);
      return this.commands[name][method](this.inquirer, this);
    }
  }, {
    key: 'getCommandsByType',
    value: function getCommandsByType() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? 'native' : arguments[0];

      var self = this;
      var availableCommands = {};
      var keys = Object.keys(this.tree);
      for (var i = 0, l = keys.length; i < l; i++) {
        availableCommands[keys[i]] = _.filter(self.tree[keys[i]], function (n) {
          if (type === 'native' && n[1] || type === 'html5' && n[2]) {
            return n[0];
          }
          return false;
        });
      }
      return availableCommands;
    }
  }, {
    key: 'getStartCommands',
    value: function getStartCommands(commands) {
      this.startCommands = Object.keys(commands);
      return this.startCommands;
    }
  }, {
    key: 'showCommands',
    value: function showCommands() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? "Start" : arguments[0];
      var message = arguments.length <= 1 || arguments[1] === undefined ? "Please Choose Your Command" : arguments[1];
      var commands = arguments[2];

      //console.log('commands', commands);
      return this.inquirer.prompt([{
        type: "list",
        name: name,
        message: message,
        choices: commands
      }], this.commandCallback.bind(this));
    }
  }, {
    key: 'commandCallback',
    value: function commandCallback(answers) {
      var self = this;
      var keys = Object.keys(answers);
      if (answers.Start) {
        //console.log('callback Start', answers);
        return self.triggerCommand(answers.Start, 'start');
      } else {
        //console.log('callback sub', answers, keys[0], answers[keys[0]]);
        return self.triggerSubCommand(keys[0], answers[keys[0]]);
      }
    }
  }]);

  return Tower;
}();

exports.default = Tower;