function sentenize(article){
    const abbreviations = [
        "e.g.",
        "i.e.",
        "etc.",
        "Mr.",
        "Mrs.",
        "Ms.",
        "Dr.",
        "Prof.",
        "Ph.D.",
        "ca.",
        "Ltd.",
        "U.S.",
        "Inc.",
        "No.",
        "vs.",
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec.",
        "a.m.",
        "p.m.",
        "dept.",
        "univ.",
        "assoc.",
        "bldg.",
        "mtg.",
        "yr.",
        "fig.",
        "est.",
        "ed.",
        "chap.",
        "sec.",
        "vol.",
        "pp.",
        "rev.",
        "approx.",
        "ult.",
        "incl.",
        "excl.",
        "St.",
        "Ave.",
        "Blvd.",
        "Rd.",
        "Gov.",
        "Sen.",
        "Rep.",
        "Atty.",
        "Sr.",
        "Jr.",
        "Sen.",
        "R-S.C",
        "R-Miss."
    ];
    for(x of abbreviations){
        article = article.replaceAll(x, x.replaceAll('.', ''));
    }
    const regex = new RegExp(`[.?!:]`, 'g');
    let arr = article.split(regex);
    arr = arr.map(e => e.replace('"', '').trim());
    for(let i = arr.length; i > 0; i--){ //i >= 0 eller i > 0? (Jeg har ændret det til i > 0)
        if(arr[i] === ''){
            arr.splice(i, 1);
        }
    }
    return arr;
}

module.exports = sentenize;

//tests
/*const db = require('./dbload');
db().then(e => console.log(sentenize(e[3].content)));
*/