const sanitizeinput = require('../src/sanitizeinput');

test('tester om sanitizerinput virker', () => {
    expect(sanitizeinput('Morten sagde: "Ikke bolle mig!"')).toStrictEqual(["morten", "sagde"]);
});