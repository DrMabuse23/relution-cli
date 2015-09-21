'use strict';
import Tree from './Tree';
import i18n from './../helper/translation';

export default class StartTree extends Tree{
  constructor() {
    super();
    this.commands = null;
  }
  getStartCommands(){

  }
  start(commands){
    this.commands = commands;
    this.list(i18n._('Start'), i18n._("Please Choose Your Command 1-%s", commands.length), this.getStartCommands(commands), null, this.choosed);
  }

  choosed(answers){
    console.log(answers);
  }
}
