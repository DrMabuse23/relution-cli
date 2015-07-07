let assert = require('chai').assert;
let Tower = require('../../src/commands/tower');
let name = 'foo',commands = ['bar', 'foo'];
describe('Tower', () => {
  var c = null;
  beforeEach(function () {
    c = new Tower();
    c.registerCommand(name, commands);
  });
  it('Should properly has a command', () => {
    assert.equal(c.commands[name], commands);
  });
});
