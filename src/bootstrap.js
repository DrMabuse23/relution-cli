#!/usr/bin/env node
'use strict';
var nopt = require('nopt');
import Cli from './cli';
let cli = new Cli(nopt());
