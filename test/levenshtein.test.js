const levenshtein = require('../src/levenshtein');

describe("Testing levenshtein file", () => {
    test("word conjugation", () => {
        expect(levenshtein("ran", "running")).toBe(5);
    });

    test("word conjugation", () => {
        expect(levenshtein("watched", "watching")).toBe(3);
    });

    test("not word conjugation", () => {
        expect(levenshtein("kitten", "sitting")).toBe(4);
    });

});