const jaccard = require('../src/jaccard');

describe("Testing jaccard file", () => {
    test("Similarity between 2 sentences", () => {
        expect(jaccard(["Kamala Harris approval rating high among Democrats, but no elsewhere"], ["Kamala Harris approval rating high among Dems but not elsewhere"])).toBe("63.64%");
    });

    test("Testing jaccard article based", () => {
        expect(jaccard("Trump har mange valg repræsentanter bag sig")).toBe("0.29%");
    });

    test("Testing jaccard sentenze based", () => {
        expect(jaccard("I don't think Biden has anything to say")).toBe(['Average Similarity', '0%']);
    });

});