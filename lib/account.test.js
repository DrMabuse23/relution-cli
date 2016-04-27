'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      return '\n      import {Relution} from \'relution\';\n      /**\n       * @class ' + name + '\n       * The ' + name + ' Model\n       */\n      export class ' + name + ' extends Relution.Livedata.Model {\n        ' + attributesTemplate() + '\n        constructor(){\n          super();\n        }\n      }\n    ';
    }
  }]);

  return ModelTemplate;
}();

var test = new ModelTemplate('Account', { name: { type: 'String', manadatory: false, default: 'Max' } });
console.log(test.template());