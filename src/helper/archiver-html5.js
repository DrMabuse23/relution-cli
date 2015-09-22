/**
 * Created by pascalbrewing on 13/04/15
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
var archiver = require('archiver');
var archive = archiver('zip');
/**
 * archive the html5 only porject to a zip
 */
export default class Archiver{
  constructor(rlnFile, bump = true){
    this.rln = rlnFile;
    this.bump = bump;
  }

  bumpVersion(data){
    data.versionCode = data.versionCode + 1;
    return data;
  }

  createRlnToWWW(path, data, cb){
    //console.log(porcess)
    if (this.bump) {
      data = this.bumpVersion(data);
      fs.writeFile(`${path}/app.rln`, JSON.stringify(data, null, 2), {encoding: 'utf8', mode: 755}, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return fs.writeFile(`${path}/www/app.rln`, JSON.stringify(data, null, 2), {encoding: 'utf8', mode: 755}, cb);
  }

  generateZip(path){
    let date = new Date().getTime();
    let mypath = `${path}/upload/${this.rln.versionCode}-${this.rln.package}-${date}.zip`;
    let output = fs.createWriteStream(mypath);
    return [output, archive];
  }
}
