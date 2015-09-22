import ServerCommand from './server-command';
var _ = require('lodash');
import Translation from './../helper/translation';
/**
 * @class Tower
 * @description Handles the Commands for the User Output
 */
export default class Tower {

  constructor(commands = [new ServerCommand()]) {
    this.i18n = new Translation();
    this.commands = commands;
    this.tree = {};
    this.startCommands = null;
    this.inquirer = require('inquirer');
    var self = this;
    commands.forEach((command) => {
      self.registerCommand(command);
    });
  }

  registerCommand(command) {
    command.init();
    this.commands[command.name] = command;
    this.tree[command.name] = command.commands;
  }

  triggerCommand(name, method) {
    var subCommands = this.commands[name][method]();
    return this.showCommands(subCommands[0], subCommands[1], subCommands[2], this.commandCallback);
  }

  triggerSubCommand(name, method) {
    console.log(name, method);
    return this.commands[name][method](this.inquirer, this);
  }

  getCommandsByType(type = 'native') {
    var self = this;
    var availableCommands = {};
    var keys = Object.keys(this.tree);
    for(var i = 0, l = keys.length; i < l; i++) {
      availableCommands[keys[i]] = _.filter(self.tree[keys[i]], function(n) {
        if (type === 'native' && n[1] || type === 'html5' && n[2]) {
          return n[0];
        }
        return false;
      });
    }
    return availableCommands;
  }

  getStartCommands(commands){
    this.startCommands = Object.keys(commands)
    return this.startCommands;
  }

  showCommands(name = "Start", message = "Please Choose Your Command",  commands){
    return this.inquirer.prompt([
      {
        type: "list",
        name: name,
        message:  message,
        choices: commands
      }
    ], this.commandCallback.bind(this));
  }

  commandCallback(answers){
    var self = this;
    var keys = Object.keys(answers);
    if (answers.Start) {
      console.log('callback Start', answers);
      self.triggerCommand(answers.Start, 'start');
    } else {
      console.log('callback sub', answers, keys[0], answers[keys[0]]);

      self.triggerSubCommand(keys[0], answers[keys[0]]);
    }
  }
}
