let assert = require('chai').assert;
let Cli = require('../../src/cli');

describe('Cli', () => {
  var c = null;
  beforeEach(function () {
    c = new Cli();
  });
  it('Should properly has a tower', () => {
    console.log(c.tower.commands);
  });
});
