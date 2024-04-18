const cosine = require('../src/cosine');
const sentence = cosine.sentences;
const paragraphs = cosine. paragraphs;

describe("Testing cosine file", () => {
    test("sentence function test", () => {
        expect(sentence(["i love learning"], ["you i love"], [["i", 1], ["love", 1], ["learning", 1], ["you", 1], ["are", 1], ["tall", 1]])).toEqual([[0, 0, "81.65"]]);
    });

    test("paragraph function test", () => {
        expect(paragraphs("I wish i had some apples", [{content: "i wish i had some apples"}], [["this", 1], ["is", 1], ["a", 1], ["small", 1], ["sample", 1], ["text", 1], ["i", 1], ["wish", 1], ["had", 1], ["some", 1], ["apples", 1]])).toEqual(["100.00", 0]);
    });

});