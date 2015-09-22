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

import ServerCommand from './server-command';
import DeployCommand from './deploy-command';
var _ = require('lodash');
import Translation from './../helper/translation';
/**
 * @class Tower
 * @description Handles the Commands for the User Output
 */
export default class Tower {

  constructor(commands = [new ServerCommand(), new DeployCommand()]) {
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
