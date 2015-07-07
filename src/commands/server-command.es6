import Command from './command';
export default class ServerCommand extends Command {
  constructor() {
    super('server', ['create', 'delete', 'list', 'default']);
    this.server = null;
    this.defaultServerIndex = null;
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

  add(server) {
    this.server.push(server);
  }

  default() {

  }

  remove() {

  }
}
