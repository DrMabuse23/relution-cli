import ServerCommand from './commands/server-command';
import Tower from './commands/tower';

export default class Cli{
  constructor(opts, commands = [new ServerCommand()]){
    let self = this;
    this.tower = new Tower();
    this.opts = opts.argv;
    commands.forEach(function (command) {
      self.tower.registerCommand(command);
    });
    this.init();
  }

  init(){
    if (this.tower.commands[this.opts.remain[0]]) {
      //call example server.add()
      this.tower.commands[this.opts.remain[0]][this.opts.remain[1]]({name: 'hannes'});
      console.log(this.tower.commands[this.opts.remain[0]].server);
    } else {
      console.error(`command ${this.opts.remain[0]} not exist`);
    }
  }
}
