const fs = require('fs');

async function proc(article, callback){
    await fs.readFile(article, (err, input) => {
        if (err) throw err;
        let title = input.toString().split("\n")[0];
        let cont = input.toString().split("\n")[1];
    
        let words = cont.split(" ");
        let wordArr = [];
    
        for(let i = 0; i < words.length; i++){
            let w = words[i].replace(/[^\w]/g, '').toLowerCase();
            if(!w){continue}
    
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
    
        callback(wordArr);
    })
}

async function cossim (input) {proc(input, (doc1) => {
    proc('articles/testarticle2.txt', (doc2) => {
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
        bigger.sort((a, b) => (b[1]+b[2])/2 - (a[1]+a[2])/2);
        bigger.splice(0, 20);
        let dot = 0, e1 = 0, e2 = 0;
        for(let i = 0; i < bigger.length; i++){
            dot += bigger[i][1]*bigger[i][2];
            e1 += bigger[i][1]*bigger[i][1];
            e2 += bigger[i][2]*bigger[i][2];
        }
        e1 = Math.sqrt(e1);
        e2 = Math.sqrt(e2);

        console.log(bigger);
        console.log(dot/(e1*e2));
    });
});
}
module.exports = cossim;