var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Anton';
        var text = 'hello';
        var obj = generateMessage(from, text);
        var obj2 = {
            from: 'Anton',
            text: 'hello',
            createdAt: new Date().getTime()
        }
        expect(obj).toMatchObject(obj2);
        expect(obj.from).toBe(obj2.from);
        expect(obj.text).toBe(obj2.text);
        expect(typeof obj.createdAt).toBe('number');
    });
});
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var obj = generateLocationMessage('Anton', 59, 24);
        var obj2 = {
            from: 'Anton',
            url: 'https://www.google.com/maps?q=59,24',
            createdAt: new Date().getTime()
        }
        expect(obj).toMatchObject(obj2);
        expect(obj.from).toBe(obj2.from);
        expect(obj.url).toBe(obj2.url);
        expect(typeof obj.createdAt).toBe('number');
        
    });
})