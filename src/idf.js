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

module.exports = idftable;