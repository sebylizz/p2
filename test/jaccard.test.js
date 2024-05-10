const jaccard = require('../src/jaccard');
const sentences = jaccard.jaccardSentenceSimilarity;
const paragraphs = jaccard.jaccardSimilarity;

describe("Testing jaccard file", () => {
    test("Similarity between 2 sentences", () => {
        expect(sentences(["i want to be a superstar"], [["a superstar i want to be"]], [[0, 0, 0, 0]], [])).toEqual([[0, 0, 66.67, 0]]);
    });

    test("Testing jaccard article based", () => {
        expect(paragraphs("i am not happy for blue cars", [{content: "blue cars is not happy for gravel"}], [])).toEqual([[33.33, 0]]);
    });

});