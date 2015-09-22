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
import fs from 'fs';
import fetch from 'node-fetch';
import request from 'request';
import _ from 'lodash';
import FormData from 'form-data';

import Command from './command';
import Archiver from './../helper/archiver-html5';
const AUTH = '/gofer/security/rest/auth/login';
const FILES = '/relution/api/v1/files';
const METADATA = '/relution/api/v1/apps/fromFile/';
const CREATEAPP = '/relution/api/v1/apps/';
/**
 * DeployRelutionCommand
 * generate a zip from the www folder create a zip and upload it to relution
 */
export default class DeployRelutionCommand extends Command {

  constructor() {
    super('deploy', [['deploy', false, true], ['bumpup', false, true], ['exit', false, true]]);
    let self = this;
    this.userForm = {
      email: null,
      orgaName: null,
      password: null,
      userName: null
    };
    this.projectRln = null;
    this.sessionId = null;
    this.deployUrl = '';

    this.sessionResponse = null;

    this.cli.streamRc().then(() => {
      self.server = self.cli.rcConf.server;
      self.cli.setHtml5Project().then((res) => {
        self.projectRln = this.cli.html5Project.projectConf;
        self.archiver = new Archiver(this.cli.html5Project.projectConf, true);
      });
    });
  }

  getServerNames() {
    let names = [];
    this.server.forEach((server) => {
      names.push(`${server.name} ${server.baseurl || server.baseUrl}`);
    });
    return names;
  }

  getJSESSIONID(cookie) {
    //var re = /\JSESSIONID=(.*);Path=\/;Secure/g;
    //var str = cookie;
    //var m = re.exec(str);
    //return m[1];
    return cookie;
  }

  /**
   * @param inquirer
   * @param tower
   */
  deploy(inquirer, tower) {
    this.tower = tower;
    var self = this;
    return inquirer.prompt([
      {
        type: "list",
        name: 'serverchoose',
        message: self.i18n.t('Please choose a Server as deploy target'),
        choices: self.getServerNames()
      }
    ], this.authenticateOnRelution.bind(this));
  }

  prepareUrl(url) {
    let pUrl = url.split('');
    let newUrl = '';
    if (pUrl[pUrl.length - 1] === '/') {
      pUrl.forEach((letter, key) => {
        if (key < pUrl.length - 1) {
          newUrl += letter;
        }
      });
      return newUrl;
    }
    return url;
  }

  getServerByName(name) {
    return _.filter(this.server, {name: name})[0];
  }

  authenticateOnRelution(answers) {
    var self = this;
    let name = answers.serverchoose.split(' ')[0];
    let deployServer = this.getServerByName(name);
    this.deployUrl = this.prepareUrl(deployServer.baseurl || deployServer.baseUrl);
    this.userForm.password = deployServer.password;
    this.userForm.userName = deployServer.userName;
    //https://mdmdev2.mwaysolutions.com/gofer/security/rest/auth/login?_=1442910094072
    //JSESSIONID
    fetch(`${this.deployUrl}${AUTH}`, {
      method: 'post',
      body: JSON.stringify(this.userForm),
      headers: {'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json'}
    })
      .then(function (res) {
        if (res.status !== 200) {
          return console.log(res.statusText);
        }
        self.sessionId = self.getJSESSIONID(res.headers.get('set-cookie'));
        return res.json()
      }).then(function (body) {
      self.sessionResponse = body;
      self.archiver.createRlnToWWW(process.env.PWD, self.projectRln, (err, res) => {
        if (err) {
          console.log('app.rln cant be copied to the www folder');
          return self.exit();
        }
        let temp = self.archiver.generateZip(process.env.PWD);
        var output = temp[0];
        let archive = temp[1];

        archive.on('error', function (err) {
          //throw errconsole
          console.log(err);
          return false;
        });

        archive.pipe(output);
        archive.directory(`${process.env.PWD}/www`, false, {date: new Date()}).finalize();
        output.on('close', function () {
          console.log(`${output.path} is generated`);
          return self.uploadZip(output.path, self);
        });
      });
      //console.log(body, self.sessionId);
    });
  }

  uploadZip(path, self) {
    console.log('Start Upload');
    request.post({
      url: `${self.deployUrl}${FILES}`,
      formData: {'file': fs.createReadStream(path)},
      headers: {
        'Cookie': self.sessionId
      }
    }, (err, httpResponse, body) => {
      if (err) {
        return console.error('upload failed:', err);
      }
      var res = JSON.parse(body);
      console.log('Upload successful!  Server responded with:', res.message);
      if (!res.exception) {
        //console.log(res);
        self.getAppMetadata(res.results[0].uuid, self);
      } else {
        return console.error(res.exception);
      }
    });
  }

  getAppMetadata(uuid, self) {
    //2
    //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/fromFile/FED1C01F-FD33-4A13-82BF-7B88FB6C445C?_=1442910228033
    request.post({
        url: `${self.deployUrl}${METADATA}${uuid}`,
        headers: {
          'Cookie': self.sessionId,
          'Content-type': 'application/json'
        }
      },
      (err, httpResponse, body) => {
        if (err) {
          return console.error('get metadata failed:', err);
        }
        var res = JSON.parse(body);
        //console.log(res.results[0]);
        if (res.results[0].uuid) {
          var unsigned = _.filter(res.results[0].versions, {appUuid: null});
          console.log('get Metadata successfull: ', JSON.stringify(unsigned));
          self.createAppOnServer(res.results[0].uuid, unsigned[0], self);
        } else {
          self.createAppOnServer(null, res.results[0], self);
        }
      });
  }

  createAppOnServer(uuid, data, self) {//
    // 3
    //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/4C0B639C-BA02-4D0D-95CC-CE014905DDF2/versions?_=1442910384479
    console.log(`${self.deployUrl}${CREATEAPP}${uuid}/versions`);
    //`${self.deployUrl}${CREATEAPP}${uuid}/versions`
    fetch(`${self.deployUrl}${CREATEAPP}${uuid}/versions`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Cookie': self.sessionId,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function(res) {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers.raw());
        console.log(res.headers.get('content-type'));
        return res.json();
      }).then(function(json) {
        console.log(json);
      });
    //request.post(`${self.deployUrl}${CREATEAPP}${uuid}/versions`, {
    //    form: data,
    //    headers: {
    //      'Cookie': self.sessionId,
    //      'Content-type': 'application/json',
    //      'Accept': 'application/json'
    //    }
    //  },
    //  (err, httpResponse, body) => {
    //    if (err) {
    //      return console.error('get metadata failed:', err);
    //    }
    //    console.log(body);
    //    //var res = JSON.parse(body);
    //    //console.log('Application is now available: ', res.message);
    //    //return self.exit(self.tower);
    //  });
  }
}
