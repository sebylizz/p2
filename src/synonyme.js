const loadarticles = require('dbload');
const translater = require('translate'); 

async function wordreplacer(loadarticles, translater){

    let input = await translater(request.body.text);

    for (let i = 0; i < input.length; i++){
        if (input[i] != ' '){
            let word = [];
            word += input[i];
                if (word == /* function som tjekker synonymordbog */){
                    replace(word, /* ordet i synonymordbogen */)
                }
        } 
    }
    
}

function synonyme(){

}

module.exports = wordreplacer;