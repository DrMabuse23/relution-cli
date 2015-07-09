let assert = require('chai').assert;
let Tower = require('../../../src/commands/tower');
let ServerCommand = require('../../../src/commands/server-command');

let name = 'foo',commands = ['bar', 'foo'];
describe('Tower', () => {
  var c = null, s = null;
  beforeEach(function () {
    c = new Tower();
    s  = new ServerCommand();
    c.registerCommand(s);
  });
  it('Should properly has a command', () => {
    assert.equal(c.tree[s.name], s.commands);
  });
});
