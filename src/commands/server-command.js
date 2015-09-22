import Command from './command';
import _ from 'lodash';
export default class ServerCommand extends Command {
  constructor() {
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

  flatCommands(){
    let flat = [];
    this.commands.forEach((command) => {
      flat.push(command[0]);
    });
    return flat;
  }
  //Stream mcaprc to json
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

  start() {
    return [this.name, this.i18n.t("Please Choose Your Command"), this.flatCommands()];
  }

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
  exit(inquirer, tower){
    this.tower = tower;
    return this.tower.showCommands('Start', this.i18n.t('Please choose Your Command'), this.tower.startCommands);
  }

}
