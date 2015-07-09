let assert = require('chai').assert;
let server = require('../../../src/commands/server-command');
describe('Server Command', () => {
  var c = new server();

  it('Should properly has a name', () => {
    assert.equal(c.name, 'server');
  });
  it('Should server has commands', () => {
    assert.deepEqual(c.commands, ['create', 'delete', 'list', 'default']);
  });
  it('Should server has cli', () => {
    assert.notEqual(c.cli, null);
  });

  it('Should have an serverlist', () => {
    c.getServerList().then(function () {
      assert.notEqual(c.server, null);
    });
  });
  it('Should have an defaultServer', () => {
    c.getServerList().then(function () {
      assert.notEqual(c.defaultServer, null);
    });
  });
});
