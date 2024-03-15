//Funktionen tager to arrays som input, det første værende inputteksten og det andet værende et dokument fra databasen

function proc(input){
    if(!input){return []}
    let words = input.split(" ");
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

    return (wordArr);
}

function cossim (input, articles){
    let idx = 0, max = 0;
    while(idx < articles.length){
        let doc1 = proc(input);
        let doc2 = proc(articles[idx].content);
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
        let dot = 0, e1 = 0, e2 = 0;
        for(let i = 0; i < bigger.length; i++){
            dot += bigger[i][1]*bigger[i][2];
            e1 += bigger[i][1]*bigger[i][1];
            e2 += bigger[i][2]*bigger[i][2];
        }
        e1 = Math.sqrt(e1);
        e2 = Math.sqrt(e2);
    
        let temp = dot/(e1*e2);
        max = (temp > max) ? temp : max;
        idx++;
    }
    
    return max;
}

module.exports = cossim;