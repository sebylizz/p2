function proc(doc, idf){
    if(!doc){return []}
    let words = doc.split(" ");
    let wordArr = [];
    let lnth = words.length;

    for(let i = 0; i < words.length; i++){
        let w = words[i].replace(/[^\w]/g, '').toLowerCase();
        if(!w){lnth--; continue;}

        let found = 0;
        for(let j = 0; j < wordArr.length; j++){
            if(wordArr[j][0] === w){
                wordArr[j][1]++;
                found = 1;
                break;
            }
        }
        if(found === 0){wordArr.push([w, 1])}
    }

    for(let i = 0; i < wordArr.length; i++){
        wordArr[i][1] /= lnth;
        let weight;
        if(idf.some(e => e[0] === wordArr[i][0])){
            weight = idf.find(e => e[0] === wordArr[i][0])[1];
        }
        else{
            weight = 1;
        }
        wordArr[i][1] *= weight;
    }
    return (wordArr);
}

function paragraphs (input, articles, idf){
    //update idf TODO

    let idx = 0, max = 0, winner = 0;
    while(idx < articles.length){
        const doc1 = proc(input, idf);
        let doc2 = proc(articles[idx].content, idf);
        let bigger = (doc1.length > doc2.length) ? doc1 : doc2;
        let smaller = (doc1.length <= doc2.length) ? doc1 : doc2;
        for (let i = 0; i < bigger.length; i++) {
            bigger[i].push(0);
            for(let j = 0; j < smaller.length; j++){
                if(smaller[j][0] === bigger[i][0]){
                    bigger[i][2] = smaller[j][1];
                    smaller.splice(j, 1);
                    break;
                }
            }
        }
        let dot = 0, e1 = 0, e2 = 0;
        for(let i = 0; i < bigger.length; i++){
            dot += bigger[i][1]*bigger[i][2];
            e1 += bigger[i][1]*bigger[i][1];
            e2 += bigger[i][2]*bigger[i][2];
        }
        e1 = Math.sqrt(e1);
        e2 = Math.sqrt(e2);
    
        let temp = dot/(e1*e2);
        if(temp > max){
            max = temp;
            winner = idx;
        }
        idx++;
    }
    return [(max*100).toFixed(2), winner];
}

function sentences (input, article, idf){

    let results = [];
    for(let i = 0; i < input.length; i++){
        let max = 0, winner = 0;

        for(let j = 0; j < article.length; j++){
            let doc1 = proc(input[i], idf);
            let doc2 = proc(article[j], idf);
            let bigger = (doc1.length > doc2.length) ? doc1 : doc2;
            let smaller = (doc1.length <= doc2.length) ? doc1 : doc2;
            for (let i = 0; i < bigger.length; i++) {
                bigger[i].push(0);
                for(let j = 0; j < smaller.length; j++){
                    if(smaller[j][0] === bigger[i][0]){
                        bigger[i][2] = smaller[j][1];
                        smaller.splice(j, 1);
                        break;
                    }
                }
            }
            let dot = 0, e1 = 0, e2 = 0;
            for(let i = 0; i < bigger.length; i++){
                dot += bigger[i][1]*bigger[i][2];
                e1 += bigger[i][1]*bigger[i][1];
                e2 += bigger[i][2]*bigger[i][2];
            }
            e1 = Math.sqrt(e1);
            e2 = Math.sqrt(e2);

            let temp = dot/(e1*e2);
            if(temp > max){
                winner = j;
                max = temp;
            }
        }
        if(max > 0.7){
            results.push([i, winner, (max*100).toFixed(2)]);
        }

    }
    return results;
}

//tests
/*
const loadarticles = require('./dbload');
const idf = require('./idf')
let articles = [];
let idftable = [];
loadarticles().then(result => articles = result).then(() => idftable = idf(articles)).then(() => {
    console.log(sentences(["This is a sentence", "You are a fat and a poor", "I hate everyone"], ["This is not a sentence", "You are gay and poor", "I hate you and everyone"], idftable));
});

*/

module.exports = {paragraphs, sentences};