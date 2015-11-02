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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var fs = require('fs');

var Html5Project = (function () {
  function Html5Project(prefix) {
    _classCallCheck(this, Html5Project);

    //relution
    this.prefix = prefix;
    //relution.json
    this.projectConf = null;
    //console.log(process.env);
  }

  _createClass(Html5Project, [{
    key: 'isProject',
    value: function isProject() {
      //${this.prefix}
      var path = process.env.PWD + '/app.rln';
      var self = this;
      return new Promise(function (resolve, reject) {
        return fs.access(path, fs.R_OK | fs.W_OK, function (err) {
          if (err) {
            console.error("can't write");
            return reject(false);
          }
          return fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
              //console.error("can't read", err);
              return reject(false);
            }
            self.projectConf = JSON.parse(data);
            //console.log(self.projectConf);
            return resolve(self.projectConf);
          });
        });
      });
    }
  }]);

  return Html5Project;
})();

exports['default'] = Html5Project;
module.exports = exports['default'];