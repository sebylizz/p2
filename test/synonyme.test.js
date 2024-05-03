const synonyme = require('../src/synonyme').wordreplacer;
const exportSyn = require('../src/synonyme').exportSyn;


describe("testing synonyme file", () => {
    test('Replace stunning with pretty', () => {
        expect(synonyme("Hi, you are stunning", "Hi, you are pretty")).toBe("hi you are pretty");
    });

    test('testing replace huge with big', () => {
        expect(synonyme("This ball is large", "This ball is big")).toBe("this ball is big");
    });

    test('Should not switch big with small', () => {
        expect(synonyme("This is a big ball", "This is a small ball")).not.toBe("this is a small ball");
    });

    test('testing exportSyn function', () => {
        expect(exportSyn(["hi, you are stunning", "this ball is large"], ["hi, you are pretty", "this ball is big"], [[1, 0, 76]])).toEqual(["this ball is large"]);
    });
});