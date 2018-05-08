var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () =>{
    var from = 'matt';
    var text = 'test';
    var answer = generateMessage(from, text);
        expect(answer).toInclude({
          from: from,
          text: text
        });
        expect(answer.createdAt).toBeA('number');
    // store response in variable
    // assert from matches
    // assert text match
    // assert createdAt is number
  });
});
