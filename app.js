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
    let answers = {};
    
    let inputTranslated = await translator(inputSanitizer(request.body.text));

    // Document based similarity
    let cosineDocSimilarity = cosineSimilarity(inputTranslated, articles, idfTable);
    let jaccardDocSimilarity = jaccardSimilarity(inputTranslated, articles);

    // Backend console logging for debugging purposes
    console.log(`Input received!\n\nPreliminary Cosine similarity: ${cosineDocSimilarity}`+
                `\n Jaccard identified articles: ${jaccardDocSimilarity}\n`, "\nRunning sentences...");

    // Sentenize user input
    let inputTranslatedSentenized = sentenceConverter(inputTranslated);

    // Sentence based similarity
    const allArtsSentenized = sentenceConverterArr(articles);
    let cosineSentences = cosineSentSimilairty(inputTranslatedSentenized, allArtsSentenized, cosineDocSimilarity, idfTable);
    let jaccardSentences = jaccardSentSimilarity(inputTranslatedSentenized, allArtsSentenized, jaccardDocSimilarity)

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity on sentences:\n", cosineSentences,
                "\n\nJaccard similarity on sentences:\n", jaccardSentences);

    // Synonyme replacer and sentence based similarity on final input

    let cosineFinalInput = synonymeConverter(inputTranslatedSentenized, allArtsSentenized, cosineSentences);
    let jaccardFinalInput = synonymeConverter(inputTranslatedSentenized, allArtsSentenized, jaccardSentences);

    console.log(cosineDocSimilarity);
    let cosineFinalResult = cosineSentSimilairty(cosineFinalInput, allArtsSentenized, cosineDocSimilarity, idfTable);
    let jaccardFinalResult = jaccardSentSimilarity(jaccardFinalInput, allArtsSentenized, jaccardDocSimilarity);

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity after synonyms:\n", cosineFinalResult,
                "\n\nJaccard similarity after synonyms:\n", jaccardFinalResult);

    answers.jaccardSimilarity = jaccardDocSimilarity;
    answers.cosineSimilarity = cosineDocSimilarity[0];

    // Original artikel i sætningsform
    answers.inputSentenized = sentenceConverter(inputSanitizer(request.body.text));

    // Final data passing

    let a = [], cur = -1; curCheck = -1;
    cosineFinalResult.sort((a, b) => b[3] > a[3]);
    for(let i = 0; i < cosineFinalResult.length; i++){
        if(cosineFinalResult[i][3] != curCheck){
            cur++;
            curCheck = cosineFinalResult[i][3];
            let obj = {};
            obj.title = articles[cosineFinalResult[i][3]].title;
            obj.sentences = [];
            a.push(obj);
        }
        let temp = {inputIndex: cosineFinalResult[i][0],
            content: allArtsSentenized[cosineFinalResult[i][3]][cosineFinalResult[i][1]],
            percentage: cosineFinalResult[i][2]};
        a[cur].sentences.push(temp);
    }

    answers.articles = a;

    // Post response
    response.send(answers);
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT+"\n");
})