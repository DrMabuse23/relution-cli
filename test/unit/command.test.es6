let assert = require('chai').assert;
let command = require('../../src/commands/command');

describe('Command', () => {
  var c = null;
  beforeEach(function () {
    c = new command('blubber', ['foo']);
  });
  it('Should properly has a name', () => {
    assert.equal(c.name, 'blubber');
  });
  it('Should server has commands', () => {
    assert.deepEqual(c.commands, ['foo']);
  });
  it('Should server has cli', () => {
    assert.notEqual(c.cli, null);
  });
});
