'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typescriptFormatter = require('typescript-formatter');

var tsfmt = _interopRequireWildcard(_typescriptFormatter);

var _fs = require('fs');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelTemplate = function () {
  function ModelTemplate() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, ModelTemplate);

    this.name = name;
    this.attributes = attributes;
  }

  _createClass(ModelTemplate, [{
    key: 'attributesTemplate',
    value: function attributesTemplate() {
      var _this = this;

      var template = '';
      Object.keys(this.attributes).forEach(function (attribute) {
        template += '\n      /**\n       * @property ' + attribute + '\n       * @propertyOf ' + _this.name + '\n       */\n      public ' + attribute + ': ' + _this.attributes[attribute].type + '\n      ';
        if (attribute.default) {
          template += '= ' + _this.attributes[attribute].default + ';';
        } else {
          template += ';';
        }
      });
      return template;
    }
  }, {
    key: 'template',
    value: function template() {
      return '\n      import {Relution} from \'relution\';\n      /**\n       * @class ' + this.name + '\n       * The ' + this.name + ' Model\n       */\n      export class ' + this.name + ' extends Relution.Livedata.Model {\n        ' + this.attributesTemplate() + '\n        constructor(){\n          super();\n        }\n      }\n    ';
    }
  }, {
    key: 'add',
    value: function add() {}
  }]);

  return ModelTemplate;
}();

tsfmt.processFiles(["./index.ts"], {
  dryRun: true,
  replace: false,
  verify: false,
  tslint: true,
  editorconfig: true,
  tsfmt: true
}).then(function (result) {
  console.log(result["./index.ts"].dest);
});

var test = new ModelTemplate('Account', {
  name: { type: 'String', manadatory: false, default: 'Max' },
  email: { type: 'String', manadatory: false, default: 'a@b.c' }
});
console.log(test.template());