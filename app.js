//Husk at have en .env fil i root folder med "DEEPLAPI=xxxx"
require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const loadarticles = require('./src/dbload');
const translater = require('./src/translate');
const cosinus = require('./src/cosine').paragraphs;
const cossen = require('./src/cosine').sentences;
const synonyme = require('./src/synonyme');
const jaccard = require('./src/jaccard').jaccardSimilarity;
const jaccardsen = require('./src/jaccard').jaccardSentenceSimilarity;
const idf = require('./src/idf')
const sentenize = require('./src/sentenize');
const inputsan = require('./src/sanitizeinput');

let articles = [];
let idftable = [];
loadarticles().then(result => articles = result).then(() => idftable = idf(articles));

app.use(express.json());

// konfigurerer express
app.set("views", path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
// gør det der er i public mappen available for alle (no secrets)
app.use(express.static(path.join(__dirname, 'public')));

// requester en get fra front siden
app.get('/', (request, response) => {
    // render front.html vha en get
    response.render('index');
})

// requester en post request fra front siden
app.post('/', async(request, response) => {
    let answers = {};
    let translated = await translater(inputsan(request.body.text));
    let cosineResult = cosinus(translated, articles, idftable);
    let jaccardResult = jaccard(translated, articles);
    console.log(`Input received!\n\nPreliminary Cosine similarity: ${cosineResult[0]}% on article #${cosineResult[1]}\n\nRunning sentences...\n`);

    let inputTranslatedSentenized = sentenize(translated);
    let sentArticle = sentenize(articles[cosineResult[1]].content);

    cosineSentences = cossen(inputTranslatedSentenized, sentArticle, idftable);
    console.log("Cosine similarity on sentences:\n", cosineSentences);

    let finalInput = synonyme(inputTranslatedSentenized, sentArticle, cosineSentences);

    let finalResult = cossen(finalInput, sentArticle, idftable);

    console.log("Cosine similarity after syn:\n", finalResult);

    jaccardSentences = jaccardsen(inputTranslatedSentenized, sentenize(articles[jaccardResult[1]].content))
    console.log("Jaccard similarity on sentences:\n", jaccardSentences);

    let matchingArticleContent = articles[cosineResult[1]].content;

    answers.article = matchingArticleContent;
    answers.jaccardSimilarity = jaccardResult; //lad os lige køre tempJaccard indtil vi får kigget på, hvorfor synonyming medfører lavere score 
    answers.cosineSimilarity = cosineResult;

    //Herunder midlertidigt final data passing
    let obj = {};
    obj.title = articles[cosineResult[1]].title;
    obj.sentences = [];
    for(let i = 0; i < finalResult.length; i++){
        let temp = {inputIndex: finalResult[i][0],
                    content: sentArticle[finalResult[i][1]],
                    percentage: finalResult[i][2]};
        obj.sentences.push(temp);
    }

    answers.articles = [obj];

    response.send(answers);
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT+"\n");
})