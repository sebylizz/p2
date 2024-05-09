const synonymedict = require('word-thesaurus');
const levenshtein = require('./levenshtein');

// function som kopierer en input sætning og tjekker om nogen ord kan udskiftes med en databasesentence hvis det er synonymer og derefter udskifter
function wordreplacer(input, databasesentence){

    // fjerner mellemrum og andre tegn + den laver alle ord til lowercase
    input = input.replace(/[^"'%-\w ]/g, '').toLowerCase().split(" ");
    databasesentence = databasesentence.replace(/[^\w ]/g, '').toLowerCase().split(" ");

    // kopierer input over i et array
    let originalinput = [...input];

    // replacer alle ord i begge sætninger som er ens med en tom string
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesentence.length; j++){
            if (input[i] === databasesentence[j]){
                input[i] = "";
                databasesentence[j] = "";
            }
        }
    }
    
    // fjerner alle tomme strings i begge sætninger
    let i = 0;
    while (i < input.length){
        if (input[i] === ""){
            input.splice(i, 1);
        } else {
            i++;
        }
    }

    // fjerner tomme strings
    i = 0;
    while (i < databasesentence.length){
        if (databasesentence[i] === ""){
            databasesentence.splice(i, 1);
        } else {
            i++;
        }
    }
    
    // tjekker om de to ord i arrayesne er synonymer med hinanden og eller har en levenshtein distance % på over 40 og udskifter ordet som er et synonym med index pladsen i originalinput
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesentence.length; j++){
            if (synonyme(input[i], databasesentence[j])){
                let word = input[i];
                let idx = originalinput.indexOf(word);
                originalinput[idx] = databasesentence[j];
            } else if (levenshtein(input[i], databasesentence[j]) > 0.90){
                let word = input[i];
                let idx = originalinput.indexOf(word);
                originalinput[idx] = databasesentence[j];
            }
        }
    }

    // returner originalinput men i string form med mellemrum og ikke arrayform
    return originalinput.join(" ");

}

// funktion som tager 2 word som input og returner false hvis den ikke kan finde word 1 eller at det er tomt men returner true hvis den finder synonymer
function synonyme(word1, word2){

    let tempord = synonymedict.search(word1);
    for (let i = 0; i < tempord.length; i++){
        for (let j = 0; j < tempord[i].raw.length; j++){
            if (tempord[i].raw[j].toLowerCase() === word2){
                return true;
            }
        }
    }
    return false;
}

function exportSyn(inp, art, deets){
    let arr = [];
    for(let i = 0; i < deets.length; i++){
        if(deets[i][2] > 50){
            let newsent = wordreplacer(inp[deets[i][0]], art[deets[i][3]][deets[i][1]]);
            arr.push(newsent);
        } else{
            arr.push(inp[deets[i][0]]);
        }
    }
    return arr;
}

module.exports = {exportSyn, wordreplacer};