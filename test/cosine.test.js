const cosine = require('../src/cosine');
const sentence = cosine.sentences;
const paragraphs = cosine. paragraphs;

describe("Testing cosine file", () => {
    test("Math test", () => {
        expect(sentence("i love learning", "you are tall", [["i", 1], ["love", 1], ["learning", 1], ["you", 1], ["are", 1], ["tall", 1]])).toEqual([[2, 10, "100.00"], [3, 1, "100.00"], [5, 6, "100.00"], [7, 10, "100.00"], [8, 6, "100.00"], [9, 4, "100.00"], [10, 5, "100.00"]]);
    });

    test("", () => {
        expect(paragraphs("I wish i had some apples", [{content: "i wish i had some apples"}], [["this", 1], ["is", 1], ["a", 1], ["small", 1], ["sample", 1], ["text", 1], ["i", 1], ["wish", 1], ["had", 1], ["some", 1], ["apples", 1]])).toEqual(["100.00", 0]);
    });

});