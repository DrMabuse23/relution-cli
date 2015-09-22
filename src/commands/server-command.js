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

import Command from './command';
import _ from 'lodash';
/**
 * ServerCommand
 * you can create, delete, list, and add a default Server
 */
export default class ServerCommand extends Command {
  constructor() {
    //available commands
    super('server', [['create', true, true], ['delete', true, true], ['list', true, true], ['default', true, true], ['exit', true, true]]);
    this.server = null;
    this.defaultServerIndex = null;
    this.tower = null;
    this.getServerList();

  }

  findDefaultIndex(element) {
    if ('name' in element && element.name !== '' && element.name === this) {
      return true;
    }
    return false;
  }

  setDefaultServerIndex(name) {
    return this.server.findIndex(this.findDefaultIndex, name);
  }

  getDefaultServer() {
    return this.server[this.defaultServerIndex];
  }


  //Stream mcaprc to json
  /**
   *
   * @return {Promise.<T>}
   */
  getServerList() {
    let self = this;
    return this.cli.streamRc().then(function () {
      self.server = self.cli.rcConf.server;
      self.defaultServerIndex = self.setDefaultServerIndex(self.cli.rcConf.defaultServer);
      //console.log('self.server', self.server);
      //console.log('self.cli:', self.cli.rcConf.defaultServer);
      //console.log('self.defaultServer:', self.defaultServer);
      return self.server;
    }).catch(function (e) {
      console.log(e);
    });
  }



  /**
   *
   * @param server
   * @description add a new Server
   */
  add(server) {
    var self = this;
    if (this.server) {
      this.server.push(server);
    }
    //console.error('this.server', self.cli.rcConf);
    self.cli.updateRcFile(self.cli.rcConf).then((res) => {
      //console.log('updatedfile', res, self);
      self.tower.showCommands('Start', this.i18n.t('Please choose Your Command'), self.tower.startCommands);
    });
  }

  default() {

  }

  removeServer(answers){
    var index = _.findIndex(this.server, {name: answers['server delete']});
    var self = this;
    this.server.splice(index, 1);
    //console.error('this.server', self.cli.rcConf);
    self.cli.updateRcFile(self.cli.rcConf).then((res) => {
      console.log('Server is removed from list');
      self.tower.showCommands('Start', this.i18n.t('Please choose Your Command'), self.tower.startCommands);
    });
  }
  delete(inquirer, tower){
    var self = this;
    var servers = [];
    var i = 0;
    this.cli.rcConf.server.forEach((server) => {
      servers[i] = server.name;
      i++;
    });
    return inquirer.prompt([
      {
        type: "list",
        name: `${self.name} delete`,
        message:  'Please choose the server you will delete',
        choices: servers
      }
    ], this.removeServer.bind(this));
  }

  create(inquirer, tower){
    var self = this;
    this.tower = tower;
    let configAdd = [
      {
        type    : 'input',
        name    : 'name',
        message : 'Server Name',
        validate: function (value) {
          var pass = value.match(self.validation.stringNumber);
          if ( pass ) {
            return true;
          } else {
            return 'Please enter a valid Server name';
          }
        }
      },
      {
        type    : 'input',
        name    : 'baseUrl',
        message : 'Enter the server url (http://....)',
        validate: function (value) {
          var pass = value.match(self.validation.urlPattern);

          if ( pass ) {
            return true;
          } else {
            return 'Please enter a valid url';
          }
        }
      },
      {
        type    : 'input',
        name    : 'userName',
        message : 'Enter your username',
        validate: self.validation.notEmptyValidate('Username')
      },
      {
        type    : 'password',
        name    : 'password',
        message : 'Enter your Password',
        validate: self.validation.notEmptyValidate('Password')
      }
    ];
    inquirer.prompt(configAdd, this.add.bind(this));
  }
}
