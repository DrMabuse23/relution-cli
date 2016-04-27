#!/usr/bin/env node
'use strict';

import Rx from 'rxjs/Rx';
import Cli from './cli';


let path = require('path');
let nopt = require('nopt');
let pkg = require('./../package.json');
let observe = null;
let cli = new Cli(nopt());
let readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('$relution: ');

let dispatcher = Rx.Observable.create((observer) => {


  console.log('Welcome to Relution-cli');
  console.log(pkg.version || '');
  console.log('Available Commands :');

  Object.keys(cli.tower.tree).forEach((command) => {
    console.log(command);
  });

  let exit = (params) => {
    console.log('Have a great day!');
    process.exit(0);
  };

  rl.on('line', function(line) {
    switch(line.trim()) {
      case 'q':
      case 'quit':
        exit();
        break;
      case '':
        rl.prompt();
        break;
      default:
        observer.next(line.trim().split(' '));
        console.log(JSON.stringify(line.trim().split(' '), null, 2));
        break;
    }
    rl.prompt();
  }).on('close', function() {
    exit();
    obeserver.complete();
  });

});

cli.helper.streamRc().then(() => {
  console.log(cli.helper);
  setTimeout(() => {
    rl.prompt();
  }, 1000);
});

cli.addListener(dispatcher);






