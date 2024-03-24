const synonymedict = require('word-thesaurus');

function wordreplacer(input, databasesætning){

    input = input.replace(/[^\w ]/g, '').toLowerCase().split(" ");
    databasesætning = databasesætning.replace(/[^\w ]/g, '').toLowerCase().split(" ");

    let originalinput = [...input];

    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesætning.length; j++){
            if (input[i] === databasesætning[j]){
                input[i] = "";
                databasesætning[j] = "";
            }
        }
    }
    
    let i = 0;
    while (i < input.length){
        if (input[i] === ""){
            input.splice(i, 1);
        } else {
            i++;
        }
    }

    i = 0;
    while (i < databasesætning.length){
        if (databasesætning[i] === ""){
            databasesætning.splice(i, 1);
        } else {
            i++;
        }
    }
    
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesætning.length; j++)
            if (synonyme(input[i], databasesætning[j])){
                let ord = input[i];
                let idx = originalinput.indexOf(ord);
                originalinput[idx] = databasesætning[j];
            }
    }

    return originalinput.join(" ");

}

function synonyme(ord1, ord2){

    let tempord = synonymedict.search(ord1);
    if (tempord.length == 0){
        return false;
    }
    tempord = tempord[0].raw;

    for (let i = 0; i < tempord.length; i++){
        if (tempord[i].toLowerCase() === ord2){
            return true;
        }
    } 
    return false;
}

module.exports = wordreplacer;