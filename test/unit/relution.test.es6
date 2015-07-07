let assert = require('chai').assert;
let RelutionCli = require('../../src/helper/relution');

describe('RelutionCli', () => {
  var c = null;
  beforeEach(function () {
    c = new RelutionCli('relution');
  });
  it('Should properly has a appPrefix', () => {
    assert.equal(c.appPrefix, 'relution');
  });
  it('Should cli has a userHome', () => {
    assert.notEqual(c.getUserHome(), null);
  });
  it('Should cli has a filestream of relutionrc', () => {
    c.streamRc().then(function (err, data) {
      console.log('err, data', err, JSON.parse(data));
    });
    //console.log('file.server[0]', JSON.stringify(file.server));
    //assert.notEqual(file, undefined);
  });
});
