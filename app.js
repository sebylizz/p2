const translate = require('./translate.js');

async function main(){
    const tekst = await translate("Hej med dig din grimme dreng");
    let arr = tdidf(tekst);
    compare(arr, db);
    return(result(compare))
}

main();