const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const loadarticles = require('./src/dbload');
const translater = require('./src/translate');                                    // opretter en konstant function som requirer translate
// const sanitizer = require('/src/saniterzerfraragnar');                         // opretter en konstant function som requirer saniterzerfraragnar
const cosinus = require('./src/cosine');                                          // opretter en konstant function som requirer cosinus
const synonyme = require('./src/synonyme');
// const rabinkarp = require('./src/rabinkarp');                                  // opretter en konstant function som requirer rabinkarp
const jaccard = require('./src/jaccard');                                         // opretter en konstant function som requirer jaccard
const idf = require('./src/idf')
// her kan nemt tilføjes flere når modulerne/algoritmerne er lavet

let articles = [];
let idftable = [];
loadarticles().then(result => articles = result).then(() => idftable = idf(articles));

app.use(express.json());

app.set("views", path.join(__dirname, '/views'));                                 // opretter en direkte path til views for at fange front.html
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, 'public')));                          // gør det der er i public mappen available for alle (no secrets)

app.get('/', (request, response) => {                                             // requester en get fra front siden
    response.render('index');                                                     // render front.html vha en get
})

app.post('/', async(request, response) => {                                       // requester en post request fra front siden
    let answers = {};                                                             // opretter et array
    let translated = await translater(request.body.text);                         // får translated text fra front fra translate.js og putter ind i object answers
    // answers.translated = sanitizer(translated);

    let tempCosine = cosinus(translated, articles, idftable);                      // får resultatsvar fra translated fra cosinus.js og putter ind i object answers
    let tempJaccard = jaccard(translated, articles);
    console.log(`Cosine: ${tempCosine[0]} on article #${tempCosine[1]}\nJaccard: ${tempJaccard[0]} on article #${tempJaccard[1]}\n\nSynonyming\n`);

    translated = synonyme(translated, articles[tempCosine[1]].content);
    cosineResult = cosinus(translated, articles, idftable);
    jaccardResult = jaccard(translated, articles);
    console.log(`Cosine: ${cosineResult[0]} on article #${cosineResult[1]}\nJaccard: ${jaccardResult[0]} on article #${jaccardResult[1]}`);

    let mathingArticleContent = articles[cosineResult[1]].content; 

    // answers.rabinkarp = rabinkarp(translated, articles);
    answers.article = mathingArticleContent;
    answers.jaccardSimilarity = jaccardResult;
    answers.cosineSimilarity = cosineResult;                            // får resultatsvar fra translated fra jaccard.js og putter ind i object answers
    // her kan nemt tilføjes flere når modulerne/algoritmerne er lavet
    response.send(answers);                                                       // sender et respons i json format i et array som hedder answers
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT+"\n");
})