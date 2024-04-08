const sentenize = require('../src/sentenize');

test('tester om sentenize virker', () => {
    expect(sentenize("Jeg håber alle de der sorte mennesker dør. De må også gerne brænde i helvede, niggers.")).toContain("Jeg håber alle de der sorte mennesker dør");
});