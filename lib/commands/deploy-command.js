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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _helperArchiverHtml5 = require('./../helper/archiver-html5');

var _helperArchiverHtml52 = _interopRequireDefault(_helperArchiverHtml5);

var AUTH = '/gofer/security/rest/auth/login';
var FILES = '/relution/api/v1/files';
var METADATA = '/relution/api/v1/apps/fromFile/';
var CREATEAPP = '/relution/api/v1/apps/';
/**
 * DeployRelutionCommand
 * generate a zip from the www folder create a zip and upload it to relution
 */

var DeployRelutionCommand = (function (_Command) {
  _inherits(DeployRelutionCommand, _Command);

  function DeployRelutionCommand() {
    var _this = this;

    _classCallCheck(this, DeployRelutionCommand);

    //['bumpup', false, true]
    _get(Object.getPrototypeOf(DeployRelutionCommand.prototype), 'constructor', this).call(this, 'deploy', [['deploy', false, true], ['exit', false, true]]);
    var self = this;
    this.userForm = {
      email: null,
      orgaName: null,
      password: null,
      userName: null
    };
    this.projectRln = null;
    this.sessionId = null;
    this.deployUrl = '';

    this.sessionResponse = null;

    this.cli.streamRc().then(function () {
      self.server = self.cli.rcConf.server;
      self.cli.setHtml5Project().then(function (res) {
        self.projectRln = _this.cli.html5Project.projectConf;
        self.archiver = new _helperArchiverHtml52['default'](_this.cli.html5Project.projectConf, true);
      });
    });
  }

  _createClass(DeployRelutionCommand, [{
    key: 'getServerNames',
    value: function getServerNames() {
      var names = [];
      this.server.forEach(function (server) {
        names.push(server.name + ' ' + (server.baseurl || server.baseUrl));
      });
      return names;
    }
  }, {
    key: 'getJSESSIONID',
    value: function getJSESSIONID(cookie) {
      //var re = /\JSESSIONID=(.*);Path=\/;Secure/g;
      //var str = cookie;
      //var m = re.exec(str);
      //return m[1];
      return cookie;
    }

    /**
     * @param inquirer
     * @param tower
     */
  }, {
    key: 'deploy',
    value: function deploy(inquirer, tower) {
      this.tower = tower;
      var self = this;
      return inquirer.prompt([{
        type: "list",
        name: 'serverchoose',
        message: self.i18n.t('Please choose a Server as deploy target'),
        choices: self.getServerNames()
      }], this.authenticateOnRelution.bind(this));
    }
  }, {
    key: 'prepareUrl',
    value: function prepareUrl(url) {
      var pUrl = url.split('');
      var newUrl = '';
      if (pUrl[pUrl.length - 1] === '/') {
        pUrl.forEach(function (letter, key) {
          if (key < pUrl.length - 1) {
            newUrl += letter;
          }
        });
        return newUrl;
      }
      return url;
    }
  }, {
    key: 'getServerByName',
    value: function getServerByName(name) {
      return _lodash2['default'].filter(this.server, { name: name })[0];
    }
  }, {
    key: 'authenticateOnRelution',
    value: function authenticateOnRelution(answers) {
      var self = this;
      var name = answers.serverchoose.split(' ')[0];
      var deployServer = this.getServerByName(name);
      this.deployUrl = this.prepareUrl(deployServer.baseurl || deployServer.baseUrl);
      this.userForm.password = deployServer.password;
      this.userForm.userName = deployServer.userName;
      //https://mdmdev2.mwaysolutions.com/gofer/security/rest/auth/login?_=1442910094072
      //JSESSIONID
      (0, _nodeFetch2['default'])('' + this.deployUrl + AUTH, {
        method: 'post',
        body: JSON.stringify(this.userForm),
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.status !== 200) {
          return console.log(res.statusText);
        }
        self.sessionId = self.getJSESSIONID(res.headers.get('set-cookie'));
        return res.json();
      }).then(function (body) {
        self.sessionResponse = body;
        self.archiver.createRlnToWWW(process.env.PWD, self.projectRln, function (err, res) {
          if (err) {
            console.log('app.rln cant be copied to the www folder');
            return self.exit(null, self.tower);
          }
          var temp = self.archiver.generateZip(process.env.PWD);
          var output = temp[0];
          var archive = temp[1];

          archive.on('error', function (err) {
            //throw errconsole
            console.log(err);
            return false;
          });

          archive.pipe(output);
          archive.directory(process.env.PWD + '/www', false, { date: new Date() }).finalize();
          output.on('close', function () {
            console.log(output.path + ' is generated');
            return self.uploadZip(output.path, self);
          });
        });
        //console.log(body, self.sessionId);
      });
    }
  }, {
    key: 'uploadZip',
    value: function uploadZip(path, self) {
      console.log('Start Upload');
      _request2['default'].post({
        url: '' + self.deployUrl + FILES,
        formData: { 'file': _fs2['default'].createReadStream(path) },
        headers: {
          'Cookie': self.sessionId
        }
      }, function (err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        var res = JSON.parse(body);
        console.log('Upload successful!  Server responded with:', res.message);
        if (!res.exception) {
          //console.log(res);
          self.getAppMetadata(res.results[0].uuid, self);
        } else {
          return console.error(res.exception);
        }
      });
    }
  }, {
    key: 'getAppMetadata',
    value: function getAppMetadata(uuid, self) {
      //2
      //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/fromFile/FED1C01F-FD33-4A13-82BF-7B88FB6C445C?_=1442910228033
      _request2['default'].post({
        url: '' + self.deployUrl + METADATA + uuid,
        headers: {
          'Cookie': self.sessionId,
          'Content-type': 'application/json'
        }
      }, function (err, httpResponse, body) {
        if (err) {
          return console.error('get metadata failed:', err);
        }
        var res = JSON.parse(body);
        //console.log(res.results[0]);
        if (res.results[0].uuid) {
          var unsigned = _lodash2['default'].filter(res.results[0].versions, { appUuid: null });
          console.log('get Metadata successfull: ', res.message);
          self.createAppOnServer(res.results[0].uuid, unsigned[0], self);
        } else {
          self.createAppOnServer(null, res.results[0], self);
        }
      });
    }
  }, {
    key: 'createAppOnServer',
    value: function createAppOnServer(uuid, data, self) {
      //
      // 3
      //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/4C0B639C-BA02-4D0D-95CC-CE014905DDF2/versions?_=1442910384479
      //console.log(`${self.deployUrl}${CREATEAPP}${uuid}/versions`);
      //`${self.deployUrl}${CREATEAPP}${uuid}/versions`
      if (uuid !== null) {
        (0, _nodeFetch2['default'])('' + self.deployUrl + CREATEAPP + uuid + '/versions', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Cookie': self.sessionId,
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(function (res) {
          if (res.status !== 200) {
            console.log(res.statusText);
          }
          return res.json();
        }).then(function (json) {
          if (json.message) {
            console.log(json.message);
          }
          return self.exit(null, self.tower);
        });
      }
    }
  }]);

  return DeployRelutionCommand;
})(_command2['default']);

exports['default'] = DeployRelutionCommand;
module.exports = exports['default'];