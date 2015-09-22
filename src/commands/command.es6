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
'use strict';

import RelutionCli from './../helper/relution';
import Validation from './../helper/validation';
import Translate from './../helper/translation';
export default class Command {

  constructor(name, commands) {
    this.name = name;
    this.commands = commands;
    this.cli = new RelutionCli();
    this.validation = new Validation();
    this.i18n = new Translate();
    this.tower = null;
  }

  init() {
    return {name: this.name, commands: this.commands};
  }
  /**
   * @description return only the command names
   * @return {Array}
   */
  flatCommands(){
    let flat = [];
    var self = this;
    this.commands.forEach((command) => {
      flat.push(self.i18n.t(command[0]));
    });
    return flat;
  }
  /**
   *
   * @return {*[]}
   */
  start() {
    return [this.name, this.i18n.t("Please Choose Your Command"), this.flatCommands()];
  }

  /**
   *
   * @param inquirer
   * @param tower
   * @return {*}
     */
  exit(tower){
    this.tower = tower;
    return this.tower.showCommands('Start', this.i18n.t('Please choose Your Command'), this.tower.startCommands);
  }
}
