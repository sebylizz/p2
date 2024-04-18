const idf = require('../src/idf');

describe("Testing idf file", () => {
    test("Testing math", () => {
        expect(idf([{content: "I drive a car"}, {content: "John has a car and an apple"}, {content: "An apple and a cow"}])).toEqual([["i", 1.5849625], ["drive", 1.5849625], ["a", 0.0000000], ["car", 0.5849625], ["john", 1.5849625], ["has", 1.5849625], ["and", 0.5849625], ["an", 0.5849625], ["apple", 0.5849625], ["cow", 1.5849625]]);
    });

    test("Testing math", () => {
        expect(idf([{content: "You sold my house"}, {content: "I have a new house"}, {content: "Do you have a new house?"}, {content: "I am not President Biden"}])).toEqual([["you", 1.0000000], ["sold", 2.0000000], ["my", 2.0000000], ["house", 0.4150375], ["i", 1.0000000], ["have", 1.0000000], ["a", 1.0000000], ["new", 1.0000000], ["do", 2.0000000], ["am", 2.0000000], ["not", 2.0000000], ["president", 2.0000000], ["biden", 2.0000000]]);
    });

    test("Testing wrong math", () => {
        expect(idf({content: "You are not nice"}, {content: "I am a nice person"})).not.toEqual([["you", 1.0000000], ["are", 1.0000000], ["not", 1.0000000], ["nice", 1.0000000], ["i", 1.0000000], ["am", 1.0000000], ["a", 1.0000000], ["person", 1.0000000]]);
    });

});