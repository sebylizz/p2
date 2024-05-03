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
const sentenceConverter = require('./src/sentenize');
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
    // render front.html vha en get
    response.render('index');
})

// Frontend POST request
app.post('/', async(request, response) => {
    let answers = {};
    
    let inputTranslated = await translator(inputSanitizer(request.body.text));

    // Document based similarity
    let cosineDocSimilarity = cosineSimilarity(inputTranslated, articles, idfTable);
    let jaccardDocSimilarity = jaccardSimilarity(inputTranslated, articles);

    // Results
    let cosineArticleFound = cosineDocSimilarity[1];
    let jaccardArticleFound = jaccardDocSimilarity[1];

    // Backend console logging for debugging purposes
    console.log(`Input received!\n\nPreliminary Cosine similarity: ${cosineDocSimilarity[0]}% on article #${cosineArticleFound}\n`, 
                `\nPreliminary Jaccard similarity: ${jaccardDocSimilarity[0]}% on article #${jaccardArticleFound}\n`, "\nRunning sentences...");

    // Sentenize user input and found articles
    let inputTranslatedSentenized = sentenceConverter(inputTranslated);
    let cosineSentenizedArticle = sentenceConverter(articles[cosineArticleFound].content);
    let jaccardSentenizedArticle = sentenceConverter(articles[jaccardArticleFound].content);

    // Sentence based similarity
    let cosineSentences = cosineSentSimilairty(inputTranslatedSentenized, cosineSentenizedArticle, idfTable);
    let jaccardSentences = jaccardSentSimilarity(inputTranslatedSentenized, jaccardSentenizedArticle)

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity on sentences:\n", cosineSentences,
                "\n\nJaccard similarity on sentences:\n", jaccardSentences);

    // Synonyme replacer and sentence based similarity on final input
    let cosineFinalInput = synonymeConverter(inputTranslatedSentenized, cosineSentenizedArticle, cosineSentences);
    let jaccardFinalInput = synonymeConverter(inputTranslatedSentenized, jaccardSentenizedArticle, jaccardSentences);

    let cosineFinalResult = cosineSentSimilairty(cosineFinalInput, cosineSentenizedArticle, idfTable);
    let jaccardFinalResult = jaccardSentSimilarity(jaccardFinalInput, jaccardSentenizedArticle)

    // Backend console logging for debugging purposes
    console.log("\n\nCosine similarity after synonyms:\n", cosineFinalResult,
                "\n\nJaccard similarity after synonyms:\n", jaccardFinalResult);

    let matchingArticleContent = articles[cosineArticleFound].content;

    answers.article = matchingArticleContent;
    answers.jaccardSimilarity = jaccardDocSimilarity;
    answers.cosineSimilarity = cosineDocSimilarity;

    // Temp Final data passing
    let obj = {};
    obj.title = articles[cosineArticleFound].title;
    obj.sentences = [];
    for(let i = 0; i < cosineFinalResult.length; i++){
        let temp = {inputIndex: cosineFinalResult[i][0],
                    content: cosineSentenizedArticle[cosineFinalResult[i][1]],
                    percentage: cosineFinalResult[i][2]};
        obj.sentences.push(temp);
    }

    answers.articles = [obj];

    // Post response
    response.send(answers);
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT+"\n");
})