var fs = require('fs');
export default class RelutionCli {

  constructor(appPrefix = 'relution', debug=true) {
    this.appPrefix = appPrefix;
    this.rcConf = null;
  }

  getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

  streamRc() {
    let path = `${this.getUserHome()}/.${this.appPrefix}rc`;
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(path, fs.R_OK | fs.W_OK, function(err) {
        return fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            reject(err);
          }
          self.rcConf = JSON.parse(data);
          return resolve(self.rcConf);
        });
      });
    }, (this));
  }
}
