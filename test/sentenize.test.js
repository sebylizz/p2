const sentenize = require('../src/sentenize').sentenize;
const sentenizeArr = require('../src/sentenize').sentenizeArr;
const lightSentenize = require('../src/sentenize').lightSentenize;

describe("Testing sentenize file", () => {
    test('testing if "." works', () => {
        expect(sentenize("I hope I get hit by a train. It has to be Thomas the Train")).toStrictEqual(["I hope I get hit by a train", " It has to be Thomas the Train"]);
    });

    test('testing splitting of article sentences', () => {
        expect(sentenizeArr([{content: "the apples are falling nicely. they are big"}])).toStrictEqual([["the apples are falling nicely", " they are big"]]);
    });

    test('testing abbreviations', () => {
        expect(lightSentenize("the Gov. is big")).toStrictEqual(["the Gov is big"]);
    });
});