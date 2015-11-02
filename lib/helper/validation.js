/**
 * Created by pascalbrewing on 21/09/15
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

var Validation = (function () {
  function Validation() {
    _classCallCheck(this, Validation);

    /**
     * @example 80 or 9200 min 2 ,max 4
     * @type {RegExp}
     */
    this.portRegex = /^(\d){2}$|(\d){4}$/;
    /**
     * url Pattern allowed
     * @example https://localkllk:9100/blubber&id=234 http://localkllk.de/blubber&id=234
     * @type {RegExp}
     */
    this.urlPattern = /(http|https):\/\/[\w-]+(\.[\w-]+)|(\:[0-9])([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    /**
     * allow a-Z 0-9 for the server name
     * @type {RegExp}
     */
    this.stringNumberPattern = /^[a-zA-Z\s]|[0-9\s]+$/;
  }

  _createClass(Validation, [{
    key: 'notEmptyValidate',
    value: function notEmptyValidate(label) {
      return function (value) {
        if (value) {
          return true;
        }
        return console.log(label + ' can not be empty');
      };
    }
  }]);

  return Validation;
})();

exports['default'] = Validation;
module.exports = exports['default'];