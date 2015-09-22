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
import fetch from 'node-fetch';
import Command from './command';
/**
 * DeployRelutionCommand
 * generate a zip from the www folder create a zip and upload it to relution
 */
export default class DeployRelutionCommand extends Command{
  constructor() {
    super('deploy', [['deploy', true, true], ['bumpup', true, true], ['exit', true, true]]);
  }

  /**
   *
   * @param inquirer
   * @param tower
   */
  deploy(inquirer, tower){
    this.tower = tower;
  }

  authenticateOnRelution(server){
    //https://mdmdev2.mwaysolutions.com/gofer/security/rest/auth/login?_=1442910094072
    //JSESSIONID
    //fetch(server.url, {method: 'post'})
    //  .then(function(res) {
    //    return res.text();
    //  }).then(function(body) {
    //  console.log(body);
    //});
  }
  uploadZip(){
    //1
    //https://mdmdev2.mwaysolutions.com/relution/api/v1/files
  }
  getAppMetadata(){
    //2
    //uuid from upload zip = FED1C01F-FD33-4A13-82BF-7B88FB6C445C
    //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/fromFile/FED1C01F-FD33-4A13-82BF-7B88FB6C445C?_=1442910228033
  }
  createAppOnServer(){//
  // 3
  //https://mdmdev2.mwaysolutions.com/relution/api/v1/apps/4C0B639C-BA02-4D0D-95CC-CE014905DDF2/versions?_=1442910384479
  }
  generateZip(){

  }
  bumpRln(){

  }
}

