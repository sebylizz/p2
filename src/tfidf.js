const arts = require('./dbload');
const fs = require('fs');

arts().then(e => {
    let str = "";
    const data = idftable(e);
    data.sort((a, b) => a[1] - b[1]);
    data.forEach(s => str += s+"\n");
    fs.writeFile('test.txt', str, err => {
        if(err){
            console.log(err);
        }
        else{
            console.log("succes");
        }
    })
});

function idftable(db){
    const total = db.length;
    let arr = {};

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

    let results = [];
    for(let w in arr){
        results.push([w, Math.log2(total / arr[w])]);
    }
    return results;
}