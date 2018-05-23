var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () =>{
    var from = 'matt';
    var longitude = '1234';
    var latitude = '1234';
    var message = generateLocationMessage(from, latitude, longitude);
      expect(message.createdAt).toBeA('number');
      expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  });
});
