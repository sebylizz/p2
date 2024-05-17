const deepl = require('deepl-node');
const translator = new deepl.Translator(process.env.DEEPLAPI);

async function translateText(text){
    let result = await translator.translateText(text, null, 'en-US'); 
    return [result.text, result.detectedSourceLang];
}

module.exports = translateText;
