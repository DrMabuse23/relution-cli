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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helperRelution = require('./../helper/relution');

var _helperRelution2 = _interopRequireDefault(_helperRelution);

var _helperValidation = require('./../helper/validation');

var _helperValidation2 = _interopRequireDefault(_helperValidation);

var _helperTranslation = require('./../helper/translation');

var _helperTranslation2 = _interopRequireDefault(_helperTranslation);

var Command = (function () {
  function Command(name, commands) {
    _classCallCheck(this, Command);

    this.name = name;
    this.commands = commands;
    this.cli = new _helperRelution2['default']();
    this.validation = new _helperValidation2['default']();
    this.i18n = new _helperTranslation2['default']();
    this.tower = null;
  }

  _createClass(Command, [{
    key: 'init',
    value: function init() {
      return { name: this.name, commands: this.commands };
    }

    /**
     * @description return only the command names
     * @return {Array}
     */
  }, {
    key: 'flatCommands',
    value: function flatCommands() {
      var flat = [];
      var self = this;
      this.commands.forEach(function (command) {
        //console.log('command', command);
        flat.push(self.i18n.t(command[0]));
      });
      return flat;
    }

    /**
     *
     * @return {*[]}
     */
  }, {
    key: 'start',
    value: function start() {
      if (this.commands.length > 0) {
        var c = this.flatCommands();
        //console.log('flatCommands', c);
        return [this.name, this.i18n.t("Please Choose Your Command"), c];
      }
    }

    /**
     *
     * @param inquirer
     * @param tower
     * @return {*}
       */
  }, {
    key: 'exit',
    value: function exit(inquirer, tower) {
      this.tower = tower;
      return this.tower.showCommands('Start', this.i18n.t('Please choose Your Command'), this.tower.startCommands);
    }
  }]);

  return Command;
})();

exports['default'] = Command;
module.exports = exports['default'];