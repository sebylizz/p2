const document = require('../src/arraymerge').mergeDocArrays;
const sentences = require('../src/arraymerge').mergeSentArrays;

describe("Testing arraymerge file", () => {
    test('testing merging of results of articles', () => {
        expect(document([[50, 2], [100, 3]], [[25, 2], [50, 3]])).toStrictEqual([[2, 50, 25, 37.5], [3, 100, 50, 75]]);
    });

    test('testing merging of results of sentences', () => {
        expect(sentences([[0, 0, 50, 0]], [[0, 0, 50, 0]])).toStrictEqual([[0, 0, 50, 0]]);
    });
});