// App configuration
require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

// Module imports
const cosineSimilarity = require('./src/cosine').paragraphs;
const cosineSentSimilairty = require('./src/cosine').sentences;
const idf = require('./src/idf');
const inputSanitizer = require('./src/sanitizeinput');
const jaccardSimilarity = require('./src/jaccard').jaccardSimilarity;
const jaccardSentSimilarity = require('./src/jaccard').jaccardSentenceSimilarity;
const loadArticles = require('./src/dbload');
const sentenceConverter = require('./src/sentenize').sentenize;
const sentenceConverterArr = require('./src/sentenize').sentenizeArr;
const synonymeConverter = require('./src/synonyme').exportSyn;
const translator = require('./src/translate');
const mergeDocArrays = require('./src/arraymerge').mergeDocArrays;
const mergeSentArrays = require('./src/arraymerge').mergeSentArrays;
const lightSentenize = require('./src/sentenize').lightSentenize;

// Database loading and IDF table generation
let articles = [];
let idfTable = [];
loadArticles().then(result => articles = result).then(() => idfTable = idf(articles));

// Express configuration
app.use(express.json());
app.set("views", path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, 'public')));

// Frontend GET request
app.get('/', (request, response) => {
    response.render('index');
})

// Frontend POST request
app.post('/', async(request, response) => {
    let time1 = Date.now();
    let answers = {};

    let inputTranslated = await translator(inputSanitizer(request.body.text));
    inputTranslated = inputSanitizer(inputTranslated);

    // Document based similarity
    let cosineDocSimilarity = cosineSimilarity(inputTranslated, articles, idfTable);
    let jaccardDocSimilarity = jaccardSimilarity(inputTranslated, articles);
    const docArray = mergeDocArrays(cosineDocSimilarity, jaccardDocSimilarity);

    // Backend console logging for debugging purposes
    console.log(`Input received!\n\nPreliminary Cosine similarity:\n`,cosineDocSimilarity,
        `Jaccard identified articles:\n`, jaccardDocSimilarity, docArray, `Running sentences...`);

    // Sentenize user input
    let inputTranslatedSentenized = sentenceConverter(inputTranslated);

    // Sentence based similarity
    const allArtsSentenized = sentenceConverterArr(articles);
    let cosineSentences = cosineSentSimilairty(inputTranslatedSentenized, allArtsSentenized, docArray, idfTable);
    let jaccardSentences = jaccardSentSimilarity(inputTranslatedSentenized, allArtsSentenized, docArray)

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity on sentences:\n", cosineSentences,
        "\n\nJaccard similarity on sentences:\n", jaccardSentences);

    // Synonyme replacer and sentence based similarity on final input
    let cosineFinalInput = synonymeConverter(inputTranslatedSentenized, allArtsSentenized, cosineSentences);
    let jaccardFinalInput = synonymeConverter(inputTranslatedSentenized, allArtsSentenized, jaccardSentences);

    let cosineFinalResult = cosineSentSimilairty(cosineFinalInput, allArtsSentenized, docArray, idfTable);
    let jaccardFinalResult = jaccardSentSimilarity(jaccardFinalInput, allArtsSentenized, docArray);

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity after synonyms and levenshtein:\n", cosineFinalResult,
        "\n\nJaccard similarity after synonyms and levenshtein:\n", jaccardFinalResult);

    // Original artikel i sætningsform
    answers.inputSentenized = lightSentenize(inputSanitizer(request.body.text));

    // Final data passing

    const finalArr = mergeSentArrays(cosineFinalResult, jaccardFinalResult);

    finalArr.sort((a, b) => a[3] - b[3]);

    console.log("final:\n", finalArr);

    let a = [], cur = -1; curCheck = -1;

    for(let i = 0; i < finalArr.length; i++){
        if(finalArr[i][3] != curCheck){
            cur++;
            curCheck = finalArr[i][3];
            let obj = {};
            obj.title = articles[finalArr[i][3]].title;
            obj.sentences = [];
            const idx = docArray.findIndex(e => e[0] == finalArr[i][3]);
            obj.cosine = docArray[idx][1];
            obj.jaccard = docArray[idx][2];
            obj.average = docArray[idx][3];
            obj.link = articles[finalArr[i][3]].URL;
            a.push(obj);
        }
        let temp = {inputIndex: finalArr[i][0],
            content: allArtsSentenized[finalArr[i][3]][finalArr[i][1]],
            percentage: finalArr[i][2]};
        a[cur].sentences.push(temp);
    }

    answers.articles = a;

    // Post response
    response.send(answers);
    let time2 = Date.now();
    console.log("tid: " + (time2 - time1));
})

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT + "\n");
})
