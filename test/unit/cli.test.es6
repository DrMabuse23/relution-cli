let assert = require('chai').assert;
let Cli = require('../../src/cli');
let server = require('../../src/commands/server-command');
describe('Cli', () => {
  var c = null, s = null;
  beforeEach(function () {
    c = new Cli({argv:{
      remain: ['server', 'add'],
      cooked: ['server', 'add'],
      original: ['server', 'add']
    }})
  });
  it('Should properly has a tower with commands', () => {
    assert.notEqual(c.tower.commands, null);
  });
  it('Should properly has a tower with a tree', () => {
    assert.notEqual(c.tower.tree, null);
    assert.isDefined(c.tower.tree['server']);
  });

  it('Should properly has a tower has opts', () => {
    assert.deepEqual(c.opts, {
      remain: ['server', 'add'],
      cooked: ['server', 'add'],
      original: ['server', 'add']
    });
  });
});
