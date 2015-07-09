var fs = require('fs');

export default class Project {
  constructor(prefix) {
    //relution
    this.prefix = prefix;
    //relution.json
    this.projectConf = null;
    //console.log(process.env);
  }

  isProject(){
    let path = `${process.env.PWD}/${this.prefix}.json`;
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(path, fs.R_OK | fs.W_OK, function(err) {
        if(err){
          //console.error("can't write");
          return reject(false);
        }
        return fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            //console.error("can't read", err);
            return reject(false);
          }
          self.projectConf = JSON.parse(data);
          return resolve(self.projectConf);
        });
      });
    });
  }
}
