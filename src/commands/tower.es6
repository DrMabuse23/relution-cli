export default class Tower {

  constructor() {
    this.commands = {};
    this.tree = {};
  }

  registerCommand(command) {
    command.init();
    this.commands[command.name] = command;
    this.tree[command.name] = command.commands;
  }

  triggerCommand() {

  }
}
