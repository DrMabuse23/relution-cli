/**
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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * ServerCommand
 * you can create, delete, list, and add a default Server
 */

var ServerCommand = (function (_Command) {
  _inherits(ServerCommand, _Command);

  function ServerCommand() {
    _classCallCheck(this, ServerCommand);

    //available commands
    //super('server', [['create', true, true], ['delete', true, true], ['list', true, true], ['default', true, true], ['exit', true, true]]);
    _get(Object.getPrototypeOf(ServerCommand.prototype), 'constructor', this).call(this, 'server', [['create', true, true], ['delete', true, true], ['exit', true, true]]);
    this.server = null;
    this.defaultServerIndex = null;
    this.tower = null;
    this.getServerList();
  }

  _createClass(ServerCommand, [{
    key: 'findDefaultIndex',
    value: function findDefaultIndex(element) {
      if ('name' in element && element.name !== '' && element.name === this) {
        return true;
      }
      return false;
    }
  }, {
    key: 'setDefaultServerIndex',
    value: function setDefaultServerIndex(name) {
      return this.server.findIndex(this.findDefaultIndex, name);
    }
  }, {
    key: 'getDefaultServer',
    value: function getDefaultServer() {
      return this.server[this.defaultServerIndex];
    }

    //Stream mcaprc to json
    /**
     *
     * @return {Promise.<T>}
     */
  }, {
    key: 'getServerList',
    value: function getServerList() {
      var self = this;
      return this.cli.streamRc().then(function () {
        self.server = self.cli.rcConf.server;
        self.defaultServerIndex = self.setDefaultServerIndex(self.cli.rcConf.defaultServer);
        //console.log('self.server', self.server);
        //console.log('self.cli:', self.cli.rcConf.defaultServer);
        //console.log('self.defaultServer:', self.defaultServer);
        return self.server;
      })['catch'](function (e) {
        console.log(e);
      });
    }

    /**
     *
     * @param server
     * @description add a new Server
     */
  }, {
    key: 'add',
    value: function add(server) {
      var self = this;
      if (this.server) {
        this.server.push(server);
      }
      //console.error('this.server', self.cli.rcConf);
      self.cli.updateRcFile(self.cli.rcConf).then(function (res) {
        //console.log('updatedfile', res, self);
        self.exit(null, self.tower);
      });
    }
  }, {
    key: 'default',
    value: function _default() {}
  }, {
    key: 'removeServer',
    value: function removeServer(answers) {
      var index = _lodash2['default'].findIndex(this.server, { name: answers['server delete'] });
      var self = this;
      this.server.splice(index, 1);
      //console.error('this.server', self.cli.rcConf);
      self.cli.updateRcFile(self.cli.rcConf).then(function (res) {
        console.log('Server is removed from list');
        self.getServerList();
        self.exit(null, self.tower);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(inquirer, tower) {
      this.tower = tower;
      var self = this;
      var servers = [];
      var i = 0;
      this.cli.rcConf.server.forEach(function (server) {
        servers[i] = server.name;
        i++;
      });
      return inquirer.prompt([{
        type: "list",
        name: self.name + ' delete',
        message: self.i18n.t('Please choose the server you will delete'),
        choices: servers
      }], this.removeServer.bind(this));
    }
  }, {
    key: 'create',
    value: function create(inquirer, tower) {
      var self = this;
      this.tower = tower;
      var configAdd = [{
        type: 'input',
        name: 'name',
        message: self.i18n.t('Server Name'),
        validate: function validate(value) {
          var pass = value.match(self.validation.stringNumber);
          if (pass) {
            return true;
          } else {
            return self.i18n.t('Please enter a valid Server name');
          }
        }
      }, {
        type: 'input',
        name: 'baseUrl',
        message: self.i18n.t('Enter the server url (http://....)'),
        validate: function validate(value) {
          var pass = value.match(self.validation.urlPattern);

          if (pass) {
            return true;
          } else {
            return self.i18n.t('Please enter a valid url');
          }
        }
      }, {
        type: 'input',
        name: 'userName',
        message: self.i18n.t('Enter your username'),
        validate: self.validation.notEmptyValidate('Username')
      }, {
        type: 'password',
        name: 'password',
        message: self.i18n.t('Enter your Password'),
        validate: self.validation.notEmptyValidate('Password')
      }];
      inquirer.prompt(configAdd, this.add.bind(this));
    }
  }]);

  return ServerCommand;
})(_command2['default']);

exports['default'] = ServerCommand;
module.exports = exports['default'];