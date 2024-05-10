const cosine = require('../src/cosine');
const sentence = cosine.sentences;
const paragraphs = cosine.paragraphs;

describe("Testing cosine file", () => {
    test("sentence function test", () => {
        expect(sentence(["i love learning"], [["you i love"]], [[0, 0, 0, 0]], [["i", 1], ["love", 1], ["learning", 1], ["you", 1], ["are", 1], ["tall", 1]])).toEqual([[0, 0, 66.67, 0]]);
    });

    test("paragraph function test", () => {
        expect(paragraphs("i wish i had some apples", [{content: "apples had an impact on society"}], [])).toEqual([[28.87, 0]]);
    });

});