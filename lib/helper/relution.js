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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

var _html5Project = require('./html5-project');

var _html5Project2 = _interopRequireDefault(_html5Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var NATIVE = 'native';
var HTML5CONTAINER = 'html5';

var RelutionCli = function () {
  function RelutionCli() {
    var appPrefix = arguments.length <= 0 || arguments[0] === undefined ? 'relution' : arguments[0];
    var debug = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, RelutionCli);

    this.appPrefix = appPrefix;
    this.rcConf = null;
    this.projectConf = null;
    this.rcFilePath = this.getUserHome() + '/.' + this.appPrefix + 'rc';
    this.project = null;
    this.isProject = false;
    this.html5Project = null;
    this.projectType = '';
    //this.setProject();
    //this.setHtml5Project();
    this.rcFileExist();
  }

  _createClass(RelutionCli, [{
    key: 'getRcFilePath',
    value: function getRcFilePath() {
      return this.rcFilePath;
    }
  }, {
    key: 'rcFileExist',
    value: function rcFileExist() {
      var self = this;
      fs.exists(this.rcFilePath, function (exists) {
        if (!exists) {
          return self.createRcFile();
        }
        //console.log(`${self.rcFilePath} available` )
      });
    }
  }, {
    key: 'getProjectType',
    value: function getProjectType() {
      //var promise = new Promise();
      return Promise.all([this.setProject(), this.setHtml5Project()]);
    }
  }, {
    key: 'setProject',
    value: function setProject() {
      var _this = this;

      this.project = new _project2.default(this.appPrefix);
      return this.project.isProject().then(function (result) {
        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
          _this.isProject = true;
          _this.projectConf = result;
          return _this.projectType = 'native';
          //console.log(result);
        }
      }).catch(function () {
        console.log('looks not a ' + NATIVE + ' project');
      });
    }
  }, {
    key: 'setHtml5Project',
    value: function setHtml5Project() {
      this.html5Project = new _html5Project2.default(this.appPrefix);
      var self = this;
      return this.html5Project.isProject().then(function (result) {
        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
          self.isProject = true;
          self.projectConf = result;
          return self.projectType = 'html5';
          //console.log(result);
        }
      }).catch(function () {
        console.log('looks not a ' + HTML5CONTAINER + ' project');
      });
    }
  }, {
    key: 'getUserHome',
    value: function getUserHome() {
      return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
    }
  }, {
    key: 'streamRc',
    value: function streamRc() {
      var self = this;
      return new Promise(function (resolve, reject) {
        return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function (err) {
          return fs.readFile(self.rcFilePath, 'utf8', function (err, data) {
            if (err) {

              return reject(err);
            }
            self.rcConf = JSON.parse(data);
            return resolve(self.rcConf);
          });
        });
      }, this);
    }
  }, {
    key: 'createRcFile',
    value: function createRcFile() {
      var self = this;
      return new Promise(function (resolve, reject) {
        return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function (err) {
          if (err) {
            reject(err);
          }
          return fs.writeFile(self.rcFilePath, { encoding: 'utf8', mode: 755 }, function (err) {
            if (err) {
              reject(err);
            }
            console.log('rc file are written');
            return resolve(true);
          });
        });
      }, this);
    }
  }, {
    key: 'updateRcFile',
    value: function updateRcFile(content) {
      var self = this;
      self.rcConf = content;
      return new Promise(function (resolve, reject) {
        return fs.writeFile(self.rcFilePath, JSON.stringify(content), function (err) {
          if (err) reject(err);
          console.log('It\'s saved!');
          return resolve(true);
        });
      });
    }
  }]);

  return RelutionCli;
}();

exports.default = RelutionCli;