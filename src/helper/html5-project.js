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

export default class Html5Project {
  constructor(prefix) {
    //relution
    this.prefix = prefix;
    //relution.json
    this.projectConf = null;
    //console.log(process.env);
  }

  isProject(){
    //${this.prefix}
    let path = `${process.env.PWD}/app.rln`;
    let self = this;
    return new Promise((resolve, reject) => {
      return fs.access(path, fs.R_OK | fs.W_OK, function(err) {
        if(err){
          console.error("can't write");
          return reject(false);
        }
        return fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            //console.error("can't read", err);
            return reject(false);
          }
          self.projectConf = JSON.parse(data);
          //console.log(self.projectConf);
          return resolve(self.projectConf);
        });
      });
    });
  }
}
