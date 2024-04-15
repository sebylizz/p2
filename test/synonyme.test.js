const synonyme = require('../src/synonyme');

describe("testing synonyme file", () => {
    test('', () => {
        expect(synonyme("")).toContain();
    });

    test('testing replace huge with big', () => {
        expect(synonyme(["This ball is huge"], ["This ball is big"])).toBe(["this ball is big"]);
    });

    test('Should not switch big with small', () => {
        expect(synonyme(["This is a big ball"], ["This is a small ball"])).toContain(["this is a small ball"]);
    });
});