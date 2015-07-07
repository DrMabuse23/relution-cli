import RelutionCli from './../helper/relution';

export default class Command {

  constructor(name, commands) {
    this.name = name;
    this.commands = commands;
    this.cli = new RelutionCli();
    //console.log('name', this.name);
    //console.log('commands', this.commands);
    //console.log('cli', JSON.stringify(this.cli));
  }

  init() {}
}
