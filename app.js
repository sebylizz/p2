const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const translater = require('./src/translate.js');               // opretter en konstant variabel som requirer translate.js
// const cosinus = require('./src/cosinus.js');                 // opretter en konstant variabel som requirer cosinus.js
// const jaccard = require('./src/jaccard.js');                 // opretter en konstant variabel som requirer jaccard.js
// her kan nemt tilføjes flere når modulerne/algoritmerne er lavet

app.use(express.json());

app.set("views", path.join(__dirname, '/views'));               // opretter en direkte path til views for at fange front.html
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, 'public')));        // gør det der er i public mappen available for alle (no secrets)

app.get('/', (request, response) => {                           // requester en get fra front siden
    response.render('front');                                   // render front.html vha en get
})

app.post('/', async(request, response) => {                     // requester en post request fra front siden
    let answers = {};                                           // opretter et array
    answers.translated = await translater(request.body.text);   // får translated text fra front fra translate.js og putter ind i object answers
    // answers.cosinus = cosinus(answers.translated);           // får resultatsvar fra translated fra cosinus.js og putter ind i object answers
    // answers.jaccard = jaccard(answers.translated);           // får resultatsvar fra translated fra jaccard.js og putter ind i object answers
    // her kan nemt tilføjes flere når modulerne/algoritmerne er lavet
    response.json(answers);                                     // sender et respons i json format i et array som hedder answers
})
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
})