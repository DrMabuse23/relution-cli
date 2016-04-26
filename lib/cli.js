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

var _tower = require('./commands/tower');

var _tower2 = _interopRequireDefault(_tower);

var _relution = require('./helper/relution');

var _relution2 = _interopRequireDefault(_relution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cli = function () {
  function Cli(opts) {
    _classCallCheck(this, Cli);

    var self = this;
    this.helper = new _relution2.default();
    this.tower = new _tower2.default();
    this.opts = opts.argv;
    this.commands = null;
    this.run();
  }

  _createClass(Cli, [{
    key: 'run',
    value: function run() {
      var self = this;
      return this.helper.getProjectType().then(function () {
        self.commands = self.tower.getCommandsByType(self.helper.projectType);
        return self.commands;
      });
    }
  }, {
    key: 'addListener',
    value: function addListener(commandDispatcher) {
      commandDispatcher.subscribe({
        next: function next(x) {
          return console.log('got value ' + x);
        },
        error: function error(err) {
          return console.error('something wrong occurred: ' + err);
        },
        complete: function complete() {
          return console.log('done');
        }
      });
    }
  }]);

  return Cli;
}();

exports.default = Cli;