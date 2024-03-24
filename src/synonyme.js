const synonymedict = require('word-thesaurus');

// function som kopierer en input sætning og tjekker om nogen ord kan udskiftes med en databasesætning hvis det er synonymer og derefter udskifter
function wordreplacer(input, databasesætning){

    // fjerner mellemrum og andre tegn + den laver alle ord til lowercase
    input = input.replace(/[^\w ]/g, '').toLowerCase().split(" ");
    databasesætning = databasesætning.replace(/[^\w ]/g, '').toLowerCase().split(" ");

    // kopierer input over i et array
    let originalinput = [...input];

    // replacer alle ord i begge sætninger som er ens med en tom string
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesætning.length; j++){
            if (input[i] === databasesætning[j]){
                input[i] = "";
                databasesætning[j] = "";
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
    while (i < databasesætning.length){
        if (databasesætning[i] === ""){
            databasesætning.splice(i, 1);
        } else {
            i++;
        }
    }
    
    // tjekker om de to ord i arrayesne er synonymer med hinanden og udskifter ordet som er et synonym med index pladsen i originalinput
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < databasesætning.length; j++)
            if (synonyme(input[i], databasesætning[j])){
                let ord = input[i];
                let idx = originalinput.indexOf(ord);
                originalinput[idx] = databasesætning[j];
            }
    }

    // returner originalinput men i string form med mellemrum og ikke arrayform
    return originalinput.join(" ");

}

// funktion som tager 2 ord som input og returner false hvis den ikke kan finde ord 1 eller at det er tomt men returner true hvis den finder synonymer
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