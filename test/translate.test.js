const translate = require('../src/translate');

describe("", () => {
    test("danish to english", () => {
        expect(translate("Jeg hedder Karsten")).toBe("My name is Karsten");
    });

    test("danish to english", () => {
        expect(translate("Du er grim")).toBe("You are ugly");
    });

    test("danish to american english", () => {
        expect(translate("Farven er blå")).toBe("The color is blue");
    });

});