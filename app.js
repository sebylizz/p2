const translate = require('./translate.js');
const cossim = require('./cosine.js');

async function main(input){
    const translated = await translate(input);
    const arr = cossim(translated);
    console.log(translated);
}

main("Hej med dig");