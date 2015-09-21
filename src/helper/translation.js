/**
 * Created by pascalbrewing on 21/09/15
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
export default class Translate{
  constructor(){
    this.i18n = require("i18n");
    console.log(this.i18n);
    this.t = null;
    this.i18n.configure({
      // setup some locales - other locales default to en silently
      locales:['en_EN', 'de_DE'],

      // fall back from Dutch to German
      //fallbacks:{'nl': 'de_DE'},

      // you may alter a site wide default locale
      defaultLocale: 'de_DE',

      // where to store json files - defaults to './locales' relative to modules directory
      directory: `${__dirname }/../../locales`,

      // setting of log level DEBUG - default to require('debug')('i18n:debug')
      logDebugFn: function (msg) {
        console.log('debug', msg);
      },

      // setting of log level WARN - default to require('debug')('i18n:warn')
      logWarnFn: function (msg) {
        console.log('warn', msg);
      },

      // setting of log level ERROR - default to require('debug')('i18n:error')
      logErrorFn: function (msg) {
        console.log('error', msg);
      }
    });

    this.i18n.init((err, t) => {
      console.log('init', err, t);
      if (err) {
        console.log(err);
      }
      console.log(t);
    });
  }
  static t(string){
    return this.i18n.t(string);
  }
}
