const sentenize = require('../src/sentenize');

describe("Testing sentenize file", () => {
    test('testing if "." works', () => {
        expect(sentenize(["I hope I get hit by a train. It has to be Thomas the Train"])).toContain("I hope I get hit by a train");
    });

    test('testing if "." works with exceptions', () => {
        expect(sentenize(["My birthday is in Jan. I am so excited."])).toContain("My birthday is in Jan I am so excited");
    });

    test('testing if ":" does not split sentence', () => {
        expect(sentenize(["Grocery list: apples, bananas and milk."])).toContain("Grocery list: apples, bananas and milk");
    });
});