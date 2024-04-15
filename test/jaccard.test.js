const jaccard = require('../src/jaccard');

describe("Testing jaccard file", () => {
    test("Similarity between 2 sentences", () => {
        expect(jaccard(["Kamala Harris approval rating high among Democrats, but no elsewhere"], ["Kamala Harris approval rating high among Dems but not elsewhere"])).toBe("63.64%");
    });

    test("", () => {
        expect(jaccard()).toBe();
    });

    test("", () => {
        expect(jaccard()).toBe();
    });

});