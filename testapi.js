const deepl = require('deepl-node');

const translator = new deepl.Translator('cf32d132-d329-4e62-bb3d-79596e1148c1:fx');

const text = "Overordnet opfattes femininitet som en afvigelse fra samfundets default-indstillede, maskulinitetsfokuserede linse, så vi er mere tilbøjelige til at afvise den.";

(async () => {
    const result = await translator.translateText(text, 'da', 'en-GB');
    console.log(result.text);
})();