const synonymedict = require('word-thesaurus');
const levenshtein = require('./levenshtein');

// copies input sentence and checks if some words can we replaced from databasesentence words and then replaces them if they're synonyms or levenshtein
function wordreplacer(input, databasesentence){

    // removes spaces and other characters
    input = input.replace(/[^"…'%-\w ]/g, '').toLowerCase().split(" ");
    databasesentence = databasesentence.replace(/[^"…'%-\w ]/g, '').toLowerCase().split(" ");

    // copies input sentence into another array
    let originalinput = [...input];

    // replaces all words in both sentences, which are the same, with an empty string
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesentence.length; j++){
            if (input[i] === databasesentence[j]){
                input[i] = "";
                databasesentence[j] = "";
            }
        }
    }
    
    // removes all empty strings from input sentence
    let i = 0;
    while (i < input.length){
        if (input[i] === ""){
            input.splice(i, 1);
        } else {
            i++;
        }
    }

    // removes all empty strings from database sentence
    i = 0;
    while (i < databasesentence.length){
        if (databasesentence[i] === ""){
            databasesentence.splice(i, 1);
        } else {
            i++;
        }
    }
    
    // checks if both words from sentences are synonyms or has a levenshtein distance > 90%, and if so, copies database sentence word into the copied input sentence array on the index of which the word was found
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

    // returns the new array in string form
    return originalinput.join(" ");

}

// takes two words as input and returns false if word1 doesnt have any synonyms and true if word2 is a synonyme with word1
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

// function which determines which sentences from input should be compared with which sentence from database sentence
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