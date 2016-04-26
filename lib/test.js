#!/usr/bin/env node

'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _cli = require('./cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var nopt = require('nopt');
var pkg = require('./../package.json');
var observe = null;
var cli = new _cli2.default(nopt());

var dispatcher = _Rx2.default.Observable.create(function (observer) {
  observe = observer;
  cli.addListener(dispatcher);
});

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('$relution: ');

console.log('Welcome to Relution-cli');
console.log(pkg.version || '');
console.log('Available Commands :');

Object.keys(cli.tower.tree).forEach(function (command) {
  console.log(command);
});

var exit = function exit(params) {
  console.log('Have a great day!');
  process.exit(0);
};

cli.helper.streamRc().then(function () {
  console.log(cli.helper);
  setTimeout(function () {
    rl.prompt();
  }, 1000);
});

rl.on('line', function (line) {
  switch (line.trim()) {
    case 'q':
    case 'quit':
      exit();
      break;
    case '':
      rl.prompt();
      break;
    default:
      observe.next(line.trim().split(' '));
      console.log(JSON.stringify(line.trim().split(' '), null, 2));
      break;
  }
  rl.prompt();
}).on('close', function () {
  exit();
});