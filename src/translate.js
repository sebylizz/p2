const deepl = require('deepl-node');
const translator = new deepl.Translator(process.env.DEEPLAPI);

async function translateText(text){
    let result = await translator.translateText(text, 'da', 'en-GB'); 
    return result.text;
}

module.exports = translateText;