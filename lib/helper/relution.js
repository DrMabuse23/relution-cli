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

var fs = require('fs');
const NATIVE = 'native';
const HTML5CONTAINER = 'html5';
import Project from './project';
import Html5Project from './html5-project';

export default class RelutionCli {

  constructor(appPrefix = 'relution', debug = true) {
    this.appPrefix = appPrefix;
    this.rcConf = null;
    this.projectConf = null;
    this.rcFilePath = `${ this.getUserHome() }/.${ this.appPrefix }rc`;
    this.project = null;
    this.isProject = false;
    this.html5Project = null;
    this.projectType = '';
    //this.setProject();
    //this.setHtml5Project();
    this.rcFileExist();
  }

<<<<<<< Updated upstream
  getRcFilePath() {
    return this.rcFilePath;
  }
=======
  _createClass(RelutionCli, [{
    key: 'getRcFilePath',
    value: function getRcFilePath() {
      return this.rcFilePath;
    }
  }, {
    key: 'rcFileExist',
    value: function rcFileExist() {
      var self = this;
      fs.exists(this.rcFilePath, function (exists) {
        if (!exists) {
          return self.createRcFile();
        }
        //console.log(`${self.rcFilePath} available` )
      });
    }
  }, {
    key: 'getProjectType',
    value: function getProjectType() {
      //var promise = new Promise();
      return Promise.all([this.setProject(), this.setHtml5Project()]);
    }
  }, {
    key: 'setProject',
    value: function setProject() {
      var _this = this;
>>>>>>> Stashed changes

  rcFileExist() {
    var self = this;
    fs.exists(this.rcFilePath, function (exists) {
      if (!exists) {
        return self.createRcFile();
      }
      //console.log(`${self.rcFilePath} available` )
    });
  }

  getProjectType() {
    //var promise = new Promise();
    return Promise.all([this.setProject, this.setHtml5Project()]);
  }

  setProject() {
    this.project = new Project(this.appPrefix);
    return this.project.isProject().then(result => {
      if (typeof result === 'object') {
        this.isProject = true;
        this.projectConf = result;
        return this.projectType = 'native';
        //console.log(result);
      }
    }).catch(function () {
      console.log(`looks not a ${ NATIVE } project`);
    });
  }

  setHtml5Project() {
    this.html5Project = new Html5Project(this.appPrefix);
    var self = this;
    return this.html5Project.isProject().then(result => {
      if (typeof result === 'object') {
        self.isProject = true;
        self.projectConf = result;
        return self.projectType = 'html5';
        //console.log(result);
      }
    }).catch(function () {
      console.log(`looks not a ${ HTML5CONTAINER } project`);
    });
  }

  getUserHome() {
    return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
  }

  streamRc() {
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function (err) {
        return fs.readFile(self.rcFilePath, 'utf8', function (err, data) {
          if (err) {

            return reject(err);
          }
          self.rcConf = JSON.parse(data);
          return resolve(self.rcConf);
        });
      });
    }, this);
  }

  createRcFile() {
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(self.rcFilePath, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
          reject(err);
        }
        return fs.writeFile(self.rcFilePath, { encoding: 'utf8', mode: 755 }, function (err) {
          if (err) {
            reject(err);
          }
          console.log('rc file are written');
          return resolve(true);
        });
      });
    }, this);
  }

  updateRcFile(content) {
    var self = this;
    self.rcConf = content;
    return new Promise((resolve, reject) => {
      return fs.writeFile(self.rcFilePath, JSON.stringify(content), function (err) {
        if (err) reject(err);
        console.log('It\'s saved!');
        return resolve(true);
      });
    });
  }
}