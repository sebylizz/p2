const sanitizeinput = require('../src/sanitizeinput');

describe("Testing sanitizeinput file", () => {
    test('Quotation marks and big letters', () => {
        expect(sanitizeinput('Steven said: "Do not bully me!"')).toStrictEqual(["steven", "said"]);
    });

    test('parentheses and big letters', () => {
      expect(sanitizeinput('Einstein proved in 1912 (realiable source)')).toStrictEqual(["einstein", "proved", "in", "1912"]);
    });

    test('should not return in quotation marks', () => {
      expect(sanitizeinput('Christopher yelled: "Everybody up!"')).toBe(["christopher", "yelled", "everybody", "up"]);
    });
});