'use strict';
import inquirer from 'inquirer';

export default class Tree{
  constructor(){

  }

  list(name, message, choices, bottom, cb){
    return inquirer.prompt([
      {
        type: "list",
        name: name,
        message: message,
        choices: choices
      }
    ], cb);
  }
}
