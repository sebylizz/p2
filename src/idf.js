function idftable(db){
    const total = db.length;
    let arr = {};

    // matches every word, puts them to lower case and puts them into array if the word is unique
    for(let i = 0; i < db.length; i++){
        if(!db[i].content){continue;}
        let ws = db[i].content.replace(/[^a-zA-Z0-9 ]/g, '').split(" ");
        ws = ws.map(e => e.toLowerCase());
        ws = Array.from(new Set(ws));
        for(let j = 0; j < ws.length; j++){
            let w = ws[j];
            if(arr[w]){
                arr[w]++;
            }
            else{
                arr[w] = 1;
            }
        }
    }

    // weighs every word in the array
    let results = [];
    for(let w in arr){
        results.push([w, parseFloat(Math.log2(total / arr[w]).toFixed(7))]);
    }
    return results;
}

module.exports = idftable;