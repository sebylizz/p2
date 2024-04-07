
// funktion til at sanitize input fjerner tekst som følger "hej" og newline karakterer 

function sanitizeinput(input){
    let sanitize = input.replace(/\r?\n|\r/g, ' '); // newline
    sanitize = sanitize.replace(/"[^"]*"/g,''); // "hej"
    sanitize = sanitize.replace(/\[[^\]]*\]/g, ''); // [hej]
    sanitize = sanitize.replace(/\([^)]*\)/g, ''); // (hej)

    let temp = sanitize.toLowerCase();
    let wordArr = temp.split(/\W+/).filter(word => word !== '');

    return wordArr;
}

module.exports = sanitizeinput;