let assert = require('chai').assert;
let RelutionCli = require('../../../src/helper/relution');

describe('RelutionCli', () => {
  var c = null;
  beforeEach(function () {
    c = new RelutionCli('relution');
  });
  it('Should properly has a appPrefix', () => {
    assert.equal(c.appPrefix, 'relution');
  });
  it('Should relution has a userHome', () => {
    assert.notEqual(c.getUserHome(), null);
  });
  it('Should relution has a filestream of relutionrc', () => {
    c.streamRc().then(function (err, data) {
      assert.isObject(data.server);
    });
  });
  it('Should relution is not a project', () => {
    assert.equal(c.isProject, false);
  });

});
