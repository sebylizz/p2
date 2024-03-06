const deepl = require('deepl-node');
const translator = new deepl.Translator('cf32d132-d329-4e62-bb3d-79596e1148c1:fx');

async function translateText(text){
    let result = translator.translateText(text, 'da', 'en-GB'); 
    return result;
}

module.exports = translateText;