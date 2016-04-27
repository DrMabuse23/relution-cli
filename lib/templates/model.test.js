'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var beautify = require('js-beautify').js_beautify;

var bOptions = {
  "indent_size": 2,
  "indent_char": " ",
  "eol": "\n",
  "indent_level": 0,
  "indent_with_tabs": false,
  "preserve_newlines": true,
  "max_preserve_newlines": 10,
  "jslint_happy": false,
  "space_after_anon_function": false,
  "brace_style": "collapse",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_before_conditional": true,
  "break_chained_methods": false,
  "eval_code": false,
  "unescape_strings": false,
  "wrap_line_length": 0,
  "wrap_attributes": "auto",
  "wrap_attributes_indent_size": 2,
  "end_with_newline": true
};

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
        if (_this.attributes[attribute].default) {
          template += '= \'' + _this.attributes[attribute].default + '\';';
        } else {
          template += ';';
        }
      });
      return template;
    }
  }, {
    key: 'template',
    value: function template() {
      return '\n      import {Relution} from \'relution\';\n      /**\n       * @class ' + this.name + '\n       * The ' + this.name + ' Model\n       */\n      export class ' + this.name + ' extends Relution.Livedata.Model {\n        ' + this.attributesTemplate() + '\n\n        constructor(options){\n          super(options);\n        }\n      }\n    ';
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var template = this.template();
      template = beautify(template, bOptions);
      console.log(template);

      return fs.access('/Users/pascalbrewing/htdocs/relution-cli/models/', fs.R_OK | fs.W_OK, function (err) {
        if (err) {
          return console.log(err);
        }
        var path = path;
        return fs.writeFile('/Users/pascalbrewing/htdocs/relution-cli/models/' + _this2.name + '.ts', template, { encoding: 'utf8', mode: 775 }, function (err) {
          if (err) {
            return console.log(err);
          }
          return console.log(_this2.name + ' file are written');
        });
      });
    }
  }]);

  return ModelTemplate;
}();

var test = new ModelTemplate('Account', {
  name: { type: 'String', manadatory: false, default: 'Max' },
  email: { type: 'String', manadatory: false, default: 'a@b.c' }
});

var test2 = new ModelTemplate('User', {
  firstName: { type: 'String', manadatory: false, default: 'Max' },
  lastName: { type: 'String', manadatory: false, default: 'Müller' }
});

test.create();
test2.create();