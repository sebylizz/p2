const sentenize = require('../src/sentenize');

describe("Testing sentenize file", () => {
    test('testing if "." works', () => {
        expect(sentenize("I hope I get hit by a train. It has to be Thomas the Train")).toStrictEqual(["I hope I get hit by a train", "It has to be Thomas the Train"]);
    });

    test('testing if "." works with exceptions', () => {
        expect(sentenize("My birthday is in Jan. I am so excited.")).toStrictEqual(["My birthday is in Jan I am so excited"]);
    });

    test('testing if ";" does not split sentence', () => {
        expect(sentenize("Grocery list; apples, bananas and milk.")).toStrictEqual(["Grocery list; apples, bananas and milk"]);
    });
});