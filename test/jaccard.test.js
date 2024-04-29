const jaccard = require('../src/jaccard');
const sentences = jaccard.jaccardSentenceSimilarity;
const paragraphs = jaccard.jaccardSimilarity;

describe("Testing jaccard file", () => {
    test("Similarity between 2 sentences", () => {
        expect(sentences(["the car is black"], ["is the car black"])).toEqual([[0, 0, "20.00"]]);
    });

    test("Testing jaccard article based", () => {
        expect(paragraphs("jeg er ikke glad for sorte mennesker", [{content: "sorte mennesker er ikke glad for penis"}])).toEqual([ "50.00", 0 ]);
    });

});