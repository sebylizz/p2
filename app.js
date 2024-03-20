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
// her kan nemt tilføjes flere når modulerne/algoritmerne er lavet

var articles = [];
loadarticles().then(result => articles = result);

app.use(express.json());

app.set("views", path.join(__dirname, '/views'));                                 // opretter en direkte path til views for at fange front.html
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, 'public')));                          // gør det der er i public mappen available for alle (no secrets)

app.get('/', (request, response) => {                                             // requester en get fra front siden
    response.render('front');                                                     // render front.html vha en get
})

app.post('/', async(request, response) => {                                       // requester en post request fra front siden
    let answers = {};                                                             // opretter et array
    let translated = await translater(request.body.text);                         // får translated text fra front fra translate.js og putter ind i object answers
    // answers.translated = sanitizer(translated);
    let temporarycosinus = cosinus(translated, articles)[1];                      // får resultatsvar fra translated fra cosinus.js og putter ind i object answers
    let temporary0 = cosinus(translated, articles)[0];
    console.log(temporary0, translated);
    let temporarysynonyme = synonyme(translated, articles[temporarycosinus].content);
    console.log(cosinus(temporarysynonyme, [articles[temporarycosinus]])[0], temporarysynonyme);

    // answers.rabinkarp = rabinkarp(translated, articles);
    let jaccardResult = jaccard(translated, articles);
    answers.jaccardSimilarity = jaccardResult[0];
    answers.mostSimilarArticleIndex = jaccardResult[1];                            // får resultatsvar fra translated fra jaccard.js og putter ind i object answers
    // her kan nemt tilføjes flere når modulerne/algoritmerne er lavet
    response.send(answers);                                                       // sender et respons i json format i et array som hedder answers
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT);
})