export default class Tower{

  constructor(){
    this.commands = {};
  }

  registerCommand(name, commands){
    //console.log('TOWER', JSON.stringify(this));
    //console.log('commands', commands);
    //console.log('this.commands', this.commands);
    //console.log('name', name);
    this.commands[name] = commands;
  }
}
