const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const translater = require('./src/translate');                                    // opretter en konstant function som requirer translate
// const sanitizer = require('/src/saniterzerfraragnar');                         // opretter en konstant function som requirer saniterzerfraragnar
const cosinus = require('./src/cosine');                                          // opretter en konstant function som requirer cosinus
// const jaccard = require('./src/jaccard');                                      // opretter en konstant function som requirer jaccard
// her kan nemt tilføjes flere når modulerne/algoritmerne er lavet

var articles = [];
db().then(e => articles = e);

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
    answers.cosinus = cosinus([translated], ["Vores smukke database"]);           // får resultatsvar fra translated fra cosinus.js og putter ind i object answers
    // answers.jaccard = jaccard(answers.translated);                             // får resultatsvar fra translated fra jaccard.js og putter ind i object answers
    // her kan nemt tilføjes flere når modulerne/algoritmerne er lavet
    response.json(answers);                                                       // sender et respons i json format i et array som hedder answers
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on http://localhost:" + PORT);
})