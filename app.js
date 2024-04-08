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
const jaccard = require('./src/jaccard');
const idf = require('./src/idf')
const sentenize = require('./src/sentenize');

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
    let translated = await translater(request.body.text);
    let tempCosine = cosinus(translated, articles, idftable);
    let tempJaccard = jaccard(translated, articles);
    console.log(`Input received!\n\nPreliminary Cosine similarity: ${tempCosine[0]}% on article #${tempCosine[1]}\n\nReplacing words with synonyms...\n`);

    let newTranslated = synonyme(translated, articles[tempCosine[1]].content);
    cosineResult = cosinus(newTranslated, articles, idftable);
    jaccardResult = jaccard(newTranslated, articles);
    console.log(`Final result:\nCosine similarity: ${cosineResult[0]}% on article #${cosineResult[1]}\nJaccard similarity: ${jaccardResult[0]}% on article #${jaccardResult[1]}\n`);
    sentences = cossen(sentenize(translated), sentenize(articles[cosineResult[1]].content), idftable);
    console.log("Cosine similarity on sentences:\n",sentences);

    let mathingArticleContent = articles[cosineResult[1]].content; 

    answers.article = mathingArticleContent;
    answers.jaccardSimilarity = jaccardResult;
    answers.cosineSimilarity = cosineResult;

    response.send(answers);
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT+"\n");
})