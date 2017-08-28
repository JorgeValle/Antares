const assert = require('assert');
describe('The retrieve controller', function() {
  describe('retrieve all method', function() {
    it('returns the wanted content', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
  describe('retrieve one method', function() {
    it('returns a specific content', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
