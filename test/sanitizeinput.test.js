const sanitizeinput = require('../src/sanitizeinput');

describe("Testing sanitizeinput file", () => {
    test('html tags', () => {
        expect(sanitizeinput('Steven said: <do not bully me!>')).toBe("Steven said:");
    });

    test('checking emojis etc.', () => {
      expect(sanitizeinput('Einstein proved something in 1912 ❤️')).toBe("Einstein proved something in 1912 ");
    });

    test('should not remove quotation marks', () => {
      expect(sanitizeinput('Christopher yelled: "Everybody up!"')).not.toBe("Christopher yelled: ");
    });
});