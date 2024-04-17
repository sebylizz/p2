const idf = require('../src/idf');

describe("Testing idf file", () => {
    test("Testing math", () => {
        expect(idf([{content: "I drive a car"}, {content: "John has a car and an apple"}, {content: "An apple and a cow"}])).toEqual([["i", 1.5849625], ["drive", 1.5849625], ["a", 0.0000000], ["car", 0.5849625], ["john", 1.5849625], ["has", 1.5849625], ["and", 0.5849625], ["an", 0.5849625], ["apple", 0.5849625], ["cow", 1.5849625]]);
    });

    test("", () => {
        expect(idf()).toBe();
    });

    test("", () => {
        expect(idf()).toBe();
    });

});