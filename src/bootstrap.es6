#!/usr/bin/env node
'use strict';
var path = require('path');
var nopt = require('nopt');
import Cli from './cli';
let cli = new Cli(nopt());

console.log(cli.tower.tree);
console.log(cli.opts);
var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('relution> ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

