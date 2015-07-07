import ServerCommand from './commands/server-command';
import Tower from './commands/tower';
require('babel/polyfill');
export default class Cli{
  constructor(commands = [new ServerCommand()]){
    let self = this;
    this.tower = new Tower();
    var promises = [];
    commands.forEach(function (command) {
      command.init();
      self.tower.registerCommand(command.name, command.commands)
      console.log('self.tower', self.tower);
    });
  }
}
