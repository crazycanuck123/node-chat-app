const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var nonstring = 1;
    expect(isRealString(nonstring)).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var stringWithSpaces = "   ";
    expect(isRealString(stringWithSpaces)).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var goodString = "  asdjfjl  "
    expect(isRealString(goodString)).toBe(true);
  });
});
