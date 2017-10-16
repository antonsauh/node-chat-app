var expect = require('expect');

var {generateMessage} = require('./message');

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