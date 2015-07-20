var fs = require('fs');
import Project from './project';

export default class RelutionCli {

  constructor(appPrefix = 'relution', debug=true) {
    this.appPrefix = appPrefix;
    this.rcConf = null;
    this.projectConf = null;
    this.rcFilePath = `${this.getUserHome()}/.${this.appPrefix}rc`;
    this.project = null;
    this.isProject = false;

    this.setProject();
    this.rcFileExist();
  }

  getRcFilePath(){
    return this.rcFilePath;
  }

  rcFileExist(){
    var self = this;
    fs.exists(this.rcFilePath, function (exists) {
      if (!exists) {
        return self.createRcFile();
      }
      console.log(`${self.rcFilePath} available` )
    });
  }

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

  getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

  streamRc() {
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function(err) {
        return fs.readFile(self.rcFilePath, 'utf8', function (err, data) {
          if (err) {

            return reject(err);
          }
          self.rcConf = JSON.parse(data);
          return resolve(self.rcConf);
        });
      });
    }, (this));
  }

  createRcFile() {
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function(err) {
        if (err) {
          reject(err);
        }
        return fs.writeFile(self.rcFilePath, {encoding: 'utf8', mode: 755}, function (err) {
          if (err) {
            reject(err);
          }
          console.log('rc file are written');
          return resolve(true);
        });
      });
    }, (this));
  }
}
