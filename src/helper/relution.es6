var fs = require('fs');
import Project from './project';

export default class RelutionCli {
  setProject(){
    this.project = new Project(this.appPrefix);
    this.project.isProject().then((result) => {
      if (typeof result === 'object') {
        this.isProject = true;
        this.projectConf = result;
        //console.log(result);
      }
    }).catch(function () {

    });
  }
  constructor(appPrefix = 'relution', debug=true) {
    this.appPrefix = appPrefix;
    this.rcConf = null;
    this.projectConf = null;
    this.project = null;
    this.isProject = false;
    this.setProject();
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
