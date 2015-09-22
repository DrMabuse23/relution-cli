import RelutionCli from './../helper/relution';
import Validation from './../helper/validation';
import translate from './../helper/translation';
export default class Command {

  constructor(name, commands) {
    this.name = name;
    this.commands = commands;
    this.cli = new RelutionCli();
    this.validation = new Validation();
    this.i18n = new translate();
    //console.log('name', this.name);
    //console.log('commands', this.commands);
    //console.log('cli', JSON.stringify(this.cli));
  }

  init() {
    return {name: this.name, commands: this.commands};
  }
}
