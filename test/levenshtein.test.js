const levenshtein = require('../src/levenshtein');

describe("Testing levenshtein file", () => {
    test("word conjugation", () => {
        expect(levenshtein("ran", "running")).toBe(0.29);
    });

    test("word conjugation", () => {
        expect(levenshtein("watched", "watching")).toBe(0.63);
    });

    test("not word conjugation", () => {
        expect(levenshtein("kitten", "sitting")).not.toBe(0.35);
    });
});
