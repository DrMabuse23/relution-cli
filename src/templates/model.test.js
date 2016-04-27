let fs = require('fs');
let beautify = require('js-beautify').js_beautify;

const bOptions = {
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

class ModelTemplate {

  constructor(name = '', attributes = {}) {
    this.name = name;
    this.attributes = attributes;
  }

  attributesTemplate() {
    let template = '';
    Object.keys(this.attributes).forEach((attribute) => {
      template += `
      /**
       * @property ${attribute}
       * @propertyOf ${this.name}
       */
      public ${attribute}: ${this.attributes[attribute].type}
      `;
      if (this.attributes[attribute].default) {
        template += `= '${this.attributes[attribute].default}';`
      } else {
        template += `;`
      }
    });
    return template;
  }

  template() {
    return (`
      import {Relution} from 'relution';
      /**
       * @class ${this.name}
       * The ${this.name} Model
       */
      export class ${this.name} extends Relution.Livedata.Model {
        ${this.attributesTemplate()}

        constructor(options){
          super(options);
        }
      }
    `);
  }


  create() {
    let template = this.template();
    template = beautify(template, bOptions);
    console.log(template);

    return fs.access(`/Users/pascalbrewing/htdocs/relution-cli/models/`, fs.R_OK | fs.W_OK, (err) => {
      if (err) {
        return console.log(err);
      }
      let path = path;
      return fs.writeFile(`/Users/pascalbrewing/htdocs/relution-cli/models/${this.name}.ts`, template, { encoding: 'utf8', mode: 775 }, (err) => {
        if (err) {
          return console.log(err);
        }
        return console.log(`${this.name} file are written`);
      });
    });
  }
}

let test = new ModelTemplate('Account',
  {
    name: { type: 'String', manadatory: false, default: 'Max' },
    email: { type: 'String', manadatory: false, default: 'a@b.c' }
  }
);

let test2 = new ModelTemplate('User',
  {
    firstName: { type: 'String', manadatory: false, default: 'Max' },
    lastName: { type: 'String', manadatory: false, default: 'Müller' }
  }
);

test.create();
test2.create();
