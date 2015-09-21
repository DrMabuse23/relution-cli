'use strict';
export default class InquirerHelper{
  constructor(){
    this.inquirer = require('inquirer');
  }

  chooser(name, message, choices, cb){
    return this.inquirer.prompt([
      {
        type: "list",
        name: name,
        message: message,
        choices: choices
      }
    ], cb);
  }
}
